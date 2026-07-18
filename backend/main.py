import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from services.gemini import AIService

# Load environment variables
load_dotenv()

app = FastAPI(title="MindShift AI API", description="AI Companion for breaking bad habits & addictions")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production as needed (e.g. ["http://localhost:5173", "http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Service
ai_service = AIService()

@app.get("/api/health")
def health_check():
    """
    Basic health check to ensure backend is running.
    """
    return {
        "status": "healthy",
        "service": "MindShift AI Backend",
        "gemini_configured": ai_service.api_key_configured
    }

@app.get("/api/test-gemini")
def test_gemini():
    """
    Test connectivity to the Gemini API.
    """
    # Re-initialize service in case key was updated in environment/dot-env after start
    global ai_service
    ai_service = AIService()
    
    result = ai_service.test_connection()
    return result

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "127.0.0.1")
    uvicorn.run("main:app", host=host, port=port, reload=True)
