from fastapi import APIRouter, Depends
from app.dependencies import require_admin
from app.models.kyc import KycDecision
from app.services import firestore_service

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])

@router.get("/pending-kyc")
def pending_kyc():
    return {"workers": firestore_service.query_pending_kyc()}

@router.post("/kyc/approve")
def approve_kyc(decision: KycDecision):
    firestore_service.set_kyc_status(decision.uid, "approved")
    return {"status": "approved"}

@router.post("/kyc/reject")
def reject_kyc(decision: KycDecision):
    firestore_service.set_kyc_status(decision.uid, "rejected", decision.reason)
    return {"status": "rejected"}