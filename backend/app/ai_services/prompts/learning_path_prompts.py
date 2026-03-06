# prompts.py
LEARNING_PATH_PROMPT = """
You are an expert tutor. Create a learning roadmap for: {goal}
Level: {level}
Time: {time}
Style: {style}

Return ONLY a JSON array. 
Example format:
[
  {{
    "id": "step_1",
    "title": "Introduction",
    "description": "Basics of the topic.",
    "resources": []
  }}
]
"""