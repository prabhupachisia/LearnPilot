from ..clients import llama_client
from ..prompts import LEARNING_ASSISTANT_PROMPT
from ..utils import build_context
from ..db import get_chat_history, save_message


def ask_learning_assistant(user_id: str, question: str):
    """
    Chat-style AI learning assistant with conversation context.
    """

    # Fetch previous chat history
    history = get_chat_history(user_id)

    # Build message context
    messages = build_context(
        question=question,
        history=history,
        system_prompt=LEARNING_ASSISTANT_PROMPT
    )

    # Generate response from Groq
    response = llama_client.chat(messages)

    # Save conversation
    save_message(user_id, {"role": "user", "content": question})
    save_message(user_id, {"role": "assistant", "content": response})

    return {
        "question": question,
        "answer": response
    }