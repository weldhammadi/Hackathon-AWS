"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithLinkedIn: () => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Simuler la vérification de l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier si un cookie d'authentification existe
        const hasAuthCookie = document.cookie.includes("auth_token")

        if (hasAuthCookie) {
          // Simuler un utilisateur authentifié
          setUser({
            id: "user_123",
            name: "Marie Dupont",
            email: "marie.dupont@example.com",
          })
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simuler une connexion réussie
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Définir un cookie d'authentification (dans une implémentation réelle, cela serait fait par le serveur)
      document.cookie = "auth_token=dummy_token; path=/; max-age=86400"

      setUser({
        id: "user_123",
        name: "Marie Dupont",
        email: email,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Fonction de connexion avec LinkedIn
  const loginWithLinkedIn = async () => {
    setLoading(true)
    try {
      // Simuler une connexion LinkedIn réussie
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Définir un cookie d'authentification
      document.cookie = "auth_token=linkedin_token; path=/; max-age=86400"

      setUser({
        id: "linkedin_123",
        name: "Marie Dupont",
        email: "marie.dupont@example.com",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Erreur de connexion LinkedIn:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = async () => {
    setLoading(true)
    try {
      // Simuler une déconnexion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Supprimer le cookie d'authentification
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      setUser(null)

      router.push("/")
    } catch (error) {
      console.error("Erreur de déconnexion:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simuler une inscription réussie
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Définir un cookie d'authentification
      document.cookie = "auth_token=new_user_token; path=/; max-age=86400"

      setUser({
        id: "new_user_123",
        name: name,
        email: email,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithLinkedIn, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
