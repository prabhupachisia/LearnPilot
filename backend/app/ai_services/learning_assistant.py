from .llama_client import llama_client
from .prompts import LEARNING_ASSISTANT_PROMPT


def ask_learning_assistant(question: str):
    """
    Chat style AI learning assistant.
    """

    prompt = LEARNING_ASSISTANT_PROMPT.format(
        question=question
    )

    result = llama_client.generate(prompt)

    return {
        "question": question,
        "answer": result
    }