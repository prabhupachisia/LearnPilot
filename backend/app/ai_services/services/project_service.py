import json

from ..clients import llama_client
from ..prompts import PROJECT_GENERATOR_PROMPT


def generate_projects(topic: str, level: str = "Beginner"):
    """
    Generate practical project ideas for learning a topic.
    """

    prompt = PROJECT_GENERATOR_PROMPT.format(
        topic=topic,
        level=level
    )

    response = llama_client.generate(prompt)

    # Try parsing JSON output from the model
    try:
        projects_data = json.loads(response)
    except Exception:
        projects_data = response

    return {
        "topic": topic,
        "difficulty": level,
        "projects": projects_data
    }