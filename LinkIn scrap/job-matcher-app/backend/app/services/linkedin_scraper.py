import os
import time
import random
from typing import List, Dict, Optional, Any
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Chargement des variables d'environnement
load_dotenv()

class LinkedInScraper:
    """
    Classe pour le scraping des offres d'emploi sur LinkedIn.
    """
    
    def __init__(self):
        """
        Initialise le scraper LinkedIn.
        """
        self.driver = None
        self.logged_in = False
        self.username = os.getenv("LINKEDIN_USERNAME")
        self.password = os.getenv("LINKEDIN_PASSWORD")
        
        if not self.username or not self.password:
            raise ValueError("Les identifiants LinkedIn ne sont pas configurés dans le fichier .env")
    
    def _setup_driver(self):
        """
        Configure le navigateur Selenium.
        """
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Exécution sans interface graphique
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
    
    def login(self):
        """
        Se connecte à LinkedIn avec les identifiants fournis.
        """
        if self.logged_in:
            return
        
        if not self.driver:
            self._setup_driver()
        
        try:
            # Accéder à la page de connexion
            self.driver.get("https://www.linkedin.com/login")
            
            # Attendre que la page se charge
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "username"))
            )
            
            # Remplir les champs de connexion
            self.driver.find_element(By.ID, "username").send_keys(self.username)
            self.driver.find_element(By.ID, "password").send_keys(self.password)
            
            # Cliquer sur le bouton de connexion
            self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
            
            # Attendre que la page d'accueil se charge
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".feed-identity-module"))
            )
            
            self.logged_in = True
            print("Connexion à LinkedIn réussie!")
            
        except TimeoutException:
            raise Exception("Échec de la connexion à LinkedIn. Vérifiez vos identifiants.")
    
    def search_jobs(self, keywords: List[str], location: str = "", 
                   experience_level: Optional[str] = None, 
                   job_type: Optional[str] = None, 
                   remote: bool = False) -> List[Dict]:
        """
        Recherche des offres d'emploi sur LinkedIn.
        
        Args:
            keywords: Liste de mots-clés pour la recherche
            location: Lieu de travail
            experience_level: Niveau d'expérience requis
            job_type: Type de contrat
            remote: Si True, recherche uniquement les emplois à distance
            
        Returns:
            Liste des offres d'emploi trouvées
        """
        if not self.logged_in:
            self.login()
        
        # Construire l'URL de recherche
        search_query = "+".join(keywords)
        url = f"https://www.linkedin.com/jobs/search/?keywords={search_query}"
        
        if location:
            url += f"&location={location}"
        
        if remote:
            url += "&f_WT=2"
        
        # Ajouter les filtres d'expérience
        if experience_level:
            experience_filters = {
                "entry": "f_E=2",
                "associate": "f_E=3",
                "mid-senior": "f_E=4",
                "director": "f_E=5",
                "executive": "f_E=6"
            }
            if experience_level.lower() in experience_filters:
                url += f"&{experience_filters[experience_level.lower()]}"
        
        # Ajouter les filtres de type d'emploi
        if job_type:
            job_type_filters = {
                "full-time": "f_JT=F",
                "part-time": "f_JT=P",
                "contract": "f_JT=C",
                "temporary": "f_JT=T",
                "internship": "f_JT=I",
                "volunteer": "f_JT=V",
                "other": "f_JT=O"
            }
            if job_type.lower() in job_type_filters:
                url += f"&{job_type_filters[job_type.lower()]}"
        
        # Accéder à la page de recherche
        self.driver.get(url)
        
        # Attendre que les résultats se chargent
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".jobs-search__results-list"))
            )
        except TimeoutException:
            print("Aucun résultat trouvé ou page non chargée correctement.")
            return []
        
        # Faire défiler la page pour charger plus de résultats
        self._scroll_to_load_more_jobs()
        
        # Extraire les offres d'emploi
        return self._extract_job_listings()
    
    def _scroll_to_load_more_jobs(self, max_scrolls: int = 5):
        """
        Fait défiler la page pour charger plus d'offres d'emploi.
        """
        for _ in range(max_scrolls):
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)  # Attendre le chargement des nouveaux éléments
    
    def _extract_job_listings(self) -> List[Dict]:
        """
        Extrait les informations des offres d'emploi de la page de résultats.
        """
        jobs = []
        
        # Obtenir le HTML de la page
        soup = BeautifulSoup(self.driver.page_source, "html.parser")
        
        # Trouver tous les éléments d'offre d'emploi
        job_cards = soup.select(".jobs-search__results-list li")
        
        for card in job_cards:
            try:
                # Extraire les informations de base
                title_elem = card.select_one(".base-search-card__title")
                company_elem = card.select_one(".base-search-card__subtitle")
                location_elem = card.select_one(".job-search-card__location")
                link_elem = card.select_one("a.base-card__full-link")
                
                if not all([title_elem, company_elem, location_elem, link_elem]):
                    continue
                
                title = title_elem.text.strip()
                company = company_elem.text.strip()
                location_text = location_elem.text.strip()
                url = link_elem["href"]
                
                # Extraire l'ID de l'offre depuis l'URL
                job_id = url.split("?")[0].split("-")[-1]
                
                # Créer l'objet d'offre d'emploi
                job = {
                    "linkedin_job_id": job_id,
                    "title": title,
                    "company": {
                        "name": company,
                        "linkedin_id": None,
                        "website": None
                    },
                    "location": {
                        "city": location_text.split(",")[0].strip() if "," in location_text else location_text,
                        "country": location_text.split(",")[1].strip() if "," in location_text else "",
                        "remote": "remote" in location_text.lower()
                    },
                    "url": url,
                    "scraped_at": datetime.utcnow().isoformat()
                }
                
                jobs.append(job)
                
            except Exception as e:
                print(f"Erreur lors de l'extraction d'une offre: {str(e)}")
                continue
        
        return jobs
    
    def get_job_details(self, job_url: str) -> Dict[str, Any]:
        """
        Récupère les détails d'une offre d'emploi spécifique.
        
        Args:
            job_url: URL de l'offre d'emploi
            
        Returns:
            Dictionnaire contenant les détails de l'offre
        """
        if not self.logged_in:
            self.login()
        
        # Accéder à la page de l'offre
        self.driver.get(job_url)
        
        # Attendre que la page se charge
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "job-view-layout"))
            )
        except TimeoutException:
            print("La page de l'offre n'a pas pu être chargée.")
            return {}
        
        # Extraire les détails
        soup = BeautifulSoup(self.driver.page_source, "html.parser")
        
        # Description de l'offre
        description = ""
        description_elem = soup.select_one(".description__text")
        if description_elem:
            description = description_elem.text.strip()
        
        # Informations sur le recruteur
        recruiter = {}
        recruiter_elem = soup.select_one(".jobs-poster__name")
        if recruiter_elem:
            recruiter_name = recruiter_elem.text.strip()
            recruiter_title_elem = soup.select_one(".jobs-poster__headline")
            recruiter_title = recruiter_title_elem.text.strip() if recruiter_title_elem else ""
            
            recruiter = {
                "name": recruiter_name,
                "title": recruiter_title
            }
        
        # Compétences requises
        skills = []
        skills_elems = soup.select(".job-details-skill-match-status-list li")
        for skill_elem in skills_elems:
            skill_text = skill_elem.text.strip()
            if skill_text:
                skills.append(skill_text)
        
        # Type d'emploi et niveau d'expérience
        employment_type = None
        experience_level = None
        criteria_elems = soup.select(".description__job-criteria-item")
        
        for elem in criteria_elems:
            header = elem.select_one(".description__job-criteria-subheader")
            value = elem.select_one(".description__job-criteria-text")
            
            if not header or not value:
                continue
                
            header_text = header.text.strip().lower()
            value_text = value.text.strip()
            
            if "type" in header_text:
                employment_type = value_text
            elif "expérience" in header_text or "experience" in header_text:
                experience_level = value_text
        
        # Date de publication
        posted_date = None
        date_elem = soup.select_one(".posted-time-ago__text")
        if date_elem:
            # Convertir le texte en date (approximative)
            date_text = date_elem.text.strip()
            posted_date = self._parse_posted_date(date_text)
        
        # Construire le dictionnaire de détails
        job_details = {
            "description": description,
            "skills": skills,
            "employment_type": employment_type,
            "experience_level": experience_level,
            "posted_date": posted_date.isoformat() if posted_date else None,
            "recruiter": recruiter if recruiter else None
        }
        
        return job_details
    
    def _parse_posted_date(self, date_text: str) -> Optional[datetime]:
        """
        Convertit le texte de date de publication en objet datetime.
        """
        now = datetime.utcnow()
        
        if "minute" in date_text or "minutes" in date_text:
            minutes = int(date_text.split()[0])
            return now.replace(minute=now.minute - minutes)
        
        elif "heure" in date_text or "heures" in date_text or "hour" in date_text or "hours" in date_text:
            hours = int(date_text.split()[0])
            return now.replace(hour=now.hour - hours)
        
        elif "jour" in date_text or "jours" in date_text or "day" in date_text or "days" in date_text:
            days = int(date_text.split()[0])
            return now.replace(day=now.day - days)
        
        elif "semaine" in date_text or "semaines" in date_text or "week" in date_text or "weeks" in date_text:
            weeks = int(date_text.split()[0])
            return now.replace(day=now.day - (weeks * 7))
        
        elif "mois" in date_text or "month" in date_text or "months" in date_text:
            months = int(date_text.split()[0])
            new_month = now.month - months
            new_year = now.year
            
            if new_month <= 0:
                new_month += 12
                new_year -= 1
                
            return now.replace(year=new_year, month=new_month)
        
        return None
    
    def close(self):
        """
        Ferme le navigateur.
        """
        if self.driver:
            self.driver.quit()
            self.driver = None
            self.logged_in = False


