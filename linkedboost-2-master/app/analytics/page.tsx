import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  Calendar,
  Download,
  Filter,
  Users,
  MessageSquare,
  Eye,
  ThumbsUp,
  BarChart,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Analysez les performances de vos activités LinkedIn</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Sélectionner une période</span>
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrer</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Connexions totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">487</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+24 ce mois-ci</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taux d'acceptation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+12% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Vues de profil</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+32% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+8% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="connections">Connexions</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="automation">Automatisations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activité du réseau</CardTitle>
                  <CardDescription>Vue d'ensemble de l'activité de votre réseau LinkedIn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="flex flex-col items-center text-center p-4">
                      <BarChart className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Graphique d'activité</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Ce graphique afficherait l'évolution de votre activité LinkedIn au fil du temps, incluant les
                        connexions, messages et interactions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance des messages</CardTitle>
                    <CardDescription>Taux de réponse et efficacité</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Messages de connexion</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Messages de suivi</span>
                          <span className="font-medium">64%</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Messages de prospection</span>
                          <span className="font-medium">48%</span>
                        </div>
                        <Progress value={48} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Messages de félicitation</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Temps économisé</CardTitle>
                    <CardDescription>Estimation du temps gagné grâce aux automatisations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-[200px]">
                      <div className="relative w-40 h-40">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#0077B5"
                              strokeWidth="10"
                              strokeDasharray="282.7"
                              strokeDashoffset="70.7"
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <Clock className="h-6 w-6 text-primary mb-1" />
                            <span className="text-3xl font-bold">12.5</span>
                            <span className="text-sm text-muted-foreground">heures/mois</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Temps économisé grâce aux automatisations LinkedBoost
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="connections">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse des connexions</CardTitle>
                  <CardDescription>Détails sur vos connexions LinkedIn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="flex flex-col items-center text-center p-4">
                      <Users className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Analyse des connexions</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Cette section afficherait des graphiques et statistiques détaillés sur vos connexions LinkedIn,
                        incluant la croissance, la répartition par secteur, et plus encore.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse des messages</CardTitle>
                  <CardDescription>Performances de vos messages LinkedIn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="flex flex-col items-center text-center p-4">
                      <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Analyse des messages</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Cette section afficherait des statistiques détaillées sur vos messages LinkedIn, incluant les
                        taux de réponse, les temps de réponse, et l'efficacité des différents modèles de messages.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
