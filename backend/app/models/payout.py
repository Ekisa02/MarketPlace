from pydantic import BaseModel
from typing import Literal


class PayoutRequest(BaseModel):
    jobId: str
    workerUid: str
    amountCents: int
    commissionCents: int


class PayoutRecord(BaseModel):
    payoutId: str
    workerUid: str
    jobId: str
    amountCents: int
    commissionCents: int
    status: Literal["pending", "paid", "failed"]