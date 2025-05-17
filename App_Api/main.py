# -*- coding: utf-8 -*-
"""
API REST pour la génération de lettres de motivation avec IA
Utilise FastAPI et AWS Bedrock pour générer des lettres personnalisées
"""

import os
import json
from typing import Dict, List, Optional, Union
from enum import Enum
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import boto3
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
# Load environment variables from .env file
load_dotenv()

# Configuration de l'API
app = FastAPI(
    title="API de génération de lettres de motivation",
    description="Génère des lettres de motivation personnalisées à partir d'un profil et d'une offre d'emploi",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins (frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
# Modèles de données
class User(BaseModel):
    name: str = Field(..., description="Nom complet du candidat")
    title: str = Field(..., description="Poste actuel du candidat")
    experience: str = Field(..., description="Résumé de l'expérience professionnelle")
    skills: List[str] = Field(..., description="Liste des compétences du candidat")
    goals: str = Field(..., description="Objectifs professionnels du candidat")

class Job(BaseModel):
    title: str = Field(..., description="Titre du poste")
    company: str = Field(..., description="Nom de l'entreprise")
    description: str = Field(..., description="Description du poste")
    requirements: List[str] = Field(..., description="Liste des compétences ou qualités recherchées")

class Target(BaseModel):
    name: str = Field(..., description="Nom complet de la personne cible")
    title: str = Field(..., description="Poste actuel de la personne cible")
    company: str = Field(..., description="Entreprise actuelle de la personne cible")
    background: Optional[str] = Field(None, description="Formation ou parcours professionnel")
    interests: Optional[List[str]] = Field(None, description="Centres d'intérêt professionnels")

class ConnectionRequest(BaseModel):
    user: User
    target: Target
    common_points: Optional[List[str]] = Field(None, description="Points communs entre l'utilisateur et la cible (école, domaine, intérêts)")

class ConnectionResponse(BaseModel):
    message: str = Field(..., description="Message de connexion généré")

class GenerateRequest(BaseModel):
    user: User
    job: Job

class GenerateResponse(BaseModel):
    letter: str = Field(..., description="Lettre de motivation générée")

class LLMProvider(str, Enum):
    OPENAI = "openai"
    AWS_BEDROCK = "aws_bedrock"

# Classe pour gérer les différents fournisseurs de LLM
class LLMService:
    def __init__(self, provider: LLMProvider = LLMProvider.AWS_BEDROCK):
        self.provider = provider
    
    def generate_letter(self, user: User, job: Job) -> str:
        """
        Génère une lettre de motivation en utilisant le fournisseur LLM configuré
        """
        # Construction du prompt pour le LLM
        prompt = self._build_prompt(user, job)
        
        # Génération de la lettre selon le fournisseur
        if self.provider == LLMProvider .OPENAI:
            return self._generate_with_openai(prompt)
        elif self.provider == LLMProvider.AWS_BEDROCK:
            return self._generate_with_aws_bedrock(prompt)
        else:
            raise ValueError(f"Fournisseur LLM non pris en charge: {self.provider}")
    
    def generate_connection_message(self, user: User, target: Target, common_points: Optional[List[str]] = None) -> str:
        """
        Génère un message de connexion personnalisé
        """
        # Construction du prompt pour le LLM
        prompt = self._build_connection_prompt(user, target, common_points)
        
        # Génération du message selon le fournisseur
        if self.provider == LLMProvider.OPENAI:
            return self._generate_with_openai(prompt)
        elif self.provider == LLMProvider.AWS_BEDROCK:
            return self._generate_with_aws_bedrock(prompt)
        else:
            raise ValueError(f"Fournisseur LLM non pris en charge: {self.provider}")
    
    def _build_prompt(self, user: User, job: Job) -> str:
        """
        Construit un prompt structuré pour le LLM
        """
        prompt = f"""
Tu es un expert en rédaction de lettres de motivation professionnelles. 
Génère une lettre de motivation formelle et professionnelle pour la personne suivante qui postule à une offre d'emploi, sans aucun texte d'introduction ou de conclusion de ta part.

PROFIL DU CANDIDAT:
- Nom: {user.name}
- Poste actuel: {user.title}
- Expérience: {user.experience}
- Compétences: {', '.join(user.skills)}
- Objectifs professionnels: {user.goals}

DÉTAILS DU POSTE:
- Titre: {job.title}
- Entreprise: {job.company}
- Description: {job.description}
- Compétences requises: {', '.join(job.requirements)}

CONSIGNES:
1. Rédige une lettre de motivation formelle et professionnelle
2. Mets en avant les compétences du candidat qui correspondent aux exigences du poste
3. Utilise un ton professionnel et engageant
4. Structure la lettre avec une introduction, un développement et une conclusion
5. N'invente aucune information qui n'est pas fournie dans le profil
6. Adapte le contenu au secteur d'activité et au poste
7. Inclus la date du jour en haut de la lettre
8. Termine par une formule de politesse appropriée

FORMAT:
- Lettre complète avec en-tête, corps et signature
- Texte brut (pas de mise en forme HTML)
"""
        return prompt
    
    def _build_connection_prompt(self, user: User, target: Target, common_points: Optional[List[str]] = None) -> str:
        """
        Construit un prompt pour générer un message de connexion
        """
        common_points_text = ", ".join(common_points) if common_points else "Aucun point commun spécifié"
        
        prompt = f"""
Tu es un expert en réseautage professionnel. 
Génère un message de connexion personnalisé pour établir un premier contact sur LinkedIn ou une plateforme similaire.

PROFIL DE L'EXPÉDITEUR:
- Nom: {user.name}
- Poste actuel: {user.title}
- Expérience: {user.experience}
- Compétences: {', '.join(user.skills)}
- Objectifs professionnels: {user.goals}

PROFIL DU DESTINATAIRE:
- Nom: {target.name}
- Poste actuel: {target.title}
- Entreprise: {target.company}
- Formation/Parcours: {target.background if target.background else "Non spécifié"}
- Intérêts: {', '.join(target.interests) if target.interests else "Non spécifiés"}

POINTS COMMUNS:
{common_points_text}

CONSIGNES:
1. Rédige un message court et percutant (maximum 300 caractères)
2. Mentionne clairement les points communs ou la raison de la connexion
3. Sois professionnel mais chaleureux
4. Évite les formules génériques comme "Je souhaite ajouter votre profil à mon réseau"
5. Inclus une question ouverte ou une proposition de valeur pour encourager une réponse
6. N'invente aucune information qui n'est pas fournie dans les profils

FORMAT:
- Message court et direct, prêt à être envoyé
- Pas de formule d'introduction ou de signature (elles sont ajoutées automatiquement par la plateforme)
"""
        return prompt
    
    def _generate_with_openai(self, prompt: str) -> str:
        """
        Génère une lettre de motivation en utilisant l'API OpenAI
        """
        try:
            import openai
            openai.api_key = os.environ.get("OPENAI_API_KEY", "")
            
            response = openai.ChatCompletion.create(
                model="gpt-4",  # ou "gpt-3.5-turbo" pour un modèle moins coûteux
                messages=[
                    {"role": "system", "content": "Tu es un expert en rédaction de lettres de motivation professionnelles."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1500,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erreur lors de la génération avec OpenAI: {str(e)}")
    
    def _generate_with_aws_bedrock(self, prompt: str) -> str:
        """
        Génère une lettre de motivation en utilisant AWS Bedrock
        """
        try:
            # Récupération de la région AWS
            region = os.environ.get("AWS_REGION", "us-east-1")
            
            # Initialisation du client Bedrock Runtime
            bedrock_runtime = boto3.client(
                service_name='bedrock-runtime',
                region_name=region
            )
            
            # Format de requête pour Claude 3
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1500,
                "top_k": 250,
                "temperature": 0.7,
                "top_p": 0.9,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ]
            })
            
            # Appel au modèle
            response = bedrock_runtime.invoke_model(
                modelId="anthropic.claude-3-sonnet-20240229-v1:0",  # Updated model ID
                contentType="application/json",
                accept="application/json",
                body=body
            )
            
            # Traitement de la réponse
            response_body = json.loads(response.get('body').read())
            return response_body.get('content')[0]['text'].strip()
            
        except Exception as e:
            # Add better error logging
            print(f"AWS Bedrock Error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Erreur lors de la génération avec AWS Bedrock: {str(e)}")

# Initialisation du service LLM avec AWS Bedrock par défaut
llm_service = LLMService(provider=LLMProvider.AWS_BEDROCK)

# Routes de l'API
@app.get("/health")
async def health_check():
    """
    Vérifie la disponibilité de l'API
    """
    return {"status": "ok", "message": "Le service est opérationnel"}

@app.post("/generate-connection", response_model=ConnectionResponse)
async def generate_connection(request: ConnectionRequest):
    """
    Génère un message de connexion personnalisé
    """
    try:
        message = llm_service.generate_connection_message(
            user=request.user,
            target=request.target,
            common_points=request.common_points
        )
        return ConnectionResponse(message=message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la génération du message: {str(e)}")

@app.post("/generate", response_model=GenerateResponse)
async def generate_cover_letter(request: GenerateRequest):
    """
    Génère une lettre de motivation à partir du profil utilisateur et de l'offre d'emploi
    """
    try:
        # Génération de la lettre
        letter = llm_service.generate_letter(request.user, request.job)
        
        # Retour de la réponse
        return GenerateResponse(letter=letter)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la génération de la lettre: {str(e)}")

# Point d'entrée pour l'exécution directe
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)