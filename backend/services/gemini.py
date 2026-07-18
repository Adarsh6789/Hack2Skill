import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load env variables
load_dotenv()

class AIService:
    def __init__(self):
        # Read API key from env file, fallback to system environment variable
        api_key = os.getenv("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY")
        self.api_key_configured = bool(api_key and api_key.strip())
        
        if self.api_key_configured:
            genai.configure(api_key=api_key)
            self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        else:
            self.model_name = None

    def test_connection(self) -> dict:
        """
        Verify that the Gemini API is correctly configured and working.
        """
        if not self.api_key_configured:
            return {
                "success": False,
                "error": "Gemini API key is not configured. Please set GEMINI_API_KEY in your backend/.env file or system environment."
            }
        try:
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content("Hello! Verify connection. Respond with 'Connection verified successfully.'")
            return {
                "success": True,
                "response": response.text.strip()
            }
        except Exception as e:
            return {
                "success": False,
                "error": f"Error calling Gemini API: {str(e)}"
            }
