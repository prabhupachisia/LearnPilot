import re


def chunk_text(text: str, chunk_size: int = 400, overlap: int = 50):
    """
    Split text into overlapping chunks suitable for embeddings/RAG.
    Uses sentence boundaries when possible for better semantic chunks.
    """

    if not text or not text.strip():
        return []

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()

    # Split into sentences
    sentences = re.split(r'(?<=[.!?]) +', text)

    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        sentence_words = sentence.split()
        sentence_length = len(sentence_words)

        if current_length + sentence_length > chunk_size:
            chunks.append(" ".join(current_chunk))

            # add overlap
            overlap_words = current_chunk[-overlap:] if overlap < len(current_chunk) else current_chunk
            current_chunk = overlap_words.copy()
            current_length = len(current_chunk)

        current_chunk.extend(sentence_words)
        current_length += sentence_length

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks