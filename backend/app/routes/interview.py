import ollama
from fastapi import APIRouter

router = APIRouter()

@router.get("/questions")
def generate_questions():
    prompt = "Generate 5 AI/ML interview questions."
    response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
    questions = response["message"]["content"].split("\n")  # Extract questions
    return {"questions": [q.strip() for q in questions if q.strip()]}
