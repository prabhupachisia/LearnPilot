from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..ai_services.rag.rag_service import (
    ingest_document,
    retrieve_context,
    answer_from_documents
)

router = APIRouter(prefix="/rag", tags=["RAG"])


class DocumentRequest(BaseModel):
    user_id: str
    text: str


class QuestionRequest(BaseModel):
    user_id: str
    question: str


@router.post("/ingest")
def upload_document(data: DocumentRequest):
    """
    Upload a document and store embeddings.
    """

    try:
        result = ingest_document(data.user_id, data.text)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/retrieve")
def retrieve_chunks(data: QuestionRequest):
    """
    Retrieve relevant chunks for a question.
    """

    try:
        chunks = retrieve_context(data.user_id, data.question)
        return {"chunks": chunks}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ask")
def ask_from_documents(data: QuestionRequest):
    """
    Ask a question using uploaded documents (RAG).
    """

    try:
        result = answer_from_documents(data.user_id, data.question)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))