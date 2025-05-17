import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb-service"

export async function GET() {
  try {
    const db = await getDatabase()

    // Tester la connexion en listant les collections
    const collections = await db.listCollections().toArray()

    return NextResponse.json({
      success: true,
      message: "Connexion à MongoDB réussie",
      collections: collections.map((c) => c.name),
    })
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
