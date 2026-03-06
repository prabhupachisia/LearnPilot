import numpy as np
from typing import List


def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)

    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def retrieve_top_chunks(query_embedding, stored_chunks: List[dict], k: int = 3):
    """
    Retrieve top-k most similar chunks using cosine similarity.
    """

    scored_chunks = []

    for chunk in stored_chunks:
        score = cosine_similarity(query_embedding, chunk["embedding"])

        scored_chunks.append({
            "text": chunk["text"],
            "embedding": chunk["embedding"],
            "score": score
        })

    scored_chunks.sort(key=lambda x: x["score"], reverse=True)

    return scored_chunks[:k]