"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler un envoi d'email réussi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dans une implémentation réelle, vous appelleriez votre API ici
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })

      setIsSubmitted(true)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F2EF] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Image src="/logo.png" alt="LinkedBoost" width={40} height={40} />
          <span className="text-2xl font-bold">LinkedBoost</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSubmitted ? "Email envoyé" : "Mot de passe oublié"}</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Consultez votre boîte de réception pour réinitialiser votre mot de passe"
                : "Entrez votre email pour réinitialiser votre mot de passe"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <p className="mb-4">
                  Nous avons envoyé un email à <strong>{email}</strong> avec les instructions pour réinitialiser votre
                  mot de passe.
                </p>
                <p className="text-sm text-muted-foreground">
                  Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier spam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm text-primary hover:underline w-full justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à la connexion</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
