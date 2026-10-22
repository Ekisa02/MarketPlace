from datetime import datetime
from app.config import db


def submit(uid: str, document_url: str, document_type: str | None) -> dict:
    db.collection("workers").document(uid).set({
        "kycDocumentUrl": document_url,
        "kycDocumentType": document_type,
        "kycStatus": "pending",
        "kycSubmittedAt": datetime.utcnow().isoformat(),
    }, merge=True)
    return {"status": "pending"}


def set_status(uid: str, status: str, reason: str | None = None) -> dict:
    payload = {
        "kycStatus": status,
        "kycReviewedAt": datetime.utcnow().isoformat(),
    }
    if reason:
        payload["kycRejectionReason"] = reason
    db.collection("workers").document(uid).set(payload, merge=True)
    return {"status": status}