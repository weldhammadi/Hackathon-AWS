"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { OpportunityFilters } from "@/components/opportunity-filters"
import { OpportunityCard } from "@/components/opportunity-card"
import { OpportunityStats } from "@/components/opportunity-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertCircle,
  ArrowRight,
  Download,
  RefreshCw,
  Settings,
  Sparkles,
  Zap,
  Users,
  Star,
  Bell,
  Briefcase,
  Building,
} from "lucide-react"
import type { NetworkingOpportunity, OpportunityDetectionOptions } from "@/lib/opportunity-detection-service"

export default function OpportunityDetectionPage() {
  const [opportunities, setOpportunities] = useState<NetworkingOpportunity[]>([])
  const [savedOpportunities, setSavedOpportunities] = useState<NetworkingOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastDetection, setLastDetection] = useState<Date | null>(null)

  // Charger les opportunités au chargement de la page
  useEffect(() => {
    detectOpportunities()
  }, [])

  // Fonction pour détecter les opportunités
  const detectOpportunities = async (options: OpportunityDetectionOptions = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      // Dans une implémentation réelle, cela ferait un appel à l'API
      const response = await fetch("/api/opportunities/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la détection des opportunités")
      }

      // Simuler un délai pour la démonstration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simuler une réponse pour la démonstration
      // Dans une implémentation réelle, nous utiliserions les données de l'API
      const simulatedOpportunities = generateSimulatedOpportunities(options)

      setOpportunities(simulatedOpportunities)
      setLastDetection(new Date())
    } catch (err) {
      console.error("Erreur:", err)
      setError("Une erreur est survenue lors de la détection des opportunités. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour simuler des opportunités (pour la démonstration)
  const generateSimulatedOpportunities = (options: OpportunityDetectionOptions): NetworkingOpportunity[] => {
    const industries = ["Marketing", "Développement logiciel", "Finance", "Ressources humaines", "Vente", "Consulting"]
    const companies = ["TechVision", "InnoSoft", "GlobalCorp", "DataTech", "StratConsult", "MarketPro", "FinanceHub"]
    const locations = [
      "Paris, France",
      "Lyon, France",
      "Marseille, France",
      "Bordeaux, France",
      "Lille, France",
      "Télétravail",
    ]
    const sources: Array<
      | "industry_match"
      | "mutual_connections"
      | "similar_role"
      | "company_interest"
      | "event_attendance"
      | "content_engagement"
      | "career_change"
      | "viewed_profile"
      | "ai_recommendation"
    > = [
      "industry_match",
      "mutual_connections",
      "similar_role",
      "company_interest",
      "event_attendance",
      "content_engagement",
      "career_change",
      "viewed_profile",
      "ai_recommendation",
    ]

    const count = Math.floor(Math.random() * 10) + 15 // 15-25 opportunités

    return Array(count)
      .fill(null)
      .map((_, i) => {
        const industry = industries[Math.floor(Math.random() * industries.length)]
        const company = companies[Math.floor(Math.random() * companies.length)]
        const location = locations[Math.floor(Math.random() * locations.length)]
        const source = sources[Math.floor(Math.random() * sources.length)]
        const connectionDegree = Math.random() > 0.3 ? 2 : 3
        const mutualConnections =
          connectionDegree === 2 ? Math.floor(Math.random() * 15) + 1 : Math.floor(Math.random() * 5)

        const positions = [
          "Directeur Marketing",
          "Développeur Senior",
          "Chef de Projet",
          "Responsable RH",
          "Consultant Business",
          "Product Manager",
          "Data Scientist",
          "UX Designer",
          "Responsable Commercial",
          "Directeur Financier",
        ]

        const position = positions[Math.floor(Math.random() * positions.length)]

        // Filtrer en fonction des options
        let relevanceScore = Math.floor(Math.random() * 40) + 60 // 60-100

        // Augmenter le score pour les correspondances de filtre
        if (options.industries?.includes(industry)) relevanceScore += 10
        if (options.companies?.includes(company)) relevanceScore += 15
        if (options.roles?.some((r) => position.toLowerCase().includes(r.toLowerCase()))) relevanceScore += 10

        // Limiter à 100
        relevanceScore = Math.min(relevanceScore, 100)

        // Vérifier si l'opportunité correspond aux filtres
        if (options.minRelevanceScore && relevanceScore < options.minRelevanceScore) {
          relevanceScore = options.minRelevanceScore + Math.floor(Math.random() * 10)
        }

        // Simuler une activité récente pour certains contacts
        const hasRecentActivity = Math.random() > 0.6
        const lastActivity = hasRecentActivity
          ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000))
          : undefined

        // Générer des facteurs de pertinence
        const relevanceFactors = []

        if (mutualConnections > 0) {
          relevanceFactors.push({
            type: "mutual_connections",
            description: `${mutualConnections} connexions en commun`,
            weight: 0.3,
          })
        }

        relevanceFactors.push({
          type: source,
          description:
            source === "industry_match"
              ? `Même secteur: ${industry}`
              : source === "similar_role"
                ? "Poste similaire ou complémentaire"
                : source === "company_interest"
                  ? `Travaille chez ${company}`
                  : "Correspondance de profil",
          weight: 0.25,
        })

        if (hasRecentActivity) {
          relevanceFactors.push({
            type: "recent_activity",
            description: "Activité récente sur LinkedIn",
            weight: 0.1,
          })
        }

        // Générer des tags
        const tags = []

        if (mutualConnections > 0) tags.push("Réseau commun")
        if (source === "industry_match") tags.push("Même secteur")
        if (source === "similar_role") tags.push("Rôle similaire")
        if (source === "company_interest") tags.push("Entreprise cible")

        if (connectionDegree === 2) tags.push("2ème degré")
        if (connectionDegree === 3) tags.push("3ème degré")

        if (hasRecentActivity) tags.push("Actif récemment")

        if (position.toLowerCase().includes("directeur") || position.toLowerCase().includes("responsable")) {
          tags.push("Décideur")
        }

        return {
          id: `opp_${i}`,
          contactId: `contact_${i}`,
          firstName: `Prénom${i}`,
          lastName: `Nom${i}`,
          headline: `${position} chez ${company}`,
          profilePicture: `/placeholder.svg?height=100&width=100&query=professional person ${i}`,
          company,
          position,
          location,
          connectionDegree,
          mutualConnections,
          relevanceScore,
          relevanceFactors,
          lastActivity,
          tags: [...new Set(tags)].slice(0, 5),
          source,
          detectedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        }
      })
  }

  // Gérer les actions sur les opportunités
  const handleConnect = (opportunity: NetworkingOpportunity) => {
    console.log("Connexion avec:", opportunity)
    // Dans une implémentation réelle, cela enverrait une demande de connexion via l'API LinkedIn
  }

  const handleMessage = (opportunity: NetworkingOpportunity) => {
    console.log("Message à:", opportunity)
    // Dans une implémentation réelle, cela ouvrirait une boîte de dialogue pour envoyer un message
  }

  const handleIgnore = (opportunity: NetworkingOpportunity) => {
    console.log("Ignorer:", opportunity)
    // Supprimer l'opportunité de la liste
    setOpportunities(opportunities.filter((opp) => opp.id !== opportunity.id))
  }

  const handleSave = (opportunity: NetworkingOpportunity) => {
    console.log("Sauvegarder:", opportunity)
    // Vérifier si l'opportunité est déjà sauvegardée
    const isAlreadySaved = savedOpportunities.some((opp) => opp.id === opportunity.id)

    if (isAlreadySaved) {
      // Supprimer de la liste des sauvegardés
      setSavedOpportunities(savedOpportunities.filter((opp) => opp.id !== opportunity.id))
    } else {
      // Ajouter à la liste des sauvegardés
      setSavedOpportunities([...savedOpportunities, opportunity])
    }
  }

  // Gérer les changements de filtres
  const handleFilterChange = (filters: OpportunityDetectionOptions) => {
    detectOpportunities(filters)
  }

  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Détection d'opportunités</h1>
            <p className="text-muted-foreground">
              Identifiez automatiquement les contacts pertinents pour développer votre réseau
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={() => detectOpportunities()}>
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </Button>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Détection avancée</span>
            </Button>
          </div>
        </header>

        <OpportunityFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="high">Haute pertinence</TabsTrigger>
                <TabsTrigger value="saved">Sauvegardées</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Chargement des opportunités..."
                ) : (
                  <>
                    {opportunities.length} opportunités trouvées
                    {lastDetection && <> · Dernière détection: {lastDetection.toLocaleTimeString()}</>}
                  </>
                )}
              </div>
            </div>

            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative md:w-64 h-40 md:h-auto bg-muted/50">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Skeleton className="h-20 w-20 rounded-full" />
                              </div>
                            </div>
                            <div className="flex-1 p-6">
                              <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-60" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-32" />
                              </div>
                              <Skeleton className="h-4 w-full mb-2" />
                              <Skeleton className="h-4 w-full mb-4" />
                              <div className="flex gap-2 mt-4">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-24" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : opportunities.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Aucune opportunité trouvée</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Essayez de modifier vos filtres ou d'élargir vos critères de recherche pour trouver plus
                      d'opportunités.
                    </p>
                    <Button onClick={() => detectOpportunities()}>Relancer la détection</Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <OpportunityStats opportunities={opportunities} />

                  <div className="mt-6 space-y-4">
                    {opportunities.map((opportunity) => (
                      <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        onConnect={handleConnect}
                        onMessage={handleMessage}
                        onIgnore={handleIgnore}
                        onSave={handleSave}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="high">
              <div className="space-y-4">
                {opportunities
                  .filter((opp) => opp.relevanceScore >= 80)
                  .map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onConnect={handleConnect}
                      onMessage={handleMessage}
                      onIgnore={handleIgnore}
                      onSave={handleSave}
                    />
                  ))}

                {!isLoading && opportunities.filter((opp) => opp.relevanceScore >= 80).length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Aucune opportunité à haute pertinence</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-4">
                        Nous n'avons pas trouvé d'opportunités avec un score de pertinence supérieur à 80.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="space-y-4">
                {savedOpportunities.length > 0 ? (
                  savedOpportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onConnect={handleConnect}
                      onMessage={handleMessage}
                      onIgnore={handleIgnore}
                      onSave={handleSave}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Star className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Aucune opportunité sauvegardée</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-4">
                        Sauvegardez des opportunités intéressantes pour y accéder facilement plus tard.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de détection</CardTitle>
              <CardDescription>Configurez les critères de détection automatique des opportunités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Fréquence de détection</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Détection quotidienne</p>
                      <p className="text-sm text-muted-foreground">
                        Analyse automatique chaque jour pour trouver de nouvelles opportunités
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Notifications activées</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des alertes pour les opportunités à haute pertinence
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Critères de détection prioritaires</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Connexions communes</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Priorité aux contacts avec des connexions communes</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium">Secteur d'activité</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contacts dans le même secteur ou des secteurs complémentaires
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-amber-600" />
                      <h4 className="font-medium">Entreprises cibles</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Contacts travaillant dans des entreprises d'intérêt</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Exporter les opportunités</span>
              </Button>
              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres avancés</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="gap-2" size="lg">
            <span>Automatiser les actions</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
