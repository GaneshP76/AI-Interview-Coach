from fastapi import FastAPI
from app.routes import interview
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Correctly register routes
app.include_router(interview.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend is working!"}
