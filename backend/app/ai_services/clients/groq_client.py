import os
from groq import Groq
from pathlib import Path

MODEL_NAME = "llama-3.3-70b-versatile"
from dotenv import load_dotenv
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

class LlamaClient:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")

        self.client = Groq(api_key=api_key)

    def generate(self, prompt: str, temperature: float = 0.4, max_tokens: int = 1024):
        try:
            response = self.client.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": "You are an expert AI learning mentor."},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=max_tokens
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            return f"Error generating response: {str(e)}"


llama_client = LlamaClient()