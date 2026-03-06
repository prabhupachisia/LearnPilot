from typing import List, Dict, Optional

MAX_CONTEXT_MESSAGES = 6


def build_context(
    question: str,
    history: Optional[List[Dict[str, str]]] = None,
    retrieved_context: Optional[str] = None,
    system_prompt: Optional[str] = None
) -> List[Dict[str, str]]:
    """
    Build the message list for the LLM with context window management.

    Parameters
    ----------
    question : str
        Current user question.

    history : list
        Previous conversation messages in format:
        [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]

    retrieved_context : str
        Optional RAG context retrieved from documents.

    system_prompt : str
        Optional system prompt defining assistant behavior.
    """

    messages = []

    # Add system prompt
    if system_prompt:
        messages.append({
            "role": "system",
            "content": system_prompt
        })
    else:
        messages.append({
            "role": "system",
            "content": "You are a helpful AI learning mentor."
        })

    # Add retrieved document context (RAG)
    if retrieved_context:
        messages.append({
            "role": "system",
            "content": f"Relevant study material:\n{retrieved_context}"
        })

    # Add recent conversation history
    if history:
        recent_history = history[-MAX_CONTEXT_MESSAGES:]
        messages.extend(recent_history)

    # Add current question
    messages.append({
        "role": "user",
        "content": question
    })

    return messages