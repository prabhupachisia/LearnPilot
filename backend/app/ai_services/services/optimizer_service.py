import json

from ..clients import llama_client
from ..prompts import PATH_OPTIMIZER_PROMPT


def optimize_learning_path(
    existing_path: str,
    progress: str,
    experience_level: str = "Beginner"
):
    """
    Analyze and optimize an existing learning roadmap based on user progress.
    """

    prompt = PATH_OPTIMIZER_PROMPT.format(
        path=existing_path,
        progress=progress,
        level=experience_level
    )

    response = llama_client.generate(prompt)

    # Attempt to parse JSON output
    try:
        optimized_path = json.loads(response)
    except Exception:
        optimized_path = response

    return {
        "experience_level": experience_level,
        "optimized_learning_path": optimized_path
    }