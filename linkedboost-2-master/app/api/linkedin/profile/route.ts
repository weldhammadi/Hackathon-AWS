import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"

/**
 * Route pour récupérer le profil LinkedIn de l'utilisateur connecté
 */
export async function GET(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Récupérer le profil
    const profile = await linkedInAPI.getProfile()

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Erreur lors de la récupération du profil LinkedIn:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du profil" }, { status: 500 })
  }
}
