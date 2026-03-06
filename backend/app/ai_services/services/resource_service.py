import json

from ..clients import llama_client
from ..prompts import RESOURCE_RECOMMEND_PROMPT


def recommend_resources(topic: str, level: str = "Beginner"):
    """
    Recommend learning resources for a given topic.
    """

    prompt = RESOURCE_RECOMMEND_PROMPT.format(
        topic=topic,
        level=level
    )

    response = llama_client.generate(prompt)

    # Try parsing JSON output from the model
    try:
        resources_data = json.loads(response)
    except Exception:
        resources_data = response

    return {
        "topic": topic,
        "difficulty": level,
        "resources": resources_data
    }