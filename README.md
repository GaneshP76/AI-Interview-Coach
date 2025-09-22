# 🎤 AI Interview Coach  

An interactive practice app for **AI/ML technical interviews**. Generates interview questions via a local LLM, collects spoken or typed answers, and (future) provides automated feedback.  Still in Dev

---

## 🚀 Features  
- AI-generated interview questions (Ollama `mistral` by default)  
- FastAPI backend + Next.js 15 / React 19 frontend  
- Speech-to-text input (Chrome browsers)  
- API-ready: `/api/questions` live, `/api/evaluate` planned  

---

## ⚙️ Tech Stack  
- **Frontend:** Next.js 15, React 19, Tailwind CSS  
- **Backend:** FastAPI, Uvicorn, Python 3.11+  
- **AI Model:** Ollama (`mistral`)  
- **Tooling:** Node.js 18+, npm, VS Code  

---

## ⚡ Quick Start  
```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev
```

- API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)  
- UI: [http://localhost:3000](http://localhost:3000)  

---

## 📡 API  
- `GET /api/questions` → Generate interview questions  
- `POST /api/evaluate` → Planned (feedback endpoint)  

---

