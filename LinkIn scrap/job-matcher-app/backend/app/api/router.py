from fastapi import APIRouter
from app.api.endpoints import users
from app.api.endpoints import scraping

api_router = APIRouter()

# Inclure les endpoints utilisateurs
api_router.include_router(users.router, prefix="/users", tags=["users"])

# Vous pourrez ajouter d'autres endpoints plus tard
# api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
api_router.include_router(scraping.router, prefix="/scraping", tags=["scraping"])