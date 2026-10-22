from datetime import datetime
from app.config import db

COL = "jobs"

def create_job(employer_uid: str, payload: dict) -> dict:
    doc = db.collection(COL).document()
    data = {
        **payload,
        "employerUid": employer_uid,
        "workerUid": None,
        "status": "open",
        "createdAt": datetime.utcnow().isoformat()
    }
    doc.set(data)
    return {"jobId": doc.id, **data}

def accept_job(job_id: str, worker_uid: str) -> dict:
    ref = db.collection(COL).document(job_id)
    snap = ref.get()
    if not snap.exists:
        raise ValueError("Job not found")
    if snap.to_dict().get("status") != "open":
        raise ValueError("Job is no longer open")
    ref.update({"workerUid": worker_uid, "status": "in_progress"})
    return {"jobId": job_id, "status": "in_progress"}

def complete_job(job_id: str, worker_uid: str) -> dict:
    ref = db.collection(COL).document(job_id)
    snap = ref.get()
    if not snap.exists:
        raise ValueError("Job not found")
    data = snap.to_dict()
    if data.get("workerUid") != worker_uid:
        raise ValueError("Not your job")
    ref.update({"status": "completed", "completedAt": datetime.utcnow().isoformat()})
    return {"jobId": job_id, "status": "completed"}

def list_jobs(uid: str, role: str) -> list:
    query = db.collection(COL)
    if role == "employer":
        query = query.where("employerUid", "==", uid)
    elif role == "worker":
        query = query.where("status", "==", "open")
    docs = query.stream()
    return [{"jobId": d.id, **d.to_dict()} for d in docs]