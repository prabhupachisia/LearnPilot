from .groq_client import llama_client
from .prompts import PROJECT_GENERATOR_PROMPT


def generate_projects(topic: str, level: str):
    """
    Generate project ideas for learners.
    """

    prompt = PROJECT_GENERATOR_PROMPT.format(
        topic=topic,
        level=level
    )

    result = llama_client.generate(prompt)

    return {
        "topic": topic,
        "difficulty": level,
        "projects": result
    }