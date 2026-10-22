import stripe
from app.config import STRIPE_SECRET_KEY

if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY

def create_destination_charge(total_cents: int, platform_fee_cents: int, worker_account_id: str):
    if not STRIPE_SECRET_KEY:
        raise RuntimeError("Stripe not configured")
    return stripe.PaymentIntent.create(
        amount=total_cents,
        currency="usd",
        application_fee_amount=platform_fee_cents,
        transfer_data={"destination": worker_account_id}
    )