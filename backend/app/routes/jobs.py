from fastapi import APIRouter, Depends, Header, HTTPException
from app.dependencies import get_uid
from app.models.job import JobCreate
from app.services import job_service

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("")
def list_jobs(uid: str = Depends(get_uid), x_user_role: str = Header(None)):
    return {"jobs": job_service.list_jobs(uid, x_user_role or "")}

@router.post("")
def create_job(payload: JobCreate, uid: str = Depends(get_uid),
               x_user_role: str = Header(None)):
    if x_user_role != "employer":
        raise HTTPException(403, "Only employers can create jobs")
    return job_service.create_job(uid, payload.model_dump())

@router.post("/{job_id}/accept")
def accept_job(job_id: str, uid: str = Depends(get_uid),
               x_user_role: str = Header(None)):
    if x_user_role != "worker":
        raise HTTPException(403, "Only workers can accept jobs")
    try:
        return job_service.accept_job(job_id, uid)
    except ValueError as e:
        raise HTTPException(400, str(e))

@router.post("/{job_id}/complete")
def complete_job(job_id: str, uid: str = Depends(get_uid),
                 x_user_role: str = Header(None)):
    if x_user_role != "worker":
        raise HTTPException(403, "Only workers can complete jobs")
    try:
        return job_service.complete_job(job_id, uid)
    except ValueError as e:
        raise HTTPException(400, str(e))