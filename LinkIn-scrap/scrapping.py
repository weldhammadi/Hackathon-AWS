import time
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import re
import json
from datetime import datetime

# Configuration initiale
BASE_URL = "https://www.linkedin.com/jobs/search/?keywords=developpeur%20python&location=Paris%2C%20France"

def get_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def fetch_job_page_selenium(driver, url):
    driver.get(url)
    time.sleep(2)  # Réduit pour accélérer
    return driver.page_source

def main():
    driver = get_driver()
    print("Vous pouvez laisser un champ vide si vous ne souhaitez pas filtrer dessus.")
    mots_cles_input = input("Entrez les mots-clés à filtrer (séparés par des virgules) : ")
    lieux_input = input("Entrez les lieux souhaités (séparés par des virgules) : ")
    type_contrat_input = input("Entrez les types de contrat à filtrer (CDI, CDD, Stage, etc. séparés par des virgules) : ")

    mots_cles_filtre = [mot.strip() for mot in mots_cles_input.split(",") if mot.strip()] if mots_cles_input.strip() else None
    lieux_filtre = [lieu.strip() for lieu in lieux_input.split(",") if lieu.strip()] if lieux_input.strip() else None
    types_contrat = [tc.strip().lower() for tc in type_contrat_input.split(",") if tc.strip()] if type_contrat_input.strip() else None

    all_offres_brutes = []
    for page in range(0, 3):
        start = page * 25
        url = build_linkedin_url(
            keywords=mots_cles_filtre,
            location=lieux_filtre,
            contract_types=types_contrat
        ) + f"&start={start}"
        print(f"Scraping page {page+1} : {url}")
        html_content = fetch_job_page_selenium(driver, url)
        offres_brutes = parse_job_offers(html_content)
        all_offres_brutes.extend(offres_brutes)
        time.sleep(1)

    print(f"{len(all_offres_brutes)} offres trouvées avant filtrage.")

    if not all_offres_brutes:
        print("Aucune offre n'a pu être extraite. Vérifiez les sélecteurs CSS et la structure de la page LinkedIn.")
        driver.quit()
        return

    offres_filtrees = filter_offers(
        all_offres_brutes,
        mots_cles_titre=mots_cles_filtre,
        lieux_souhaites=lieux_filtre
    )

    if types_contrat:
        nouvelles_offres = []
        for offre in offres_filtrees:
            description, _, _ = fetch_offer_details_selenium(driver, offre['lien'])
            if any(tc in offre["titre"].lower() or tc in description.lower() for tc in types_contrat):
                nouvelles_offres.append(offre)
        offres_filtrees = nouvelles_offres

    print(f"{len(offres_filtrees)} offres après filtrage.")

    # Construction du format MongoDB et export JSON
    offres_json = []
    for i, offre in enumerate(offres_filtrees[:10]):
        description, recruiter, email = fetch_offer_details_selenium(driver, offre['lien'])
        offre_json = {
            "title": offre['titre'],
            "company": offre['entreprise'],
            "companyLogo": None,
            "companyWebsite": None,
            "companyDescription": None,
            "location": offre['lieu'],
            "type": None,  # Peut être déduit du titre ou description si besoin
            "salary": None,
            "description": description,
            "responsibilities": None,
            "requirements": None,
            "niceToHave": None,
            "benefits": None,
            "experienceLevel": None,
            "education": None,
            "languages": None,
            "remote": None,
            "urgent": None,
            "postedAt": None,
            "startDate": None,
            "applicationDeadline": None,
            "views": None,
            "applications": None,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat(),
            "status": "active"
        }
        offres_json.append(offre_json)
        print(f"\n--- Offre {i+1} ---")
        print(json.dumps(offre_json, ensure_ascii=False, indent=2))
        time.sleep(1)

    # Export JSON
    with open("resultat_offres.json", "w", encoding="utf-8") as f:
        json.dump(offres_json, f, ensure_ascii=False, indent=2)

    driver.quit()

def parse_job_offers(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    offres = []
    conteneurs_offres = soup.find_all("div", class_="base-card")
    for conteneur in conteneurs_offres:
        try:
            titre_tag = conteneur.find("h3", class_="base-search-card__title")
            entreprise_tag = conteneur.find("h4", class_="base-search-card__subtitle")
            lieu_tag = conteneur.find("span", class_="job-search-card__location")
            lien_tag = conteneur.find("a", class_="base-card__full-link")
            titre = titre_tag.get_text(strip=True) if titre_tag else "N/A"
            entreprise = entreprise_tag.get_text(strip=True) if entreprise_tag else "N/A"
            lieu = lieu_tag.get_text(strip=True) if lieu_tag else "N/A"
            lien = lien_tag['href'] if lien_tag and lien_tag.has_attr('href') else "N/A"
            offres.append({
                "titre": titre,
                "entreprise": entreprise,
                "lieu": lieu,
                "lien": lien
            })
        except Exception as e:
            print(f"Erreur lors de l'analyse d'une offre : {e}")
            continue
    return offres

def filter_offers(offres, mots_cles_titre=None, lieux_souhaites=None):
    offres_filtrees = offres
    if mots_cles_titre:
        offres_filtrees = [
            offre for offre in offres_filtrees
            if any(mot.lower() in offre["titre"].lower() for mot in mots_cles_titre)
        ]
    if lieux_souhaites:
        offres_filtrees = [
            offre for offre in offres_filtrees
            if any(lieu.lower() in offre["lieu"].lower() for lieu in lieux_souhaites)
        ]
        print(type(offres_filtrees))
    return offres_filtrees

def fetch_offer_details_selenium(driver, url):
    try:
        driver.get(url)
        time.sleep(1)  # Réduit pour accélérer
        soup = BeautifulSoup(driver.page_source, "html.parser")
        desc_tag = soup.find("div", class_="show-more-less-html__markup")
        description = desc_tag.get_text(strip=True) if desc_tag else "N/A"
        recruiter_tag = soup.find("a", class_="topcard__org-name-link") or soup.find("span", class_="topcard__flavor")
        recruiter = recruiter_tag.get_text(strip=True) if recruiter_tag else "N/A"
        email = "N/A"
        if description and description != "N/A":
            match = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", description)
            if match:
                email = match.group(0)
        return description, recruiter, email
    except Exception as e:
        print(f"Erreur lors de la récupération des détails de l'offre : {e}")
        traceback.print_exc()
        return "N/A", "N/A", "N/A"

def build_linkedin_url(keywords=None, location=None, contract_types=None):
    base = "https://www.linkedin.com/jobs/search/?"
    params = []
    if keywords:
        params.append(f"keywords={'%20'.join(keywords)}")
    if location:
        params.append(f"location={'%2C%20'.join(location)}")
    if contract_types:
        # Mapping des types de contrat LinkedIn
        contract_map = {
            "cdi": "F",
            "cdd": "C",
            "stage": "I",
            "freelance": "T",
            "alternance": "P"
        }
        codes = [contract_map.get(tc.lower()) for tc in contract_types if contract_map.get(tc.lower())]
        if codes:
            params.append("f_JT=" + "%2C".join(codes))
    return base + "&".join(params)

if __name__ == "__main__":
    main()