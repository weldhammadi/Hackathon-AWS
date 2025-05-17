# -*- coding: utf-8 -*-
"""
Test script for the Cover Letter Generation API
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API URL (adjust if needed)
API_URL = "http://127.0.0.1:8000"

def test_api():
    """
    Test the cover letter generation API with sample data
    """
    print("Testing Cover Letter Generation API...")
    
    # Sample user data
    test_data = {
        "user": {
            "name": "Jean Dupont",
            "title": "Développeur Full Stack",
            "experience": "5 ans d'expérience en développement web, spécialisé dans les technologies JavaScript (React, Node.js) et Python (Django, Flask). J'ai travaillé sur des projets e-commerce à forte charge et des applications SaaS.",
            "skills": ["JavaScript", "React", "Node.js", "Python", "Django", "Flask", "SQL", "NoSQL", "AWS", "Docker"],
            "goals": "Je souhaite rejoindre une entreprise innovante où je pourrai contribuer à des projets à fort impact tout en développant mes compétences en architecture logicielle et en IA."
        },
        "job": {
            "title": "Lead Développeur Full Stack",
            "company": "TechInnovation",
            "description": "Nous recherchons un Lead Développeur Full Stack pour diriger notre équipe de développement web. Vous serez responsable de la conception et du développement de nouvelles fonctionnalités pour notre plateforme SaaS, ainsi que de l'encadrement technique de l'équipe.",
            "requirements": ["5+ ans d'expérience en développement web", "Maîtrise de JavaScript et Python", "Expérience avec React et Node.js", "Connaissance des architectures cloud", "Capacité à diriger une équipe technique", "Bonne communication"]
        }
    }
    
    try:
        # Call the API
        print("Sending request to API...")
        response = requests.post(f"{API_URL}/generate", json=test_data)
        
        # Check response
        if response.status_code == 200:
            result = response.json()
            print("\nAPI Response:")
            print("-" * 50)
            print("Status Code:", response.status_code)
            print("-" * 50)
            print("\nGenerated Cover Letter:")
            print("=" * 80)
            print(result["letter"])
            print("=" * 80)
            
            # Save the letter to a file
            with open("generated_letter.txt", "w", encoding="utf-8") as f:
                f.write(result["letter"])
            print("\nLetter saved to 'generated_letter.txt'")
            
            return True
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"Error testing API: {str(e)}")
        return False

def test_email_formatting():
    """
    Test function to format the generated letter as an email
    """
    try:
        # Check if the letter file exists
        if not os.path.exists("generated_letter.txt"):
            print("No generated letter found. Please run the API test first.")
            return False
            
        # Read the generated letter
        with open("generated_letter.txt", "r", encoding="utf-8") as f:
            letter_content = f.read()
        
        # Format as email
        email_subject = "Candidature pour le poste de Lead Développeur Full Stack - Jean Dupont"
        recipient = "recrutement@techinnovation.com"
        sender = "jean.dupont@email.com"
        
        email_content = f"""De: {sender}
À: {recipient}
Objet: {email_subject}

{letter_content}

--
Jean Dupont
Développeur Full Stack
Tél: 06 12 34 56 78
Email: jean.dupont@email.com
LinkedIn: linkedin.com/in/jeandupont
"""
        
        # Save the email to a file
        with open("formatted_email.txt", "w", encoding="utf-8") as f:
            f.write(email_content)
            
        print("\nEmail formatted and saved to 'formatted_email.txt'")
        print("\nEmail Preview:")
        print("-" * 50)
        print(email_content[:300] + "...")
        print("-" * 50)
        
        return True
        
    except Exception as e:
        print(f"Error formatting email: {str(e)}")
        return False

if __name__ == "__main__":
    # Test the API
    api_success = test_api()
    
    # If API test was successful, test email formatting
    if api_success:
        test_email_formatting()
    
    print("\nTest completed.")