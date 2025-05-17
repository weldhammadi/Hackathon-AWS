"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { logout } = useAuth()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()

        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès",
        })

        // Rediriger vers la page d'accueil
        router.push("/")
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur de déconnexion",
          description: "Une erreur est survenue lors de la déconnexion",
        })
      }
    }

    performLogout()
  }, [router, toast, logout])

  return (
    <div>
      <h1>Déconnexion...</h1>
      <p>Vous allez être redirigé vers la page d'accueil.</p>
    </div>
  )
}
