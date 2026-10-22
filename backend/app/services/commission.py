from app.config import PLATFORM_FEE_RATE

def calculate_commission(total_cents: int, rate: float | None = None) -> dict:
    r = rate if rate is not None else PLATFORM_FEE_RATE
    fee = int(total_cents * r)
    return {
        "total_cents": total_cents,
        "platform_fee_cents": fee,
        "worker_payout_cents": total_cents - fee,
        "rate": r
    }