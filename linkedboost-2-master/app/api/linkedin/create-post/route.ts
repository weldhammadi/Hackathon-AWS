import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"

/**
 * Route pour créer une publication LinkedIn
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer les données de la publication du corps de la requête
    const { content, visibility, media } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Le contenu de la publication est requis" }, { status: 400 })
    }

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Créer la publication
    const result = await linkedInAPI.createPost({
      content,
      visibility: visibility || "CONNECTIONS",
      media,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de la création de la publication LinkedIn:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la publication" }, { status: 500 })
  }
}
