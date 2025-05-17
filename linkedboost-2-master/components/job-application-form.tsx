"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload , Sparkles} from "lucide-react"

interface JobApplicationFormProps {
  jobId: string
}

const testData = {
 
    "user": {
    "name": "Jean Dupont",
    "title": "Développeur Full Stack",
    "experience": "5 ans d'expérience en développement web, spécialisé dans les technologies JavaScript (React, Node.js) et Python (Django, Flask). J'ai travaillé sur des projets e-commerce à forte charge et des applications SaaS.",
    "skills": ["JavaScript", "React", "Node.js", "Python", "Django", "Flask", "SQL", "NoSQL", "AWS", "Docker"],
    "goals": "Je souhaite rejoindre une entreprise innovante où je pourrai contribuer à des projets à fort impact tout en développant mes compétences en architecture logicielle et en IA."
  },
  "job": {
    "title": "Développeur Frontend React",
    "company": "TechVision",
    "description": "TechVision est une entreprise innovante spécialisée dans le développement de solutions web et mobiles pour les entreprises de toutes tailles. Nous recherchons un développeur Frontend React passionné pour rejoindre notre équipe et participer au développement de nos applications web. Responsabilités : Développer des interfaces utilisateur réactives et intuitives, collaborer avec les designers UX/UI pour implémenter les maquettes, participer à l'amélioration continue de nos produits, assurer la maintenance et le debugging des applications existantes.",
    "requirements": [
      "3+ ans d'expérience en développement frontend",
      "Maîtrise de React, TypeScript et des hooks",
      "Expérience avec Next.js et les API RESTful",
      "Connaissance des bonnes pratiques en matière d'accessibilité web",
      "Bac+3 minimum",
      "Français et Anglais"
    ]
  }


}

const testData2 = {
  
    user: {
        "name": "Jean Dupont",
        "title": "Développeur Full Stack",
        "experience": "5 ans d'expérience en développement web, spécialisé dans les technologies JavaScript (React, Node.js) et Python (Django, Flask).",
        "skills": ["JavaScript", "React", "Node.js", "Python", "Django", "Flask", "AWS"],
        "goals": "Je souhaite développer mon réseau dans le domaine du développement web et de l'IA."
    },
    target: {
        "name": "Marie Martin",
        "title": "Lead Developer",
        "company": "AI Solutions",
        "background": "Diplômée de l'École Polytechnique, spécialisation en IA",
        "interests": ["Intelligence Artificielle", "Python", "Machine Learning", "Cloud Computing"]
    },
    common_points: ["Développement Python", "Intérêt pour l'IA", "Technologies cloud"]

}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [personalMessage, setPersonalMessage] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [useLinkedInProfile, setUseLinkedInProfile] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dans une application réelle, vous enverriez les données à votre API
      // const formData = new FormData()
      // formData.append("jobId", jobId)
      // formData.append("coverLetter", coverLetter)
      // if (resumeFile) formData.append("resume", resumeFile)
      // formData.append("useLinkedInProfile", String(useLinkedInProfile))
      // await fetch("/api/job-applications", { method: "POST", body: formData })

      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès.",
        variant: "default",
      })

      // Réinitialiser le formulaire
      setCoverLetter("")
      setResumeFile(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  // Fonction pour générer une lettre de motivation avec l'IA
  const generateCoverLetter = async () => {
    // if (!session?.user?.id) {
    //   toast({
    //     title: "Erreur",
    //     description: "Vous devez être connecté pour générer une lettre de motivation.",
    //     variant: "destructive",
    //   })
    //   return
    // }

    setIsGenerating(true)
    try {
      // const response = await fetch("/api/jobs/generate-cover-letter", {
       const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de la lettre")
      }

      const data = await response.json()
      setCoverLetter(data.letter)

      toast({
        title: "Lettre générée avec succès",
        description: "Vous pouvez maintenant modifier la lettre selon vos besoins.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer la lettre de motivation.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Postuler à cette offre</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use-linkedin"
                checked={useLinkedInProfile}
                onCheckedChange={(checked) => setUseLinkedInProfile(checked as boolean)}
              />
              <Label htmlFor="use-linkedin" className="text-sm">
                Utiliser mon profil LinkedIn
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Nous utiliserons les informations de votre profil LinkedIn pour compléter votre candidature.
            </p>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="cover-letter">Lettre de motivation</Label>
             <Textarea
              id="cover-letter"
              placeholder="Expliquez pourquoi vous êtes intéressé par ce poste..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[120px]"
            /> 

           
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">CV (optionnel)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0])
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => document.getElementById("resume")?.click()}
              >
                <Upload className="h-4 w-4" />
                {resumeFile ? resumeFile.name : "Télécharger votre CV"}
              </Button>
              {resumeFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setResumeFile(null)}
                  className="h-8 w-8"
                >
                  <span className="sr-only">Supprimer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Formats acceptés: PDF, DOC, DOCX. Taille maximale: 5 MB.</p>
          </div> */}

<div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cover-letter">Lettre de motivation</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={generateCoverLetter}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Générer avec IA
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="cover-letter"
              placeholder="Votre lettre de motivation sera générée par l'IA et vous pourrez la personnaliser..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[200px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              Vous pouvez modifier la lettre générée pour la personnaliser davantage.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personal-message">Message personnalisé (optionnel)</Label>
            <Textarea
              id="personal-message"
              placeholder="Ajoutez un message personnel au recruteur..."
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Ce message sera ajouté à votre candidature pour donner un contexte supplémentaire.
            </p>
          </div>


          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma candidature"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
