from motor.motor_asyncio import AsyncIOMotorClient 
from pymongo import MongoClient, ASCENDING, TEXT 
import os 
import asyncio 
from dotenv import load_dotenv 

# Chargement des variables d'environnement 
load_dotenv() 

# Récupération de l'URI MongoDB depuis les variables d'environnement 
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017") 
DB_NAME = os.getenv("DB_NAME", "linkedin_scraper") 

async def init_mongodb(): 
    """ 
    Initialise la base de données MongoDB avec toutes les collections et index nécessaires. 
    """ 
    print(f"Connexion à MongoDB: {MONGODB_URI}") 
    client = AsyncIOMotorClient(MONGODB_URI) 
    db = client[DB_NAME] 
    
    # Liste des collections à créer 
    collections = [ 
        "users", 
        "connections", 
        "messages", 
        "messageTemplates", 
        "opportunities", 
        "automations", 
        "profileOptimizations", 
        "analytics", 
        "campaigns", 
        "notifications", 
        "jobs", 
        "applications" 
    ] 
    
    # Création des collections si elles n'existent pas 
    existing_collections = await db.list_collection_names() 
    for collection in collections: 
        if collection not in existing_collections: 
            print(f"Création de la collection: {collection}") 
            await db.create_collection(collection) 
    
    # Création des index pour chaque collection 
    
    # Index pour la collection users 
    print("Création des index pour la collection users...") 
    await db.users.create_index("email", unique=True) 
    await db.users.create_index("linkedInId", sparse=True) 
    
    # Index pour la collection connections 
    print("Création des index pour la collection connections...") 
    await db.connections.create_index("userId") 
    await db.connections.create_index("connectionId") 
    await db.connections.create_index([("firstName", TEXT), ("lastName", TEXT)]) 
    
    # Index pour la collection messages 
    print("Création des index pour la collection messages...") 
    await db.messages.create_index("userId") 
    await db.messages.create_index("connectionId") 
    await db.messages.create_index("sentAt") 
    
    # Index pour la collection messageTemplates 
    print("Création des index pour la collection messageTemplates...") 
    await db.messageTemplates.create_index("userId") 
    await db.messageTemplates.create_index("category") 
    
    # Index pour la collection opportunities 
    print("Création des index pour la collection opportunities...") 
    await db.opportunities.create_index("userId") 
    await db.opportunities.create_index("relevanceScore") 
    
    # Index pour la collection automations 
    print("Création des index pour la collection automations...") 
    await db.automations.create_index("userId") 
    await db.automations.create_index("status") 
    await db.automations.create_index("nextRun") 
    
    # Index pour la collection profileOptimizations 
    print("Création des index pour la collection profileOptimizations...") 
    await db.profileOptimizations.create_index("userId") 
    await db.profileOptimizations.create_index("status") 
    
    # Index pour la collection analytics 
    print("Création des index pour la collection analytics...") 
    await db.analytics.create_index("userId") 
    await db.analytics.create_index("date") 
    
    # Index pour la collection campaigns 
    print("Création des index pour la collection campaigns...") 
    await db.campaigns.create_index("userId") 
    await db.campaigns.create_index("status") 
    
    # Index pour la collection notifications 
    print("Création des index pour la collection notifications...") 
    await db.notifications.create_index("userId") 
    await db.notifications.create_index("isRead") 
    await db.notifications.create_index("createdAt") 
    
    # Index pour la collection jobs 
    print("Création des index pour la collection jobs...") 
    await db.jobs.create_index([("title", TEXT), ("description", TEXT)]) 
    await db.jobs.create_index("company") 
    await db.jobs.create_index("postedAt") 
    
    # Index pour la collection applications 
    print("Création des index pour la collection applications...") 
    await db.applications.create_index("userId") 
    await db.applications.create_index("jobId") 
    await db.applications.create_index("status") 
    
    print("Initialisation de la base de données terminée avec succès!") 
    return client 

def init_mongodb_sync():
    """
    Version synchrone de l'initialisation pour les tests ou les scripts de ligne de commande.
    """
    print(f"Connexion à MongoDB (sync): {MONGODB_URI}")
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    
    # Liste des collections à créer
    collections = [
        "users", 
        "connections", 
        "messages", 
        "messageTemplates", 
        "opportunities", 
        "automations", 
        "profileOptimizations", 
        "analytics", 
        "campaigns", 
        "notifications", 
        "jobs", 
        "applications"
    ]
    
    # Création des collections si elles n'existent pas
    existing_collections = db.list_collection_names()
    for collection in collections:
        if collection not in existing_collections:
            print(f"Création de la collection: {collection}")
            db.create_collection(collection)
    
    # Création des index pour chaque collection
    
    # Index pour la collection users
    print("Création des index pour la collection users...")
    db.users.create_index("email", unique=True)
    db.users.create_index("linkedInId", sparse=True)
    
    # Index pour la collection connections
    print("Création des index pour la collection connections...")
    db.connections.create_index("userId")
    db.connections.create_index("connectionId")
    db.connections.create_index([("firstName", TEXT), ("lastName", TEXT)])
    
    # Index pour la collection messages
    print("Création des index pour la collection messages...")
    db.messages.create_index("userId")
    db.messages.create_index("connectionId")
    db.messages.create_index("sentAt")
    
    # Index pour la collection messageTemplates
    print("Création des index pour la collection messageTemplates...")
    db.messageTemplates.create_index("userId")
    db.messageTemplates.create_index("category")
    
    # Index pour la collection opportunities
    print("Création des index pour la collection opportunities...")
    db.opportunities.create_index("userId")
    db.opportunities.create_index("relevanceScore")
    
    # Index pour la collection automations
    print("Création des index pour la collection automations...")
    db.automations.create_index("userId")
    db.automations.create_index("status")
    db.automations.create_index("nextRun")
    
    # Index pour la collection profileOptimizations
    print("Création des index pour la collection profileOptimizations...")
    db.profileOptimizations.create_index("userId")
    db.profileOptimizations.create_index("status")
    
    # Index pour la collection analytics
    print("Création des index pour la collection analytics...")
    db.analytics.create_index("userId")
    db.analytics.create_index("date")
    
    # Index pour la collection campaigns
    print("Création des index pour la collection campaigns...")
    db.campaigns.create_index("userId")
    db.campaigns.create_index("status")
    
    # Index pour la collection notifications
    print("Création des index pour la collection notifications...")
    db.notifications.create_index("userId")
    db.notifications.create_index("isRead")
    db.notifications.create_index("createdAt")
    
    # Index pour la collection jobs
    print("Création des index pour la collection jobs...")
    db.jobs.create_index([("title", TEXT), ("description", TEXT)])
    db.jobs.create_index("company")
    db.jobs.create_index("postedAt")
    
    # Index pour la collection applications
    print("Création des index pour la collection applications...")
    db.applications.create_index("userId")
    db.applications.create_index("jobId")
    db.applications.create_index("status")
    
    print("Initialisation de la base de données terminée avec succès!")
    return client

# Fonction utilitaire pour exécuter des fonctions asynchrones
def run_async(coroutine):
    """
    Exécute une coroutine de manière synchrone.
    Utile pour les scripts ou les tests.
    """
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(coroutine)

# Si ce fichier est exécuté directement, initialiser la base de données
if __name__ == "__main__":
    run_async(init_mongodb())