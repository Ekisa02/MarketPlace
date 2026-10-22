import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import cloudinary

load_dotenv()

if not firebase_admin._apps:
    cred_path = os.getenv("FIREBASE_CREDENTIALS", "./serviceAccountKey.json")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()
PLATFORM_FEE_RATE = float(os.getenv("PLATFORM_FEE_RATE", "0.15"))
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)