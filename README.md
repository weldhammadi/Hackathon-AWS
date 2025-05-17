


          
# LinkedBoost - Votre Assistant IA pour LinkedIn

##  Description

LinkedBoost est une plateforme intelligente qui utilise l'intelligence artificielle pour faciliter la prise de contact, la candidature et le networking sur LinkedIn, même pour les plus introvertis. Notre outil vous aide à développer votre présence professionnelle en ligne grâce à des fonctionnalités innovantes alimentées par l'IA.

##  Fonctionnalités principales

###  Messages personnalisés
- Génération automatique de messages d'accroche et de suivi personnalisés
- Modèles adaptés à différents contextes (connexion, candidature, suivi)
- Optimisation du taux de réponse grâce à l'IA

###  Lettres de motivation
- Création de lettres de motivation professionnelles adaptées à votre profil
- Personnalisation en fonction de l'offre d'emploi ciblée
- Possibilité de modifier et d'ajuster le contenu généré

###  Détection d'opportunités
- Identification automatique des contacts stratégiques pour votre réseau
- Analyse de pertinence basée sur plusieurs facteurs (connexions mutuelles, secteur, etc.)
- Suggestions de networking ciblées selon vos objectifs professionnels

###  Automatisation
- Planification d'actions LinkedIn récurrentes (messages, interactions)
- Gestion intelligente des limites d'API pour éviter les restrictions
- Suivi des performances de vos automatisations

###  Analyse et optimisation
- Évaluation de votre profil LinkedIn avec suggestions d'amélioration
- Statistiques détaillées sur vos interactions et votre réseau
- Mesure de l'impact de vos actions de networking

##  Architecture technique

Le projet LinkedBoost est composé de trois composants principaux :

### 1. Application Frontend (linkedboost-2-master)
- Interface utilisateur moderne et intuitive développée avec Next.js
- Tableaux de bord interactifs pour gérer vos activités LinkedIn
- Intégration avec l'API LinkedIn pour les actions en temps réel

### 2. API de génération de contenu (App_Api)
- Service backend développé en Python avec FastAPI
- Intégration avec des modèles d'IA avancés (AWS Bedrock, OpenAI)
- Génération de lettres de motivation et messages personnalisés

### 3. Service de scraping LinkedIn (LinkIn-scrap)
- Collecte éthique de données pour améliorer les recommandations
- Analyse des tendances et opportunités du marché
- Enrichissement des profils pour des suggestions plus pertinentes

##  Installation et démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- Python 3.8+
- Compte développeur LinkedIn (pour l'accès API)

### Installation du frontend
```bash
cd linkedboost-2-master
pnpm install
pnpm run dev
```

### Installation de l'API
```bash
cd App_Api
pip install -r requirements.txt
uvicorn main:app --reload
```

##  Configuration

Pour utiliser toutes les fonctionnalités de LinkedBoost, vous devrez configurer :

1. Les clés d'accès pour les services d'IA (AWS Bedrock)
2. Les paramètres de base de données pour le stockage des données utilisateur

##  Contribution

Nous accueillons les contributions à ce projet ! Pour contribuer :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

##  Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

##  Collaborateurs

- Djamel OUAZAR : https://www.linkedin.com/in/djamel-ouazar-1b35b6166/

- Amine Hammouma : https://www.linkedin.com/in/amine-hamouma-1bab45342/

- Emmanuel Mopeno-Bia : https://www.linkedin.com/in/jcemopeno-bia/

- Hamza ELMORTADA : https://www.linkedin.com/in/hamza-elmortada-a1a416239/

- Aboubacrine Seck : https://www.linkedin.com/in/aboubacrine-seck-0672a5227/ 

 **LinkedBoost** - Boostez votre networking LinkedIn avec l'intelligence artificielle
