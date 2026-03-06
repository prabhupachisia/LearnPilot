from fastapi import APIRouter, Request
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@router.post("/webhooks/clerk")
async def clerk_webhook(request: Request):

    payload = await request.json()

    if payload["type"] == "user.created":

        user = payload["data"]

        user_id = user["id"]
        email = user["email_addresses"][0]["email_address"]
        first_name = user.get("first_name")
        last_name = user.get("last_name")

        supabase.table("profiles").insert({
            "id": user_id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name
        }).execute()

    return {"status": "ok"}