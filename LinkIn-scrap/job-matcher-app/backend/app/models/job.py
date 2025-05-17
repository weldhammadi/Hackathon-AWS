from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.models.user import PyObjectId

class Job(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    company: str
    companyLogo: Optional[str] = None
    companyWebsite: Optional[str] = None
    companyDescription: Optional[str] = None
    location: str
    type: Optional[str] = None
    salary: Optional[str] = None
    description: str
    responsibilities: List[str] = []
    requirements: List[str] = []
    niceToHave: List[str] = []
    benefits: List[str] = []
    experienceLevel: Optional[str] = None
    education: Optional[str] = None
    languages: List[str] = []
    remote: bool = False
    urgent: bool = False
    postedAt: datetime = Field(default_factory=datetime.utcnow)
    startDate: Optional[str] = None
    applicationDeadline: Optional[datetime] = None
    views: int = 0
    applications: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "active"
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }