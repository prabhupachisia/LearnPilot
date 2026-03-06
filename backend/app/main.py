from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import learningpath  # Ensure this import matches your folder structure

app = FastAPI(title="LearnPilot AI API")

# 1. CORS CONFIGURATION
# Crucial for local development! This allows your Vite/React 
# frontend (usually port 5173) to communicate with FastAPI (port 8000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)

# 2. ROUTE REGISTRATION
# This connects the /learning-path/generate endpoint you built

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "LearnPilot AI Engine is running",
        "version": "1.0.0"
    }

# Optional: Global exception handler to capture AI service errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return {
        "error": "Internal Server Error",
        "detail": str(exc)
    }


app.include_router(learningpath.router)