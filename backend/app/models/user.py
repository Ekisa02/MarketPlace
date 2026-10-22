from pydantic import BaseModel, EmailStr
from typing import Literal


class UserProfile(BaseModel):
    uid: str
    name: str
    email: EmailStr
    role: Literal["worker", "employer", "admin"]
    createdAt: str | None = None