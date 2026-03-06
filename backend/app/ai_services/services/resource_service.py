from .groq_client import llama_client
from .prompts import RESOURCE_RECOMMEND_PROMPT


def recommend_resources(topic: str):
    """
    Recommend learning resources for a topic.
    """

    prompt = RESOURCE_RECOMMEND_PROMPT.format(topic=topic)

    result = llama_client.generate(prompt)

    return {
        "topic": topic,
        "resources": result
    }