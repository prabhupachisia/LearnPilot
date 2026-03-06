LEARNING_PATH_PROMPT = """
Create a structured learning roadmap.

Goal: {goal}
Time Available: {time}

Provide:

Stages
Topics per stage
Suggested order
Short description for each stage.

If time available is short, create a condensed roadmap.
Return structured bullet points.
"""