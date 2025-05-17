import { type NextRequest, NextResponse } from "next/server"

// Configuration pour l'authentification LinkedIn
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || "86f53o2yfpqxot" // Exemple d'ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || "client_secret_example"
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || "https://linkedboost.app/api/auth/callback/linkedin"

/**
 * Route pour gérer le callback d'authentification LinkedIn
 */
export async function GET(request: NextRequest) {
  // Récupérer le code d'autorisation et l'état de l'URL
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  // Vérifier l'état pour la sécurité CSRF
  const storedState = request.cookies.get("linkedin_oauth_state")?.value

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/settings/api-integration?error=invalid_request", request.url))
  }

  try {
    // Échanger le code contre un token d'accès
    // Dans une implémentation réelle, cela ferait un appel à l'API LinkedIn
    // const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     grant_type: "authorization_code",
    //     code,
    //     redirect_uri: LINKEDIN_REDIRECT_URI,
    //     client_id: LINKEDIN_CLIENT_ID,
    //     client_secret: LINKEDIN_CLIENT_SECRET,
    //   }),
    // })

    // const tokenData = await tokenResponse.json()

    // Simuler une réponse de token pour la démonstration
    const tokenData = {
      access_token: "example_access_token_" + Date.now(),
      expires_in: 60 * 60 * 24 * 60, // 60 jours
      refresh_token: "example_refresh_token_" + Date.now(),
    }

    // Stocker le token dans un cookie ou une session
    const response = NextResponse.redirect(new URL("/settings/api-integration?success=true", request.url))

    // Supprimer le cookie d'état
    response.cookies.delete("linkedin_oauth_state")

    // Stocker le token d'accès (dans une application réelle, cela serait fait de manière plus sécurisée)
    response.cookies.set("linkedin_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erreur lors de l'échange du code d'autorisation:", error)
    return NextResponse.redirect(new URL("/settings/api-integration?error=token_exchange", request.url))
  }
}
