from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai_services.services.assistant_service import ask_learning_assistant

router = APIRouter(prefix="/assistant", tags=["Learning Assistant"])


class QuestionRequest(BaseModel):
    user_id: str
    question: str


@router.post("/ask")
def ask_assistant(data: QuestionRequest):
    """
    Chat-style AI learning assistant.
    """

    try:
        result = ask_learning_assistant(data.user_id, data.question)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))