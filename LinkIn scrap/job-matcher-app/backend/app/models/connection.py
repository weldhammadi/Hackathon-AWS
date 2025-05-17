from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.models.user import PyObjectId

class Connection(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    userId: PyObjectId
    connectionId: str
    firstName: str
    lastName: str
    profilePicture: Optional[str] = None
    headline: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    location: Optional[str] = None
    connectionDegree: Optional[int] = None
    dateConnected: Optional[datetime] = None
    lastInteraction: Optional[datetime] = None
    tags: List[str] = []
    notes: Optional[str] = None
    status: str = "active"
    source: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }