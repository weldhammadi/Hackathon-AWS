from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime

from app.db.database import get_database
from app.models.job import Job, JobPreference
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Job])
async def get_jobs(
    skip: int = 0, 
    limit: int = 10,
    title: Optional[str] = None,
    company: Optional[str] = None,
    location: Optional[str] = None
):
    """
    Récupère la liste des offres d'emploi avec filtrage optionnel.
    """
    db = await get_database()
    
    # Construction du filtre
    filter_query = {}
    
    if title:
        filter_query["title"] = {"$regex": title, "$options": "i"}
    
    if company:
        filter_query["company.name"] = {"$regex": company, "$options": "i"}
    
    if location:
        filter_query["$or"] = [
            {"location.city": {"$regex": location, "$options": "i"}},
            {"location.country": {"$regex": location, "$options": "i"}}
        ]
    
    # Récupération des offres d'emploi
    jobs = await db.jobs.find(filter_query).skip(skip).limit(limit).to_list(limit)
    
    return jobs

@router.get("/{job_id}", response_model=Job)
async def get_job(job_id: str):
    """
    Récupère une offre d'emploi par son ID.
    """
    db = await get_database()
    
    job = await db.jobs.find_one({"_id": job_id})
    
    if not job:
        raise HTTPException(status_code=404, detail="Offre d'emploi non trouvée")
    
    return job

@router.post("/preferences", response_model=JobPreference)
async def create_job_preference(preference: JobPreference):
    """
    Crée une nouvelle préférence d'emploi pour un utilisateur.
    """
    db = await get_database()
    
    # Vérifier si l'utilisateur existe
    user = await db.users.find_one({"_id": preference.user_id})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    # Insérer la préférence
    result = await db.job_preferences.insert_one(preference.dict(by_alias=True))
    
    # Récupérer la préférence créée
    created_preference = await db.job_preferences.find_one({"_id": result.inserted_id})
    
    return created_preference

@router.get("/preferences/{user_id}", response_model=List[JobPreference])
async def get_job_preferences(user_id: str):
    """
    Récupère les préférences d'emploi d'un utilisateur.
    """
    db = await get_database()
    
    preferences = await db.job_preferences.find({"user_id": user_id}).to_list(100)
    
    return preferences