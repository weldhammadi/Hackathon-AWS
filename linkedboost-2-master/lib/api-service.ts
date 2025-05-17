/**
 * Service pour interagir avec l'API Python
 */

// URL de l'API Python (à configurer dans les variables d'environnement)
const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:5000/api"

// Fonction utilitaire pour effectuer des requêtes à l'API Python
async function fetchFromApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const url = `${PYTHON_API_URL}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    }

    const response = await fetch(url, { ...defaultOptions, ...options })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Erreur API: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Erreur lors de la requête API:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    }
  }
}

// Service pour les utilisateurs
export const userService = {
  async getUsers(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    return fetchFromApi("/users")
  },
}

// Service pour les connexions
export const connectionService = {
  async getUserConnections(userId: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
    return fetchFromApi(`/users/${userId}/connections`)
  },
}

// Service pour les opportunités
export const opportunityService = {
  async getOpportunities(userId: string, filters?: any): Promise<{ success: boolean; data?: any[]; error?: string }> {
    let endpoint = `/users/${userId}/opportunities`
    if (filters) {
      const params = new URLSearchParams(filters)
      endpoint += `?${params.toString()}`
    }
    return fetchFromApi(endpoint)
  },
}

export { fetchFromApi }
