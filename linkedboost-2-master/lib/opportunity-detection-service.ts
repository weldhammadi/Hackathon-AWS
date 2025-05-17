import type { LinkedInAPI } from "./linkedin-api"

// Types pour les opportunités
export interface NetworkingOpportunity {
  id: string
  contactId: string
  firstName: string
  lastName: string
  headline?: string
  profilePicture?: string
  company?: string
  position?: string
  location?: string
  connectionDegree: number
  mutualConnections: number
  relevanceScore: number
  relevanceFactors: RelevanceFactor[]
  lastActivity?: Date
  tags: string[]
  source: OpportunitySource
  detectedAt: Date
}

export type OpportunitySource =
  | "industry_match"
  | "mutual_connections"
  | "similar_role"
  | "company_interest"
  | "event_attendance"
  | "content_engagement"
  | "career_change"
  | "viewed_profile"
  | "ai_recommendation"

export interface RelevanceFactor {
  type: string
  description: string
  weight: number
}

export interface OpportunityDetectionOptions {
  industries?: string[]
  roles?: string[]
  companies?: string[]
  keywords?: string[]
  minRelevanceScore?: number
  maxResults?: number
  excludeConnected?: boolean
  includeSecondDegree?: boolean
  includeThirdDegree?: boolean
  sortBy?: "relevance" | "recent" | "mutual"
}

/**
 * Service pour détecter les opportunités de networking
 */
export class OpportunityDetectionService {
  private linkedInAPI: LinkedInAPI

  constructor(linkedInAPI: LinkedInAPI) {
    this.linkedInAPI = linkedInAPI
  }

  /**
   * Détecte les opportunités de networking basées sur différents critères
   */
  async detectOpportunities(options: OpportunityDetectionOptions = {}): Promise<NetworkingOpportunity[]> {
    try {
      // Dans une implémentation réelle, nous ferions plusieurs appels à l'API LinkedIn
      // pour récupérer différentes sources de données et les analyser

      // 1. Récupérer le profil de l'utilisateur pour l'analyse de pertinence
      const userProfile = await this.linkedInAPI.getProfile()

      // 2. Récupérer les connexions pour exclure les contacts déjà connectés si nécessaire
      const connections = options.excludeConnected ? await this.linkedInAPI.getConnections(0, 100) : []

      const connectedIds = new Set(connections.map((conn) => conn.id))

      // 3. Simuler la récupération de prospects potentiels
      // Dans une implémentation réelle, cela impliquerait plusieurs appels API:
      // - Recherche par secteur d'activité
      // - Personnes ayant consulté votre profil
      // - Suggestions LinkedIn
      // - Personnes ayant interagi avec votre contenu
      // - Participants aux mêmes événements
      // - Personnes ayant changé de poste récemment

      // Simulation de données pour la démonstration
      const potentialOpportunities = this.simulatePotentialContacts(options)

      // 4. Analyser et scorer chaque opportunité
      const analyzedOpportunities = potentialOpportunities
        .filter((contact) => !options.excludeConnected || !connectedIds.has(contact.id))
        .map((contact) => this.analyzeOpportunity(contact, userProfile, options))
        .filter((opp) => opp.relevanceScore >= (options.minRelevanceScore || 50))
        .sort((a, b) => {
          if (options.sortBy === "recent") {
            return b.detectedAt.getTime() - a.detectedAt.getTime()
          } else if (options.sortBy === "mutual") {
            return b.mutualConnections - a.mutualConnections
          } else {
            // Default: sort by relevance
            return b.relevanceScore - a.relevanceScore
          }
        })

      // 5. Limiter le nombre de résultats si nécessaire
      const maxResults = options.maxResults || 20
      return analyzedOpportunities.slice(0, maxResults)
    } catch (error) {
      console.error("Erreur lors de la détection des opportunités:", error)
      return []
    }
  }

