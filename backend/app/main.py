from fastapi import FastAPI
from app.routes import interview

app = FastAPI()

# Register routes
app.include_router(interview.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend is working!"}
