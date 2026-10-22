from pydantic import BaseModel

class WorkerProfile(BaseModel):
    name: str | None = None
    skill: str | None = None
    city: str | None = None
    rating: float = 0.0
    kycStatus: str = "none"