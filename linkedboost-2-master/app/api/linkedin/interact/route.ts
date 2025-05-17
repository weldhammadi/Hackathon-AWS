import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"

/**
 * Route pour interagir avec une publication LinkedIn (like, commentaire)
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer les données de l'interaction du corps de la requête
    const { postId, action, comment } = await request.json()

    if (!postId || !action) {
      return NextResponse.json({ error: "L'ID du post et le type d'action sont requis" }, { status: 400 })
    }

    if (action !== "like" && action !== "comment") {
      return NextResponse.json({ error: "L'action doit être 'like' ou 'comment'" }, { status: 400 })
    }

    if (action === "comment" && !comment) {
      return NextResponse.json({ error: "Le commentaire est requis pour l'action 'comment'" }, { status: 400 })
    }

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Effectuer l'interaction
    const result = await linkedInAPI.interactWithPost(postId, action, comment)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de l'interaction avec la publication LinkedIn:", error)
    return NextResponse.json({ error: "Erreur lors de l'interaction avec la publication" }, { status: 500 })
  }
}
