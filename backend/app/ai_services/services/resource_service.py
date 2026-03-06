import json
import re
from ..clients.search_client import search_tool
from ..clients.groq_client import llama_client

def get_resources_for_step(step_title: str, goal: str, learning_style: str):
    # 1. Craft a Google-optimized query
    # Example: "best project-based React Hooks tutorial documentation"
    search_query = f"best {learning_style} tutorials documentation for {step_title} {goal}"
    
    # 2. Get raw data from Serper
    raw_results = search_tool.find_resources(search_query)
    
    if not raw_results:
        return []

    # 3. Use LLM to pick the highest quality educational links
    context = "\n".join([f"- {r['title']} ({r['url']}): {r['snippet']}" for r in raw_results])
    
    prompt = f"""
    You are a Technical Content Curator. From these Google results, select the 3 best links 
    for a student learning '{step_title}'.
    
    Preference: {learning_style}
    Results:
    {context}
    
    Return ONLY a JSON array. 
    Format: [{{ "type": "video|doc", "title": "...", "source": "...", "url": "..." }}]
    """

    ai_response = llama_client.generate(prompt)
    
    try:
        match = re.search(r"(\[.*\])", ai_response, re.DOTALL)
        return json.loads(match.group(1)) if match else []
    except:
        return [{"type": r["type"], "title": r["title"], "source": r["source"], "url": r["url"]} for r in raw_results[:3]]