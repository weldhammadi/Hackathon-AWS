from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

from app.api.router import api_router
from app.core.config import settings
from app.db.init_db import init_mongodb

# Chargement des variables d'environnement
load_dotenv()

# Define lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database connection
    app.mongodb_client = await init_mongodb()
    app.mongodb = app.mongodb_client[settings.DB_NAME]
    yield
    # Shutdown: close database connection
    app.mongodb_client.close()

# Création de l'application FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API pour le scraping LinkedIn et la gestion des offres d'emploi",
    version="0.1.0",
    lifespan=lifespan
)

# Configuration CORS pour permettre les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À remplacer par l'URL de votre frontend en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion du routeur API
app.include_router(api_router, prefix=settings.API_V1_STR)

# Route de base pour tester l'API
@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API Job Matcher"}

# Point d'entrée pour exécuter l'application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)