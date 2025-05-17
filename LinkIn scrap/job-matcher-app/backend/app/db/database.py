from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Chargement des variables d'environnement
load_dotenv()

# Récupération de l'URI MongoDB depuis les variables d'environnement
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "hackathon_aws")

# Client asynchrone pour FastAPI
async def get_database():
    """
    Retourne une connexion asynchrone à la base de données MongoDB.
    À utiliser dans les endpoints FastAPI.
    """
    client = AsyncIOMotorClient(MONGODB_URI)
    return client[DB_NAME]

# Fonction de test de connexion synchrone
def test_mongo_sync():
    """
    Fonction de test pour vérifier la connexion à MongoDB.
    Retourne une connexion synchrone à la base de données.
    """
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    print("Connexion MongoDB réussie!")
    return db