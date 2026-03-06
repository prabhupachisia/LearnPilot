from ..clients.mongo_client import ai_db

chat_collection = ai_db["chat_history"]


def get_chat_history(user_id):

    data = chat_collection.find_one({"user_id": user_id})

    if not data:
        return []

    return data.get("messages", [])


def save_message(user_id, message):

    chat_collection.update_one(
        {"user_id": user_id},
        {"$push": {"messages": message}},
        upsert=True
    )