import stripe
from app.config import STRIPE_SECRET_KEY, FRONTEND_ORIGIN

stripe.api_key = STRIPE_SECRET_KEY or None

def create_connect_account(email: str) -> dict:
    account = stripe.Account.create(
        type="express",
        email=email or None,
        capabilities={"transfers": {"requested": True}},
    )
    return {"accountId": account.id}

def create_onboarding_link(account_id: str) -> str:
    link = stripe.AccountLink.create(
        account=account_id,
        refresh_url=f"{FRONTEND_ORIGIN}/worker/payouts?stripe=refresh",
        return_url=f"{FRONTEND_ORIGIN}/worker/payouts?stripe=done",
        type="account_onboarding",
    )
    return link.url

def account_status(account_id: str) -> dict:
    account = stripe.Account.retrieve(account_id)
    return {
        "chargesEnabled": account.charges_enabled,
        "payoutsEnabled": account.payouts_enabled,
        "detailsSubmitted": account.details_submitted,
        "requirementsDue": account.requirements.currently_due if account.requirements else [],
    }

def create_destination_charge(total_cents: int, fee_cents: int,
                              worker_account_id: str, job_id: str) -> dict:
    intent = stripe.PaymentIntent.create(
        amount=total_cents,
        currency="usd",
        application_fee_amount=fee_cents,
        transfer_data={"destination": worker_account_id},
        metadata={"jobId": job_id},
    )
    return {"clientSecret": intent.client_secret, "paymentIntentId": intent.id}

def create_login_link(account_id: str) -> str:
    link = stripe.Account.create_login_link(account_id)
    return link.url                                                                                                                                   

    