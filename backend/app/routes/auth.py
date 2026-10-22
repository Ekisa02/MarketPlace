from fastapi import APIRouter, Depends
from app.dependencies import get_uid
from app.config import db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me")
def me(uid: str = Depends(get_uid)):
    """Return the current user's profile from Firestore."""
    snap = db.collection("users").document(uid).get()
    if not snap.exists:
        return {"uid": uid, "role": None}
    return {"uid": uid, **snap.to_dict()}