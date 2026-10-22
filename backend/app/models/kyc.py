from pydantic import BaseModel

class KycSubmission(BaseModel):
    documentUrl: str
    documentType: str | None = None

class KycDecision(BaseModel):
    uid: str
    reason: str | None = None