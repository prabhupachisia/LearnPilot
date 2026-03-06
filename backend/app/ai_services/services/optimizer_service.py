from .groq_client import llama_client
from .prompts import PATH_OPTIMIZER_PROMPT


def optimize_learning_path(existing_path: str, progress: str):
    """
    Improve an existing learning roadmap.
    """

    prompt = PATH_OPTIMIZER_PROMPT.format(
        path=existing_path,
        progress=progress
    )

    result = llama_client.generate(prompt)

    return {
        "optimized_path": result
    }