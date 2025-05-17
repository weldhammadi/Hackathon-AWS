import { NextResponse } from "next/server"
import { fetchFromApi } from "@/lib/api-service"

export async function GET() {
  try {
    // Tester la connexion à l'API Python avec un endpoint simple
    // Remplacez "/status" par un endpoint qui existe dans votre API
    const response = await fetchFromApi("/status")

    return NextResponse.json({
      success: true,
      message: "Connexion à l'API Python réussie",
      apiResponse: response,
    })
  } catch (error) {
    console.error("Erreur de connexion à l'API Python:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
