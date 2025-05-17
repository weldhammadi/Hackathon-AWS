"use client"

import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"

interface LinkedInAuthButtonProps {
  connected?: boolean
}

export function LinkedInAuthButton({ connected = false }: LinkedInAuthButtonProps) {
  const handleAuth = () => {
    if (connected) {
      // Si déjà connecté, afficher une confirmation avant de se déconnecter
      if (confirm("Êtes-vous sûr de vouloir vous déconnecter de LinkedIn ?")) {
        console.log("Déconnexion de LinkedIn...")
        // Logique de déconnexion ici
      }
    } else {
      console.log("Connexion à LinkedIn...")
      // Dans une implémentation réelle, rediriger vers l'URL d'authentification LinkedIn
      // window.location.href = `/api/auth/linkedin`
    }
  }

  return (
    <Button
      onClick={handleAuth}
      className={`gap-2 ${
        connected
          ? "bg-white text-[#0077B5] hover:bg-gray-100 border border-[#0077B5]"
          : "bg-[#0077B5] text-white hover:bg-[#006097]"
      }`}
      size="lg"
    >
      <Linkedin className="h-5 w-5" />
      <span>{connected ? "Compte LinkedIn connecté" : "Se connecter avec LinkedIn"}</span>
    </Button>
  )
}
