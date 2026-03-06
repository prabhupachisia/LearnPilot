PATH_OPTIMIZER_PROMPT = """
A learner already has a learning path.

Existing Path:
{path}

Current Progress:
{progress}

Optimize the learning roadmap.

Tasks:
- Remove redundant topics
- Suggest next best topics
- Improve learning order
- Suggest focus areas

Return an improved structured roadmap.
"""