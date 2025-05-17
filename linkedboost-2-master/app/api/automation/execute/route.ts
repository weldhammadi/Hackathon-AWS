import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"
import { createAutomationService } from "@/lib/automation-service"

/**
 * Route pour exécuter une automatisation
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer l'ID de l'automatisation du corps de la requête
    const { automationId } = await request.json()

    if (!automationId) {
      return NextResponse.json({ error: "L'ID de l'automatisation est requis" }, { status: 400 })
    }

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Créer un service d'automatisation
    const automationService = createAutomationService(linkedInAPI)

    // Récupérer l'automatisation (dans une implémentation réelle, cela viendrait d'une base de données)
    // Simulation pour la démonstration
    const automation = {
      id: automationId,
      name: "Automatisation de test",
      description: "Description de l'automatisation",
      type: "messages" as const,
      status: "active" as const,
      target: {
        type: "new-connections" as const,
      },
      content: "Bonjour {prénom}, merci pour la connexion !",
      schedule: {
        frequency: "daily" as const,
        maxActions: 10,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        totalRuns: 0,
        successCount: 0,
        failureCount: 0,
      },
    }

    // Exécuter l'automatisation
    const result = await automationService.executeAutomation(automation)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'automatisation:", error)
    return NextResponse.json({ error: "Erreur lors de l'exécution de l'automatisation" }, { status: 500 })
  }
}
