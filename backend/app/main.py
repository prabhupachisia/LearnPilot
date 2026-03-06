from fastapi import FastAPI, Depends
from .database import supabase
from .auth import verify_token

app = FastAPI()


@app.get("/")
def root():
    return {"message": "StudyMate API running"}


@app.post("/sync-user")
def sync_user(user=Depends(verify_token)):

    clerk_id = user["sub"]
    email = user["email"]

    existing = supabase.table("profiles").select("*").eq("id", clerk_id).execute()

    if not existing.data:
        supabase.table("profiles").insert({
            "id": clerk_id,
            "email": email,
            "first_name": user.get("given_name"),
            "last_name": user.get("family_name")
        }).execute()

    return {"status": "user synced"}