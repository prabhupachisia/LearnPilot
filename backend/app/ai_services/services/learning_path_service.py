import json
from ..clients import llama_client
from ..prompts import LEARNING_PATH_PROMPT


def generate_learning_path(
    goal: str,
    time_available: str | None = None,
    experience_level: str = "Beginner"
):
    """
    Generate a structured learning roadmap for a given goal.
    """

    time_info = time_available if time_available else "No strict time constraint"

    prompt = LEARNING_PATH_PROMPT.format(
        goal=goal,
        time=time_info,
        level=experience_level
    )

    response = llama_client.generate(prompt)

    # Attempt to parse JSON response
    try:
        learning_path = json.loads(response)
    except Exception:
        learning_path = response

    return {
        "goal": goal,
        "experience_level": experience_level,
        "time_available": time_available,
        "learning_path": learning_path
    }