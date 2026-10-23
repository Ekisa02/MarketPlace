from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import kyc, workers, admin, uploads, jobs, stripe, stripe_webhook
from app.config import ALLOWED_ORIGINS

app = FastAPI(title="Local Services Marketplace API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kyc.router)
app.include_router(workers.router)
app.include_router(admin.router)
app.include_router(uploads.router)
app.include_router(jobs.router)
app.include_router(stripe.router)
app.include_router(stripe_webhook.router)

@app.get("/health")
def health():
    return {"ok": True}