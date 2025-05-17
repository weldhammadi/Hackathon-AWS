from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Optional
from datetime import datetime
from bson import ObjectId  # ✅ Pour convertir user_id

from app.db.database import get_database
from app.models.scraping import ScrapingSession
from app.models.user import User
from app.services.linkedin_scraper import LinkedInScraper

router = APIRouter()

@router.post("/start", response_model=ScrapingSession)
async def start_scraping(
    session: ScrapingSession,
    background_tasks: BackgroundTasks
):
    """
    Démarre une nouvelle session de scraping LinkedIn.
    """
    db = await get_database()

    # ✅ Vérifier si l'utilisateur existe avec conversion ObjectId
    try:
        user = await db.users.find_one({"_id": ObjectId(session.user_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Format de user_id invalide")

    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    # Mettre à jour le statut de la session
    session.status = "pending"

    # Insérer la session
    result = await db.scraping_sessions.insert_one(session.dict(by_alias=True))

    # Récupérer la session créée
    created_session = await db.scraping_sessions.find_one({"_id": result.inserted_id})

    # Lancer le scraping en arrière-plan
    background_tasks.add_task(
        run_scraping_task,
        str(created_session["_id"]),
        session.search_query,
        session.location,
        session.filters
    )

    return created_session

@router.get("/sessions", response_model=List[ScrapingSession])
async def get_scraping_sessions(
    user_id: Optional[str] = None,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 10
):
    """
    Récupère la liste des sessions de scraping avec filtrage optionnel.
    """
    db = await get_database()

    filter_query = {}

    if user_id:
        filter_query["user_id"] = user_id

    if status:
        filter_query["status"] = status

    sessions = await db.scraping_sessions.find(filter_query).skip(skip).limit(limit).to_list(length=limit)

    return sessions

@router.get("/sessions/{session_id}", response_model=ScrapingSession)
async def get_scraping_session(session_id: str):
    """
    Récupère une session de scraping par son ID.
    """
    db = await get_database()

    session = await db.scraping_sessions.find_one({"_id": ObjectId(session_id)})

    if not session:
        raise HTTPException(status_code=404, detail="Session de scraping non trouvée")

    return session

async def run_scraping_task(session_id: str, search_query: str, location: Optional[str], filters: dict):
    """
    Fonction exécutée en arrière-plan pour le scraping LinkedIn.
    """
    db = await get_database()
    scraper = LinkedInScraper()

    try:
        await db.scraping_sessions.update_one(
            {"_id": ObjectId(session_id)},
            {"$set": {"status": "running"}}
        )

        scraper.login()

        # Utilisation de la méthode search_jobs_custom qui utilise les fonctions de scrapping.py
        jobs = scraper.search_jobs_custom(
            keywords=search_query.split() if search_query else None,
            locations=[location] if location else None,
            contract_types=[filters.get("job_type")] if filters.get("job_type") else None,
            max_pages=3
        )

        jobs_saved = 0
        for job in jobs:
            unique_filter = {
                "title": job["title"],
                "company": job["company"],
                "location": job["location"]
            }
            existing_job = await db.jobs.find_one(unique_filter)
            if not existing_job:
                await db.jobs.insert_one(job)
                jobs_saved += 1

                # ✅ Corriger : utiliser `job` pour les détails du recruteur
                if job.get("recruiter"):
                    recruiter = job["recruiter"]
                    existing_recruiter = await db.recruiters.find_one({"name": recruiter["name"]})
                    if not existing_recruiter:
                        await db.recruiters.insert_one({
                            "name": recruiter["name"],
                            "title": recruiter.get("title"),
                            "company": job["company"]["name"] if isinstance(job["company"], dict) else job["company"],
                            "created_at": datetime.utcnow(),
                            "updated_at": datetime.utcnow()
                        })

        await db.scraping_sessions.update_one(
            {"_id": ObjectId(session_id)},
            {
                "$set": {
                    "status": "completed",
                    "end_time": datetime.utcnow(),
                    "jobs_found": len(jobs),
                    "jobs_added": jobs_saved
                }
            }
        )

    except Exception as e:
        await db.scraping_sessions.update_one(
            {"_id": ObjectId(session_id)},
            {
                "$set": {
                    "status": "failed",
                    "end_time": datetime.utcnow(),
                    "error": str(e)
                }
            }
        )
    finally:
        if scraper:
            scraper.close()