  /**
   * Analyse une opportunité potentielle et calcule son score de pertinence
   */
  private analyzeOpportunity(
    contact: any,
    userProfile: any,
    options: OpportunityDetectionOptions,
  ): NetworkingOpportunity {
    // Facteurs de pertinence
    const relevanceFactors: RelevanceFactor[] = []
    let totalScore = 0

    // Facteur: Connexions mutuelles
    const mutualWeight = 0.3
    const mutualScore = Math.min(contact.mutualConnections * 5, 30)
    totalScore += mutualScore * mutualWeight

    if (contact.mutualConnections > 0) {
      relevanceFactors.push({
        type: "mutual_connections",
        description: `${contact.mutualConnections} connexions en commun`,
        weight: mutualWeight,
      })
    }

    // Facteur: Même secteur d'activité
    const industryWeight = 0.25
    const sameIndustry = contact.industry === userProfile.industry
    if (sameIndustry) {
      totalScore += 25 * industryWeight
      relevanceFactors.push({
        type: "industry_match",
        description: `Même secteur: ${contact.industry}`,
        weight: industryWeight,
      })
    }

    // Facteur: Rôle similaire
    const roleWeight = 0.2
    const roleMatch = this.checkRoleMatch(contact.position, userProfile.headline)
    if (roleMatch) {
      totalScore += 20 * roleWeight
      relevanceFactors.push({
        type: "similar_role",
        description: "Poste similaire ou complémentaire",
        weight: roleWeight,
      })
    }

    // Facteur: Entreprise d'intérêt
    const companyWeight = 0.15
    const companyInterest = options.companies?.includes(contact.company)
    if (companyInterest) {
      totalScore += 30 * companyWeight
      relevanceFactors.push({
        type: "company_interest",
        description: `Travaille chez ${contact.company}`,
        weight: companyWeight,
      })
    }

    // Facteur: Activité récente
    const activityWeight = 0.1
    const hasRecentActivity =
      contact.lastActivity && new Date().getTime() - contact.lastActivity.getTime() < 7 * 24 * 60 * 60 * 1000 // 7 jours

    if (hasRecentActivity) {
      totalScore += 15 * activityWeight
      relevanceFactors.push({
        type: "recent_activity",
        description: "Activité récente sur LinkedIn",
        weight: activityWeight,
      })
    }

    // Normaliser le score sur 100
    const normalizedScore = Math.min(Math.round(totalScore), 100)

    // Déterminer les tags
    const tags = this.generateTags(contact, relevanceFactors)

    return {
      id: `opp_${contact.id}`,
      contactId: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      headline: contact.headline,
      profilePicture: contact.profilePicture,
      company: contact.company,
      position: contact.position,
      location: contact.location,
      connectionDegree: contact.connectionDegree,
      mutualConnections: contact.mutualConnections,
      relevanceScore: normalizedScore,
      relevanceFactors,
      lastActivity: contact.lastActivity,
      tags,
      source: this.determineMainSource(relevanceFactors),
      detectedAt: new Date(),
    }
  }

  /**
   * Vérifie si deux rôles professionnels sont similaires ou complémentaires
   */
  private checkRoleMatch(role1?: string, role2?: string): boolean {
    if (!role1 || !role2) return false

    // Simplification pour la démonstration
    // Dans une implémentation réelle, on utiliserait une analyse sémantique plus avancée
    const role1Lower = role1.toLowerCase()
    const role2Lower = role2.toLowerCase()

    const marketingRoles = ["marketing", "communication", "brand", "digital", "content", "social media"]
    const techRoles = ["developer", "engineer", "tech", "data", "product", "développeur", "ingénieur"]
    const salesRoles = ["sales", "business development", "account", "client", "vente", "commercial"]

    const isMarketing1 = marketingRoles.some((term) => role1Lower.includes(term))
    const isMarketing2 = marketingRoles.some((term) => role2Lower.includes(term))

    const isTech1 = techRoles.some((term) => role1Lower.includes(term))
    const isTech2 = techRoles.some((term) => role2Lower.includes(term))

    const isSales1 = salesRoles.some((term) => role1Lower.includes(term))
    const isSales2 = salesRoles.some((term) => role2Lower.includes(term))

    return (
      (isMarketing1 && isMarketing2) ||
      (isTech1 && isTech2) ||
      (isSales1 && isSales2) ||
      // Complémentarité
      (isMarketing1 && isSales2) ||
      (isSales1 && isMarketing2) ||
      (isTech1 && isMarketing2) ||
      (isMarketing1 && isTech2)
    )
  }