class LinkedInScraper:
    """
    Classe pour le scraping des offres d'emploi sur LinkedIn.
    """
    
    def __init__(self):
        """
        Initialise le scraper LinkedIn.
        """
        self.driver = None
        self.logged_in = False
        self.username = os.getenv("LINKEDIN_USERNAME")
        self.password = os.getenv("LINKEDIN_PASSWORD")
        
        if not self.username or not self.password:
            raise ValueError("Les identifiants LinkedIn ne sont pas configurés dans le fichier .env")
    
    def _setup_driver(self):
        """
        Configure le navigateur Selenium.
        """
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Exécution sans interface graphique
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
    
    def login(self):
        """
        Se connecte à LinkedIn avec les identifiants fournis.
        """
        if self.logged_in:
            return
        
        if not self.driver:
            self._setup_driver()
        
        try:
            # Accéder à la page de connexion
            self.driver.get("https://www.linkedin.com/login")
            
            # Attendre que la page se charge
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "username"))
            )
            
            # Remplir les champs de connexion
            self.driver.find_element(By.ID, "username").send_keys(self.username)
            self.driver.find_element(By.ID, "password").send_keys(self.password)
            
            # Cliquer sur le bouton de connexion
            self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
            
            # Attendre que la page d'accueil se charge
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".feed-identity-module"))
            )
            
            self.logged_in = True
            print("Connexion à LinkedIn réussie!")
            
        except TimeoutException:
            raise Exception("Échec de la connexion à LinkedIn. Vérifiez vos identifiants.")
    
    def search_jobs_custom(
        self,
        keywords: Optional[List[str]] = None,
        locations: Optional[List[str]] = None,
        contract_types: Optional[List[str]] = None,
        max_pages: int = 3
    ) -> list:
        """
        Scrape LinkedIn en utilisant la logique de scrapping.py, retourne une liste d'offres formatées.
        """
        if not self.logged_in:
            self.login()

        all_offres_brutes = []
        for page in range(max_pages):
            start = page * 25
            url = self._build_linkedin_url(
                keywords=keywords,
                locations=locations,
                contract_types=contract_types
            ) + f"&start={start}"
            self.driver.get(url)
            time.sleep(2)
            html_content = self.driver.page_source
            offres_brutes = self._parse_job_offers(html_content)
            all_offres_brutes.extend(offres_brutes)
            time.sleep(1)

        offres_filtrees = self._filter_offers(
            all_offres_brutes,
            mots_cles_titre=keywords,
            lieux_souhaites=locations
        )

        if contract_types:
            nouvelles_offres = []
            for offre in offres_filtrees:
                description, _, _ = self._fetch_offer_details(offre['lien'])
                if any(tc in offre["titre"].lower() or tc in description.lower() for tc in contract_types):
                    nouvelles_offres.append(offre)
            offres_filtrees = nouvelles_offres

        offres_json = []
        for offre in offres_filtrees[:10]:
            description, recruiter, email = self._fetch_offer_details(offre['lien'])
            offre_json = {
                "title": offre['titre'],
                "company": offre['entreprise'],
                "companyLogo": None,
                "companyWebsite": None,
                "companyDescription": None,
                "location": offre['lieu'],
                "type": None,
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
        return offres_json

    def _build_linkedin_url(self, keywords=None, locations=None, contract_types=None):
        base = "https://www.linkedin.com/jobs/search/?"
        params = []
        if keywords:
            params.append(f"keywords={'%20'.join(keywords)}")
        if locations:
            params.append(f"location={'%2C%20'.join(locations)}")
        if contract_types:
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

    def _parse_job_offers(self, html_content):
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
                continue
        return offres

    def _filter_offers(self, offres, mots_cles_titre=None, lieux_souhaites=None):
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
        return offres_filtrees

    def _fetch_offer_details(self, url):
        try:
            self.driver.get(url)
            time.sleep(1)
            soup = BeautifulSoup(self.driver.page_source, "html.parser")
            desc_tag = soup.find("div", class_="show-more-less-html__markup")
            description = desc_tag.get_text(strip=True) if desc_tag else "N/A"
            recruiter_tag = soup.find("a", class_="topcard__org-name-link") or soup.find("span", class_="topcard__flavor")
            recruiter = recruiter_tag.get_text(strip=True) if recruiter_tag else "N/A"
            email = "N/A"
            if description and description != "N/A":
                import re
                match = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", description)
                if match:
                    email = match.group(0)
            return description, recruiter, email
        except Exception:
            return "N/A", "N/A", "N/A"

    # ... existing code ...