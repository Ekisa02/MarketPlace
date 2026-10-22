from fastapi import APIRouter, Depends
from app.dependencies import get_uid
from app.models.kyc import KycSubmission
from app.services import firestore_service

router = APIRouter(prefix="/kyc", tags=["kyc"])

@router.post("/submit")
def submit_kyc(payload: KycSubmission, uid: str = Depends(get_uid)):
    firestore_service.upsert_worker(uid, {
        "kycDocumentUrl": payload.documentUrl,
        "kycDocumentType": payload.documentType,
        "kycStatus": "pending"
    })
    return {"status": "pending"}

@router.get("/status")
def get_status(uid: str = Depends(get_uid)):
    worker = firestore_service.get_worker(uid) or {}
    return {"status": worker.get("kycStatus", "none"),
            "reason": worker.get("kycRejectionReason")}