from fastapi import Header, HTTPException
from jose import jwt
import requests

CLERK_JWKS_URL = "https://destined-vervet-4.clerk.accounts.dev/.well-known/jwks.json"

jwks = requests.get(CLERK_JWKS_URL).json()

def verify_token(authorization: str = Header(...)):

    token = authorization.split(" ")[1]

    try:
        payload = jwt.get_unverified_claims(token)
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")