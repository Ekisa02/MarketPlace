import stripe
from fastapi import APIRouter, Request, HTTPException
from app.config import STRIPE_WEBHOOK_SECRET, db

router = APIRouter(prefix="/stripe", tags=["stripe"])

@router.post("/webhook")
async def webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except Exception as e:
        raise HTTPException(400, f"Webhook error: {e}")

    etype = event["type"]

    if etype == "payment_intent.succeeded":
        pi = event["data"]["object"]
        job_id = pi["metadata"].get("jobId")
        if job_id:
            db.collection("jobs").document(job_id).update({
                "paymentStatus": "paid",
                "paymentIntentId": pi["id"]
            })

    elif etype == "account.updated":
        acct = event["data"]["object"]
        # Find worker by stripeAccountId
        docs = db.collection("workers").where("stripeAccountId", "==", acct["id"]).stream()
        for d in docs:
            d.reference.update({
                "stripeStatus": "active" if acct.get("payouts_enabled") else "restricted",
                "stripeChargesEnabled": acct.get("charges_enabled"),
                "stripePayoutsEnabled": acct.get("payouts_enabled")
            })

    return {"received": True}