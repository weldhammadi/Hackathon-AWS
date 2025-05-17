from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
from bson import ObjectId

class ScrapingSession(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    search_query: str
    location: Optional[str] = None
    filters: Dict = {}
    status: str = "pending"  # pending, running, completed, failed
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: Optional[datetime] = None
    jobs_found: int = 0
    jobs_added: int = 0
    error: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }