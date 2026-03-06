from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from app.ai_services.services.learning_path_service import generate_learning_path # Your AI logic
from app.ai_services.services.resource_service import get_resources_for_step # The Serper logic
from app.database import supabase # Your Supabase init

router = APIRouter(prefix="/learning-path", tags=["Learning Path"])

# Request Schema
class PathRequest(BaseModel):
    goal: str
    experience: str
    timeCommitment: str
    style: str
    userId: str # Pass the Clerk User ID

@router.post("/generate")
async def create_path(request: PathRequest):
    try:
        # Call the updated service
        ai_data = generate_learning_path(
            request.goal, 
            request.experience, 
            request.timeCommitment, 
            request.style
        )
        
        db_payload = {
            "user_id": request.userId,
            "goal": ai_data["goal"],
            "experience_level": ai_data["experience_level"],
            "time_commitment": ai_data["time_commitment"],
            "learning_style": ai_data["learning_style"],
            "roadmap_data": ai_data["learning_path"] # This is the JSON list
        }

        result = supabase.table("learning_paths").insert(db_payload).execute()
        return result.data[0]
        
    except Exception as e:
        # Log the full error to your terminal so you can see if it's AI or DB
        print(f"CRITICAL ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user/{user_id}")
async def get_user_paths(user_id: str):
    # Fetch all paths for a specific user
    response = supabase.table("learning_paths").select("*").eq("user_id", user_id).execute()
    return response.data



class ResourceRequest(BaseModel):
    stepTitle: str
    goal: str
    style: str

@router.post("/fetch-resources")
async def fetch_step_resources(request: ResourceRequest):
    try:
        # This calls your Serper/LLM logic to get real links
        resources = get_resources_for_step(
            request.stepTitle, 
            request.goal, 
            request.style
        )
        return {"resources": resources}
    except Exception as e:
        print(f"Error fetching resources: {e}")
        raise HTTPException(status_code=500, detail="Failed to scout for resources")