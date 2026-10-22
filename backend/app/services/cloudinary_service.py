import time
import cloudinary
import cloudinary.utils

def build_kyc_signature(uid: str) -> dict:
    """Return signed upload params the frontend can pass to Cloudinary."""
    timestamp = int(time.time())
    folder = f"kyc/{uid}"
    params = {
        "timestamp": timestamp,
        "folder": folder,
        "allowed_formats": "jpg,png,pdf",
    }
    signature = cloudinary.utils.api_sign_request(
        params, cloudinary.config().api_secret
    )
    return {
        "signature": signature,
        "timestamp": timestamp,
        "api_key": cloudinary.config().api_key,
        "folder": folder,
    }