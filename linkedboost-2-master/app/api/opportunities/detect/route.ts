import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"
import { createOpportunityDetectionService } from "@/lib/opportunity-detection-service"

/**
 * Route pour détecter les opportunités de networking
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer les options de détection du corps de la requête
    const options = await request.json()

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Créer un service de détection d'opportunités
    const opportunityService = createOpportunityDetectionService(linkedInAPI)

    // Détecter les opportunités
    const opportunities = await opportunityService.detectOpportunities(options)

    return NextResponse.json({ opportunities })
  } catch (error) {
    console.error("Erreur lors de la détection des opportunités:", error)
    return NextResponse.json({ error: "Erreur lors de la détection des opportunités" }, { status: 500 })
  }
}
