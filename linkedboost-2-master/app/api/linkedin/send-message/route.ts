import { type NextRequest, NextResponse } from "next/server"
import { createLinkedInAPI } from "@/lib/linkedin-api"

/**
 * Route pour envoyer un message LinkedIn
 */
export async function POST(request: NextRequest) {
  // Récupérer le token d'accès du cookie
  const accessToken = request.cookies.get("linkedin_access_token")?.value

  if (!accessToken) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  try {
    // Récupérer les données du message du corps de la requête
    const { recipientId, subject, body } = await request.json()

    if (!recipientId || !body) {
      return NextResponse.json({ error: "Le destinataire et le corps du message sont requis" }, { status: 400 })
    }

    // Créer une instance de l'API LinkedIn
    const linkedInAPI = createLinkedInAPI(accessToken)

    // Envoyer le message
    const result = await linkedInAPI.sendMessage({
      recipientId,
      subject,
      body,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors de l'envoi du message LinkedIn:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
