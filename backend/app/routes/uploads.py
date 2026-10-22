from fastapi import APIRouter, Depends
from app.dependencies import get_uid
from app.services import cloudinary_service

router = APIRouter(prefix="/uploads", tags=["uploads"])

@router.post("/kyc-signature")
def kyc_signature(uid: str = Depends(get_uid)):
    return cloudinary_service.build_kyc_signature(uid)