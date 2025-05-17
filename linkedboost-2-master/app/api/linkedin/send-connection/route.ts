import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"

/**
 * Route pour envoyer une demande de connexion LinkedIn
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer les données de la demande de connexion du corps de la requête
    const { userId, message } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "L'ID de l'utilisateur est requis" }, { status: 400 })
    }

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Envoyer la demande de connexion
    const result = await linkedInAPI.sendConnectionRequest(userId, message)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de l'envoi de la demande de connexion LinkedIn:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la demande de connexion" }, { status: 500 })
  }
}
