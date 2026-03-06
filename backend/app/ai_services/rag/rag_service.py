from ..rag.document_processor import chunk_text
from ..rag.vector_search import retrieve_top_chunks
from ..clients.hf_embeddings import get_embedding
from ..clients.groq_client import llama_client
from ..db.document_store import save_chunk, get_user_chunks


def ingest_document(user_id: str, text: str):
    """
    Process a document and store chunks with embeddings.
    """

    chunks = chunk_text(text)

    stored_chunks = []

    for chunk in chunks:
        embedding = get_embedding(chunk)

        save_chunk(user_id, chunk, embedding)

        stored_chunks.append({
            "text": chunk,
            "embedding": embedding
        })

    return {
        "message": "Document processed successfully",
        "chunks_created": len(stored_chunks)
    }


def retrieve_context(user_id: str, question: str, k: int = 3):
    """
    Retrieve relevant document chunks for a question.
    """

    query_embedding = get_embedding(question)

    stored_chunks = get_user_chunks(user_id)

    if not stored_chunks:
        return []

    relevant_chunks = retrieve_top_chunks(query_embedding, stored_chunks, k)

    return relevant_chunks


def answer_from_documents(user_id: str, question: str):
    """
    Answer a question using stored user documents.
    """

    relevant_chunks = retrieve_context(user_id, question)

    if not relevant_chunks:
        return {
            "answer": "No relevant documents found for this question.",
            "sources": []
        }

    context = "\n\n".join([chunk["text"] for chunk in relevant_chunks])

    prompt = f"""
You are an AI tutor helping a learner understand material from their study documents.

Use the provided context to answer the question.

Context:
{context}

Question:
{question}

Instructions:
- Base your answer primarily on the context.
- Explain concepts clearly and simply.
- If the context is insufficient, say so instead of guessing.
"""

    answer = llama_client.generate(prompt)

    return {
        "answer": answer,
        "sources": relevant_chunks
    }