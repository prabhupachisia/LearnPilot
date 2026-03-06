import os
import requests
import json

class SearchTool:
    def __init__(self):
        self.api_key = os.environ.get("SERPER_API_KEY")
        self.url = "https://google.serper.dev/search"

    def find_resources(self, query: str, max_results: int = 5):
        payload = json.dumps({
            "q": query,
            "num": max_results
        })
        headers = {
            'X-API-KEY': self.api_key,
            'Content-Type': 'application/json'
        }

        try:
            response = requests.request("POST", self.url, headers=headers, data=payload)
            results = response.json()
            
            output = []
            # Serper separates organic results and videos
            # We'll prioritize organic but check for YouTube links
            for res in results.get('organic', []):
                link = res.get('link', '')
                res_type = "video" if "youtube.com" in link or "vimeo.com" in link else "doc"
                
                output.append({
                    "title": res.get('title'),
                    "url": link,
                    "source": self._extract_source(link),
                    "type": res_type,
                    "snippet": res.get('snippet') # Useful for LLM context
                })
            return output
        except Exception as e:
            print(f"Serper Error: {e}")
            return []

    def _extract_source(self, url: str):
        from urllib.parse import urlparse
        domain = urlparse(url).netloc
        return domain.replace('www.', '').split('.')[0].capitalize()

search_tool = SearchTool()