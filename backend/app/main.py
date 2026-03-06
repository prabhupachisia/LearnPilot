from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .database import supabase
from .auth import verify_token

# AI client
from .ai_services.clients.groq_client import llama_client

# Import AI routers
from app.routes import rag_router, assistant_router, learning_path_router

app = FastAPI()

# CORS (React Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(rag_router)
app.include_router(assistant_router)
app.include_router(learning_path_router)


# Request model for basic chat
class ChatRequest(BaseModel):
    message: str
    selectedDocs: list[str] | None = None


@app.get("/")
def root():
    return {"message": "StudyMate API running"}


# Sync user with Supabase
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


# Basic AI chat endpoint (used by React DocChat)
@app.post("/api/chat")
async def chat_with_docs(request: ChatRequest):
    try:
        prompt = f"""
You are an AI tutor helping a student learn concepts.

User question:
{request.message}

Answer clearly and helpfully.
"""

        ai_response = llama_client.generate(prompt=prompt)

        return {
            "response": ai_response
        }

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))