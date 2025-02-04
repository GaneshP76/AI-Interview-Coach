from fastapi import APIRouter

router = APIRouter()

@router.get("/questions")
def get_questions():
    return {"questions": ["What is machine learning?", "Explain deep learning."]}
