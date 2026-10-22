from fastapi import APIRouter, Depends, Query
from app.dependencies import get_uid
from app.services import firestore_service

router = APIRouter(prefix="/workers", tags=["workers"])

@router.get("")
def list_workers(q: str | None = Query(None), _: str = Depends(get_uid)):
    workers = [w for w in firestore_service.search_workers(q)
               if w.get("kycStatus") == "approved"]
    return {"workers": workers}

@router.get("/{uid}")
def get_worker(uid: str, _: str = Depends(get_uid)):
    return firestore_service.get_worker(uid) or {}