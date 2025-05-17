/**
 * Service pour synchroniser les données de l'API Python vers MongoDB
 */
import { userService, connectionService, opportunityService } from "./api-service"
import { userDbService, connectionDbService, opportunityDbService } from "./mongodb-service"

/**
 * Service de synchronisation
 */
export const syncService = {
  /**
   * Synchroniser les utilisateurs
   */
  async syncUsers() {
    try {
      // Récupérer les utilisateurs depuis l'API Python
      const response = await userService.getUsers()

      if (!response.success || !response.data) {
        throw new Error(response.error || "Échec de la récupération des utilisateurs")
      }

      const users = response.data

      // Pour chaque utilisateur, vérifier s'il existe déjà dans MongoDB
      for (const user of users) {
        // Rechercher l'utilisateur par email (ou autre identifiant unique)
        const existingUsers = await userDbService.getAllUsers()
        const existingUser = existingUsers.find((u) => u.email === user.email)

        if (existingUser) {
          // Mettre à jour l'utilisateur existant
          await userDbService.updateUser(existingUser._id.toString(), user)
        } else {
          // Créer un nouvel utilisateur
          await userDbService.createUser(user)
        }
      }

      return { success: true, count: users.length }
    } catch (error) {
      console.error("Erreur lors de la synchronisation des utilisateurs:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      }
    }
  },

  /**
   * Synchroniser les connexions d'un utilisateur
   */
  async syncUserConnections(userId: string) {
    try {
      // Récupérer les connexions depuis l'API Python
      const response = await connectionService.getUserConnections(userId)

      if (!response.success || !response.data) {
        throw new Error(response.error || "Échec de la récupération des connexions")
      }

      const connections = response.data

      // Récupérer les connexions existantes dans MongoDB
      const existingConnections = await connectionDbService.getUserConnections(userId)

      // Pour chaque connexion, vérifier si elle existe déjà
      for (const connection of connections) {
        const existingConnection = existingConnections.find((c) => c.connectionId === connection.connectionId)

        if (!existingConnection) {
          // Ajouter la nouvelle connexion
          await connectionDbService.addConnection({
            ...connection,
            userId,
          })
        }
        // Note: Vous pourriez également mettre à jour les connexions existantes si nécessaire
      }

      return { success: true, count: connections.length }
    } catch (error) {
      console.error("Erreur lors de la synchronisation des connexions:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      }
    }
  },

  /**
   * Synchroniser les opportunités d'un utilisateur
   */
  async syncUserOpportunities(userId: string, filters?: any) {
    try {
      // Récupérer les opportunités depuis l'API Python
      const response = await opportunityService.getOpportunities(userId, filters)

      if (!response.success || !response.data) {
        throw new Error(response.error || "Échec de la récupération des opportunités")
      }

      const opportunities = response.data

      // Pour chaque opportunité, l'ajouter à MongoDB
      for (const opportunity of opportunities) {
        await opportunityDbService.addOpportunity({
          ...opportunity,
          userId,
        })
      }

      return { success: true, count: opportunities.length }
    } catch (error) {
      console.error("Erreur lors de la synchronisation des opportunités:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      }
    }
  },

  // Autres méthodes de synchronisation...
}
