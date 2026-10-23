from fastapi import Header, HTTPException


def get_uid(x_user_uid: str = Header(None)) -> str:
    """Extract the user UID injected by the Express gateway."""
    if not x_user_uid:
        raise HTTPException(status_code=401, detail="Missing user identity")
    return x_user_uid


def require_admin(x_user_role: str = Header(None)) -> bool:
    """Guard: only allow requests from an authenticated admin."""
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return True