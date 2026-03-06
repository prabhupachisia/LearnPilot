import json
import re
from ..clients import llama_client
from ..prompts import LEARNING_PATH_PROMPT

def generate_learning_path(goal: str, experience_level: str, time_commitment: str, learning_style: str):
    """
    Generates a structured learning path. 
    Handles AI formatting inconsistencies and prepares data for Supabase.
    """
    # 1. Map commitment to a readable string for the LLM
    commitment_desc = {
        "casual": "2-5 hours per week (Light pace)",
        "part-time": "10-15 hours per week (Steady progress)",
        "intensive": "20+ hours per week (Deep immersion)"
    }

    # 2. Format the prompt
    # Note: Ensure your LEARNING_PATH_PROMPT in prompts.py uses {{ }} for JSON braces
    try:
        prompt = LEARNING_PATH_PROMPT.format(
            goal=goal,
            level=experience_level,
            time=commitment_desc.get(time_commitment, time_commitment),
            style=learning_style
        )
    except KeyError as e:
        print(f"❌ Prompt Formatting Error: Missing key {e}")
        prompt = f"Create a structured learning JSON roadmap for {goal} at {experience_level} level."

    # 3. Call AI
    response = llama_client.generate(prompt)

    # 4. Clean and Parse JSON (The "Anti-Chatter" Logic)
    try:
        # Aggressively look for anything between the first [ and last ]
        # This ignores "Sure! Here is your path:" text prefixing the JSON
        json_match = re.search(r"(\[.*\])", response, re.DOTALL)
        
        if json_match:
            json_str = json_match.group(1)
        else:
            # Fallback for triple backticks
            json_str = response.strip().replace("```json", "").replace("```", "")
        
        learning_path = json.loads(json_str.strip())
        
    except Exception as e:
        print(f"⚠️ AI JSON Parse Error: {e}")
        # Structured fallback so the database insert doesn't fail
        learning_path = [{
            "id": "step_1",
            "title": "Getting Started with " + goal,
            "description": "Initial research and setup for your learning journey.",
            "resources": [
                {"type": "doc", "title": "General Overview", "source": "Google", "url": "https://google.com"}
            ]
        }]

    # 5. Return structured data
    return {
        "goal": goal,
        "experience_level": experience_level,
        "time_commitment": time_commitment,
        "learning_style": learning_style,
        "learning_path": learning_path  # This maps to 'roadmap_data' in your route
    }


