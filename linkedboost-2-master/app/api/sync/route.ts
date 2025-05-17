import { type NextRequest, NextResponse } from "next/server"
import { syncService } from "@/lib/sync-service"

/**
 * Route pour synchroniser les données de l'API Python vers MongoDB
 */
export async function POST(request: NextRequest) {
  try {
    const { type, userId, filters } = await request.json()

    let result

    switch (type) {
      case "users":
        result = await syncService.syncUsers()
        break

      case "connections":
        if (!userId) {
          return NextResponse.json({ error: "userId est requis pour synchroniser les connexions" }, { status: 400 })
        }
        result = await syncService.syncUserConnections(userId)
        break

      case "opportunities":
        if (!userId) {
          return NextResponse.json({ error: "userId est requis pour synchroniser les opportunités" }, { status: 400 })
        }
        result = await syncService.syncUserOpportunities(userId, filters)
        break

      default:
        return NextResponse.json({ error: "Type de synchronisation non valide" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de la synchronisation:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur inconnue" }, { status: 500 })
  }
}
