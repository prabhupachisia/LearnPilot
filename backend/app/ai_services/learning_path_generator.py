from .llama_client import llama_client
from .prompts import LEARNING_PATH_PROMPT


def generate_learning_path(goal: str, time_available: str | None = None):
    """
    Generates a structured learning roadmap.
    """

    time_info = time_available if time_available else "No strict time constraint"

    prompt = LEARNING_PATH_PROMPT.format(
        goal=goal,
        time=time_info
    )

    result = llama_client.generate(prompt)

    return {
        "goal": goal,
        "time_available": time_available,
        "learning_path": result
    }