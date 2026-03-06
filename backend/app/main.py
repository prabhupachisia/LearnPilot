from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .database import supabase
from .auth import verify_token

# 👇 Import your Llama client based on your folder structure
from .ai_services.clients.groq_client import llama_client

app = FastAPI()

# 🛑 CRITICAL: Allow React (Vite port 5173) to talk to this FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Make sure this matches your React port!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Define the data structure we expect from React's DocChat.jsx
class ChatRequest(BaseModel):
    message: str
    selectedDocs: list[str]

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

# 👇 NEW: The endpoint your React app will call for DocChat 👇
@app.post("/api/chat")
async def chat_with_docs(request: ChatRequest):
    try:
        # For now, we are just passing the user's message straight to Groq.
        # Once your PDF upload is ready, we will inject the document text here!
        prompt = f"User asked: {request.message}"
        
        # Call your Groq client
        ai_response = llama_client.generate(prompt=prompt)
        
        return {"response": ai_response}
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))