import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Liste des routes qui nécessitent une authentification
const protectedRoutes = [
  "/dashboard",
  "/messages",
  "/opportunities",
  "/opportunities/detection",
  "/profile-optimization",
  "/automation",
  "/analytics",
  "/settings",
]

// Liste des routes d'authentification
const authRoutes = ["/login", "/register", "/forgot-password"]

export function middleware(request: NextRequest) {
  // Simuler un utilisateur authentifié avec un cookie
  const isAuthenticated = request.cookies.has("auth_token")
  const { pathname } = request.nextUrl

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
  if (!isAuthenticated && isProtectedRoute) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Si l'utilisateur est authentifié et tente d'accéder à une route d'authentification
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
