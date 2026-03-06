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


RESOURCE_RECOMMEND_PROMPT = """
Recommend high quality learning resources for:

Topic: {topic}

Include:
- courses
- tutorials
- documentation
- articles

Keep it concise and practical.
"""


PROJECT_GENERATOR_PROMPT = """
Suggest practical projects for learning:

Topic: {topic}
Difficulty Level: {level}

For each project include:

Title
Short Description
Skills Practiced

Generate 3-5 projects.
"""


LEARNING_ASSISTANT_PROMPT = """
You are a helpful AI learning mentor.

Answer the following learning question clearly and simply:

Question:
{question}
"""


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