from pydantic import BaseModel
from typing import Optional

class JobCreate(BaseModel):
    title: str
    description: str
    category: str
    budget_cents: int
    city: Optional[str] = None

class JobAccept(BaseModel):
    jobId: str

class JobComplete(BaseModel):
    jobId: str