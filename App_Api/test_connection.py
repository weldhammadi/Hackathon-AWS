# -*- coding: utf-8 -*-
"""
Test script for the Connection Message Generation API
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API URL (adjust if needed)
API_URL = "http://127.0.0.1:8000"

def test_connection_api():
    """
    Test the connection message generation API with sample data
    """
    print("Testing Connection Message Generation API...")
    
    # Sample data
    test_data = {
        "user": {
            "name": "Jean Dupont",
            "title": "Développeur Full Stack",
            "experience": "5 ans d'expérience en développement web, spécialisé dans les technologies JavaScript (React, Node.js) et Python (Django, Flask).",
            "skills": ["JavaScript", "React", "Node.js", "Python", "Django", "Flask", "AWS"],
            "goals": "Je souhaite développer mon réseau dans le domaine du développement web et de l'IA."
        },
        "target": {
            "name": "Marie Martin",
            "title": "Lead Developer",
            "company": "AI Solutions",
            "background": "Diplômée de l'École Polytechnique, spécialisation en IA",
            "interests": ["Intelligence Artificielle", "Python", "Machine Learning", "Cloud Computing"]
        },
        "common_points": ["Développement Python", "Intérêt pour l'IA", "Technologies cloud"]
    }
    
    try:
        # Call the API
        print("Sending request to API...")
        response = requests.post(f"{API_URL}/generate-connection", json=test_data)
        
        # Check response
        if response.status_code == 200:
            result = response.json()
            print("\nAPI Response:")
            print("-" * 50)
            print("Status Code:", response.status_code)
            print("-" * 50)
            print("\nGenerated Connection Message:")
            print("=" * 80)
            print(result["message"])
            print("=" * 80)
            
            # Save the message to a file
            with open("connection_message.txt", "w", encoding="utf-8") as f:
                f.write(result["message"])
            print("\nMessage saved to 'connection_message.txt'")
            
            return True
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"Error testing API: {str(e)}")
        return False

if __name__ == "__main__":
    test_connection_api()
    print("\nTest completed.")