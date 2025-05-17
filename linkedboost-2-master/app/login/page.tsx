"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Icons } from "@/components/icons"
import { useAuth } from "@/components/auth-provider"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { login, loginWithLinkedIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur LinkedBoost",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLinkedInLogin = async () => {
    setIsLoading(true)

    try {
      await loginWithLinkedIn()

      toast({
        title: "Connexion LinkedIn réussie",
        description: "Bienvenue sur LinkedBoost",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion LinkedIn",
        description: "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[450px] bg-white shadow-md rounded-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Se connecter</CardTitle>
          <CardDescription className="text-center">
            Entrez votre email et mot de passe pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="exemple@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
          <Button variant="outline" className="w-full" onClick={handleLinkedInLogin} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Icons.linkedIn className="mr-2 h-4 w-4" />
            Se connecter avec LinkedIn
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
