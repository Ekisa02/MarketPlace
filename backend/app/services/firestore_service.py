from datetime import datetime
from app.config import db

def get_worker(uid: str):
    snap = db.collection("workers").document(uid).get()
    return {"uid": uid, **snap.to_dict()} if snap.exists else None

def upsert_worker(uid: str, data: dict):
    data["updatedAt"] = datetime.utcnow().isoformat()
    db.collection("workers").document(uid).set(data, merge=True)

def set_kyc_status(uid: str, status: str, reason: str | None = None):
    payload = {
        "kycStatus": status,
        "kycReviewedAt": datetime.utcnow().isoformat()
    }
    if reason:
        payload["kycRejectionReason"] = reason
    db.collection("workers").document(uid).set(payload, merge=True)

def query_pending_kyc():
    docs = db.collection("workers").where("kycStatus", "==", "pending").stream()
    return [{"uid": d.id, **d.to_dict()} for d in docs]

def search_workers(query: str | None = None):
    docs = db.collection("workers").stream()
    results = []
    for d in docs:
        data = d.to_dict()
        if query:
            haystack = f"{data.get('name','')} {data.get('skill','')} {data.get('city','')}".lower()
            if query.lower() not in haystack:
                continue
        results.append({"uid": d.id, **data})
    return results