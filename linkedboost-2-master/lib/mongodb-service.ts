/**
 * Service pour interagir avec MongoDB
 */
import { MongoClient, ObjectId } from "mongodb"

// URI de connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/linkedboost"

// Nom de la base de données
const DB_NAME = process.env.MONGODB_DB || "linkedboost"

// Client MongoDB
let client: MongoClient
let clientPromise: Promise<MongoClient>

// Initialiser la connexion MongoDB
if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

/**
 * Fonction pour obtenir une instance de la base de données
 */
export async function getDatabase() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

/**
 * Service pour les utilisateurs dans MongoDB
 */
export const userDbService = {
  // Récupérer tous les utilisateurs
  async getAllUsers() {
    const db = await getDatabase()
    return db.collection("users").find({}).toArray()
  },

  // Récupérer un utilisateur par ID
  async getUserById(id: string) {
    const db = await getDatabase()
    return db.collection("users").findOne({ _id: new ObjectId(id) })
  },

  // Créer un nouvel utilisateur
  async createUser(userData: any) {
    const db = await getDatabase()
    const result = await db.collection("users").insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return result.insertedId
  },

  // Mettre à jour un utilisateur
  async updateUser(id: string, userData: any) {
    const db = await getDatabase()
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...userData,
          updatedAt: new Date(),
        },
      },
    )
    return result.modifiedCount > 0
  },

  // Supprimer un utilisateur
  async deleteUser(id: string) {
    const db = await getDatabase()
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  },
}

/**
 * Service pour les connexions dans MongoDB
 */
export const connectionDbService = {
  // Récupérer les connexions d'un utilisateur
  async getUserConnections(userId: string) {
    const db = await getDatabase()
    return db
      .collection("connections")
      .find({ userId: new ObjectId(userId) })
      .toArray()
  },

  // Ajouter une nouvelle connexion
  async addConnection(connectionData: any) {
    const db = await getDatabase()
    const result = await db.collection("connections").insertOne({
      ...connectionData,
      dateConnected: new Date(),
      lastInteraction: new Date(),
    })
    return result.insertedId
  },

  // Autres méthodes pour les connexions...
}

/**
 * Service pour les opportunités dans MongoDB
 */
export const opportunityDbService = {
  // Récupérer les opportunités d'un utilisateur
  async getUserOpportunities(userId: string, filters: any = {}) {
    const db = await getDatabase()

    const query: any = { userId: new ObjectId(userId) }

    // Appliquer les filtres
    if (filters.status) query.status = filters.status
    if (filters.minScore) query.relevanceScore = { $gte: filters.minScore }
    if (filters.tags && filters.tags.length) query.tags = { $in: filters.tags }

    return db.collection("opportunities").find(query).sort({ relevanceScore: -1 }).toArray()
  },

  // Ajouter une nouvelle opportunité
  async addOpportunity(opportunityData: any) {
    const db = await getDatabase()
    const result = await db.collection("opportunities").insertOne({
      ...opportunityData,
      detectedAt: new Date(),
      status: "new",
    })
    return result.insertedId
  },

  // Mettre à jour le statut d'une opportunité
  async updateOpportunityStatus(id: string, status: string) {
    const db = await getDatabase()
    const result = await db
      .collection("opportunities")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } })
    return result.modifiedCount > 0
  },

  // Autres méthodes pour les opportunités...
}

// Exporter d'autres services selon les besoins...
