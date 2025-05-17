import { type NextRequest, NextResponse } from "next/server"

// Configuration pour l'authentification LinkedIn
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || "86f53o2yfpqxot" // Exemple d'ID
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || "https://linkedboost.app/api/auth/callback/linkedin"

// Scopes requis pour les fonctionnalités de LinkedBoost
const LINKEDIN_SCOPES = ["r_liteprofile", "r_emailaddress", "w_member_social", "r_network", "rw_organization_admin"]

/**
 * Route pour initier l'authentification LinkedIn OAuth
 */
export async function GET(request: NextRequest) {
  // Construire l'URL d'autorisation LinkedIn
  const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization")
  authUrl.searchParams.append("response_type", "code")
  authUrl.searchParams.append("client_id", LINKEDIN_CLIENT_ID)
  authUrl.searchParams.append("redirect_uri", LINKEDIN_REDIRECT_URI)
  authUrl.searchParams.append("scope", LINKEDIN_SCOPES.join(" "))

  // Générer un état pour la sécurité CSRF
  const state = Math.random().toString(36).substring(2, 15)
  authUrl.searchParams.append("state", state)

  // Stocker l'état dans un cookie pour vérification ultérieure
  const response = NextResponse.redirect(authUrl.toString())
  response.cookies.set("linkedin_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  })

  return response
}
