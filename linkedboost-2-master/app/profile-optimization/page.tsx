import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, ChevronRight, Edit, Eye, FileText, Lightbulb, Sparkles, Wand2, Plus } from "lucide-react"

export default function ProfileOptimizationPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Optimisation de profil</h1>
          <p className="text-muted-foreground">
            Améliorez votre profil LinkedIn pour maximiser votre visibilité et votre impact
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Score de profil</CardTitle>
              <CardDescription>Évaluation globale de votre profil LinkedIn</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#36B37E"
                      strokeWidth="10"
                      strokeDasharray="282.7"
                      strokeDashoffset="62.2"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">78</span>
                    <span className="text-sm text-muted-foreground">sur 100</span>
                  </div>
                </div>
              </div>
              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Informations de base</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Expérience professionnelle</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Compétences & Recommandations</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Activité & Engagement</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Eye className="h-4 w-4" />
                <span>Voir mon profil LinkedIn</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Aperçu du profil</CardTitle>
              <CardDescription>Votre profil LinkedIn tel qu'il apparaît aux autres utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-32 bg-gradient-to-r from-[#0077B5] to-[#36B37E]/70">
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <Image
                      src="/professional-woman-portrait.png"
                      alt="Marie Dupont"
                      width={96}
                      height={96}
                      className="rounded-full border-4 border-white"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-16 px-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Marie Dupont</h3>
                    <p className="text-muted-foreground">
                      Chef de Projet Marketing Digital | Spécialiste SEO & Content
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Modifier</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>Paris, France</span>
                  <span>•</span>
                  <span>487 relations</span>
                  <span>•</span>
                  <span>TechVision</span>
                </div>

                <div className="space-y-1 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-primary hover:bg-transparent hover:underline"
                  >
                    <span>Voir les informations de contact</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Suggestion d'amélioration</p>
                        <p className="text-sm text-muted-foreground">
                          Votre titre professionnel pourrait être plus percutant. Ajoutez des mots-clés pertinents pour
                          votre secteur.
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                          <span>Optimiser mon titre</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="summary">
            <TabsList className="mb-6">
              <TabsTrigger value="summary">Résumé</TabsTrigger>
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="skills">Compétences</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="flex-1">
                    <CardTitle>Résumé professionnel</CardTitle>
                    <CardDescription>Votre présentation personnelle sur LinkedIn</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    <span>Modifier</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Résumé actuel</h4>
                        <div className="text-sm text-muted-foreground p-4 rounded-lg border bg-muted/30">
                          <p>
                            Chef de projet marketing digital avec 7 ans d'expérience dans la création et l'exécution de
                            stratégies de contenu et SEO. Spécialisée dans l'optimisation des conversions et l'analyse
                            de données pour maximiser le ROI des campagnes marketing.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Suggestions d'amélioration</h4>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border">
                            <p className="text-sm mb-2">Votre résumé pourrait être plus percutant en:</p>
                            <ul className="text-sm text-muted-foreground space-y-2 ml-5 list-disc">
                              <li>Ajoutant des résultats quantifiables (ex: augmentation de trafic de X%)</li>
                              <li>Mentionnant des projets spécifiques ou des clients notables</li>
                              <li>Incluant vos certifications et formations pertinentes</li>
                              <li>Exprimant votre passion et votre vision professionnelle</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Wand2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Version optimisée par IA</h4>
                        <div className="text-sm p-4 rounded-lg border bg-green-50 border-green-100">
                          <p>
                            Chef de projet marketing digital passionnée avec 7 ans d'expérience dans l'élaboration de
                            stratégies de contenu et SEO à fort impact. J'ai contribué à augmenter le trafic organique
                            de 150% et les taux de conversion de 35% pour des clients comme TechVision et GlobalCorp.
                            Certifiée Google Analytics et HubSpot, je combine expertise analytique et créativité pour
                            transformer les données en stratégies marketing qui génèrent des résultats mesurables. Je
                            m'engage à rester à la pointe des tendances digitales pour créer des expériences utilisateur
                            exceptionnelles qui convertissent.
                          </p>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button size="sm" className="gap-1">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Appliquer cette version</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Expérience professionnelle</CardTitle>
                  <CardDescription>Optimisez la présentation de votre parcours professionnel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/abstract-tech-logo.png"
                        alt="TechVision"
                        width={48}
                        height={48}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Chef de Projet Marketing Digital</h4>
                            <p className="text-sm text-muted-foreground">TechVision · Temps plein</p>
                            <p className="text-xs text-muted-foreground">Jan 2020 - Présent · 3 ans 8 mois</p>
                            <p className="text-xs text-muted-foreground">Paris, France</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Responsable de la stratégie marketing digital, incluant SEO, content marketing et campagnes
                            d'acquisition.
                          </p>
                        </div>
                        <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                          <div className="flex gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-amber-800">Suggestion d'amélioration</p>
                              <p className="text-xs text-amber-700">
                                Ajoutez des réalisations quantifiables et des projets spécifiques pour renforcer
                                l'impact de cette expérience.
                              </p>
                              <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-amber-800">
                                <span>Optimiser cette expérience</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Image
                        src="/marketing-company-logo.png"
                        alt="DigitalEdge"
                        width={48}
                        height={48}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Spécialiste Marketing Digital</h4>
                            <p className="text-sm text-muted-foreground">DigitalEdge · Temps plein</p>
                            <p className="text-xs text-muted-foreground">Mar 2017 - Dec 2019 · 2 ans 10 mois</p>
                            <p className="text-xs text-muted-foreground">Lyon, France</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Gestion des campagnes marketing digital et analyse des performances pour divers clients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Ajouter une expérience</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Avant / Après</CardTitle>
              <CardDescription>Visualisez l'impact des optimisations sur votre profil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      Avant
                    </Badge>
                    <div className="border rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder-2wzi7.png"
                        alt="Profil avant optimisation"
                        width={300}
                        height={400}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Badge variant="outline" className="bg-muted">
                        Score: 62/100
                      </Badge>
                      <Badge variant="outline" className="bg-muted">
                        Visibilité: Faible
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="outline" className="bg-green-100 text-green-800 mb-2">
                      Après
                    </Badge>
                    <div className="border rounded-lg overflow-hidden border-green-200 shadow-sm">
                      <Image
                        src="/placeholder-wemxk.png"
                        alt="Profil après optimisation"
                        width={300}
                        height={400}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Score: 92/100
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Visibilité: Élevée
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Optimiser mon profil complet</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
