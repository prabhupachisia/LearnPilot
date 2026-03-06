from ..clients.mongo_client import ai_db

documents = ai_db["documents"]
chunks = ai_db["document_chunks"]


def save_document(user_id, title):

    return documents.insert_one({
        "user_id": user_id,
        "title": title
    })


def save_chunk(user_id, text, embedding):

    chunks.insert_one({
        "user_id": user_id,
        "text": text,
        "embedding": embedding
    })


def get_user_chunks(user_id):

    return list(chunks.find({"user_id": user_id}))