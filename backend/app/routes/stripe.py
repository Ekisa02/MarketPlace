from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_uid
from app.services import stripe_service, firestore_service

router = APIRouter(prefix="/stripe", tags=["stripe"])

@router.post("/onboard")
def onboard(uid: str = Depends(get_uid)):
    worker = firestore_service.get_worker(uid) or {}
    account_id = worker.get("stripeAccountId")
    if not account_id:
        created = stripe_service.create_connect_account(worker.get("email", ""))
        account_id = created["accountId"]
        firestore_service.upsert_worker(uid, {
            "stripeAccountId": account_id,
            "stripeStatus": "pending"
        })
    url = stripe_service.create_onboarding_link(account_id)
    return {"url": url}

@router.get("/status")
def status(uid: str = Depends(get_uid)):
    worker = firestore_service.get_worker(uid) or {}
    account_id = worker.get("stripeAccountId")
    if not account_id:
        return {"connected": False, "status": "not_started"}

    info = stripe_service.account_status(account_id)
    # Persist status so admin can query it
    firestore_service.upsert_worker(uid, {
        "stripeStatus": "active" if info["payoutsEnabled"] else "restricted",
        "stripeChargesEnabled": info["chargesEnabled"],
        "stripePayoutsEnabled": info["payoutsEnabled"]
    })
    return {"connected": True, **info}

@router.get("/dashboard-link")
def dashboard_link(uid: str = Depends(get_uid)):
    worker = firestore_service.get_worker(uid) or {}
    account_id = worker.get("stripeAccountId")
    if not account_id:
        raise HTTPException(400, "No Stripe account connected")
    return {"url": stripe_service.create_login_link(account_id)}