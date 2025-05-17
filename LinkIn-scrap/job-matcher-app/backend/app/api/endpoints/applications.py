from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime

from app.db.database import get_database
from app.models.application import Application, Email
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Application)
async def create_application(application: Application):
    """
    Crée une nouvelle candidature.
    """
    db = await get_database()
    
    # Vérifier si l'utilisateur existe
    user = await db.users.find_one({"_id": application.user_id})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    # Vérifier si l'offre d'emploi existe
    job = await db.jobs.find_one({"_id": application.job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Offre d'emploi non trouvée")
    
    # Vérifier si le recruteur existe (si fourni)
    if application.recruiter_id:
        recruiter = await db.recruiters.find_one({"_id": application.recruiter_id})
        if not recruiter:
            raise HTTPException(status_code=404, detail="Recruteur non trouvé")
    
    # Insérer la candidature
    result = await db.applications.insert_one(application.dict(by_alias=True))
    
    # Récupérer la candidature créée
    created_application = await db.applications.find_one({"_id": result.inserted_id})
    
    return created_application

@router.get("/", response_model=List[Application])
async def get_applications(
    user_id: Optional[str] = None,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 10
):
    """
    Récupère la liste des candidatures avec filtrage optionnel.
    """
    db = await get_database()
    
    # Construction du filtre
    filter_query = {}
    
    if user_id:
        filter_query["user_id"] = user_id
    
    if status:
        filter_query["status"] = status
    
    # Récupération des candidatures
    applications = await db.applications.find(filter_query).skip(skip).limit(limit).to_list(limit)
    
    return applications

@router.get("/{application_id}", response_model=Application)
async def get_application(application_id: str):
    """
    Récupère une candidature par son ID.
    """
    db = await get_database()
    
    application = await db.applications.find_one({"_id": application_id})
    
    if not application:
        raise HTTPException(status_code=404, detail="Candidature non trouvée")
    
    return application

@router.put("/{application_id}", response_model=Application)
async def update_application(application_id: str, application_update: dict):
    """
    Met à jour une candidature.
    """
    db = await get_database()
    
    # Vérifier si la candidature existe
    existing_application = await db.applications.find_one({"_id": application_id})
    if not existing_application:
        raise HTTPException(status_code=404, detail="Candidature non trouvée")
    
    # Mettre à jour la date de mise à jour
    application_update["updated_at"] = datetime.utcnow()
    
    # Mettre à jour la candidature
    await db.applications.update_one(
        {"_id": application_id},
        {"$set": application_update}
    )
    
    # Récupérer la candidature mise à jour
    updated_application = await db.applications.find_one({"_id": application_id})
    
    return updated_application