  /**
   * Génère des tags pertinents pour l'opportunité
   */
  private generateTags(contact: any, factors: RelevanceFactor[]): string[] {
    const tags: string[] = []

    // Tags basés sur les facteurs de pertinence
    factors.forEach((factor) => {
      if (factor.type === "industry_match") tags.push("Même secteur")
      if (factor.type === "similar_role") tags.push("Rôle similaire")
      if (factor.type === "mutual_connections") tags.push("Réseau commun")
      if (factor.type === "company_interest") tags.push("Entreprise cible")
    })

    // Tags basés sur le degré de connexion
    if (contact.connectionDegree === 2) tags.push("2ème degré")
    if (contact.connectionDegree === 3) tags.push("3ème degré")

    // Tags basés sur l'activité
    if (contact.lastActivity) {
      const daysSinceActivity = Math.floor(
        (new Date().getTime() - contact.lastActivity.getTime()) / (24 * 60 * 60 * 1000),
      )
      if (daysSinceActivity < 2) tags.push("Actif récemment")
    }

    // Tags basés sur le poste/entreprise
    if (
      contact.position?.toLowerCase().includes("founder") ||
      contact.position?.toLowerCase().includes("ceo") ||
      contact.position?.toLowerCase().includes("directeur")
    ) {
      tags.push("Décideur")
    }

    if (
      contact.company &&
      ["google", "microsoft", "amazon", "apple", "facebook", "meta"].some((c) =>
        contact.company.toLowerCase().includes(c),
      )
    ) {
      tags.push("GAFAM")
    }

    return [...new Set(tags)].slice(0, 5) // Éliminer les doublons et limiter à 5 tags
  }

  /**
   * Détermine la source principale de l'opportunité
   */
  private determineMainSource(factors: RelevanceFactor[]): OpportunitySource {
    if (factors.length === 0) return "ai_recommendation"

    // Trier les facteurs par poids
    const sortedFactors = [...factors].sort((a, b) => b.weight - a.weight)

    // Mapper le type de facteur à une source d'opportunité
    const typeToSource: Record<string, OpportunitySource> = {
      mutual_connections: "mutual_connections",
      industry_match: "industry_match",
      similar_role: "similar_role",
      company_interest: "company_interest",
      recent_activity: "content_engagement",
      viewed_profile: "viewed_profile",
    }

    return typeToSource[sortedFactors[0].type] || "ai_recommendation"
  }

  /**
   * Simule la récupération de contacts potentiels pour la démonstration
   */
  private simulatePotentialContacts(options: OpportunityDetectionOptions): any[] {
    // Dans une implémentation réelle, ces données viendraient de l'API LinkedIn

    const industries = ["Marketing", "Développement logiciel", "Finance", "Ressources humaines", "Vente", "Consulting"]
    const companies = ["TechVision", "InnoSoft", "GlobalCorp", "DataTech", "StratConsult", "MarketPro", "FinanceHub"]
    const locations = [
      "Paris, France",
      "Lyon, France",
      "Marseille, France",
      "Bordeaux, France",
      "Lille, France",
      "Télétravail",
    ]

    const generateContact = (index: number) => {
      const industry = industries[Math.floor(Math.random() * industries.length)]
      const company = companies[Math.floor(Math.random() * companies.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const connectionDegree = Math.random() > 0.3 ? 2 : 3
      const mutualConnections =
        connectionDegree === 2 ? Math.floor(Math.random() * 15) + 1 : Math.floor(Math.random() * 5)

      const positions = [
        "Directeur Marketing",
        "Développeur Senior",
        "Chef de Projet",
        "Responsable RH",
        "Consultant Business",
        "Product Manager",
        "Data Scientist",
        "UX Designer",
        "Responsable Commercial",
        "Directeur Financier",
      ]

      const position = positions[Math.floor(Math.random() * positions.length)]

      // Simuler une activité récente pour certains contacts
      const hasRecentActivity = Math.random() > 0.6
      const lastActivity = hasRecentActivity
        ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
        : undefined

      return {
        id: `contact_${index}`,
        firstName: `Prénom${index}`,
        lastName: `Nom${index}`,
        headline: `${position} chez ${company}`,
        profilePicture: `/placeholder.svg?height=100&width=100&query=professional person ${index}`,
        company,
        position,
        industry,
        location,
        connectionDegree,
        mutualConnections,
        lastActivity,
      }
    }

    // Générer un ensemble de contacts potentiels
    return Array(50)
      .fill(null)
      .map((_, i) => generateContact(i))
  }
}

/**
 * Fonction utilitaire pour créer un service de détection d'opportunités
 */
export function createOpportunityDetectionService(linkedInAPI: LinkedInAPI): OpportunityDetectionService {
  return new OpportunityDetectionService(linkedInAPI)
}
