import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

# ... existing code ...

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Job Matcher API"
    
    # MongoDB
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "linkedin_scraper")  # Changé pour correspondre à votre projet
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "votre_clé_secrète_très_sécurisée_à_changer")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # LinkedIn
    LINKEDIN_USERNAME: str = os.getenv("LINKEDIN_USERNAME", "")
    LINKEDIN_PASSWORD: str = os.getenv("LINKEDIN_PASSWORD", "")

settings = Settings()