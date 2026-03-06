from ..db.chat_store import get_chat_history, save_message
from ..clients.groq_client import llama_client


def ask_learning_assistant(user_id, question):

    history = get_chat_history(user_id)

    messages = [{"role": "system", "content": "You are an expert AI mentor."}]

    messages.extend(history[-6:])

    messages.append({"role": "user", "content": question})

    response = llama_client.chat(messages)

    save_message(user_id, {"role": "user", "content": question})
    save_message(user_id, {"role": "assistant", "content": response})

    return response