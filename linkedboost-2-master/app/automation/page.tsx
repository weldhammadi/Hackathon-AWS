import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  Calendar,
  Clock,
  Edit,
  Info,
  MessageSquare,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Settings,
  ThumbsUp,
  Users,
  Zap,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react"
import { AutomationCalendar } from "@/components/automation-calendar"
import Link from "next/link"

export default function AutomationPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Automatisation</h1>
            <p className="text-muted-foreground">
              Planifiez et automatisez vos actions LinkedIn pour maintenir une présence constante
            </p>
          </div>
          <Link href="/settings/api-integration">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden md:inline">Configuration API</span>
              <span className="inline md:hidden">API</span>
            </Button>
          </Link>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Automatisations actives</CardTitle>
              <CardDescription>Vue d'ensemble de vos automatisations en cours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Automatisations actives</span>
                  </div>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-medium">En pause</span>
                  </div>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Planifiées</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Quota d'actions quotidien</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Utilisé aujourd'hui</span>
                    <span>12/25</span>
                  </div>
                  <Progress value={48} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Limite quotidienne pour éviter les restrictions LinkedIn
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Prochaines actions</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Envoi de messages de suivi</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Aujourd'hui, 15:30</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Interactions avec le réseau</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Demain, 10:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres d'automatisation</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mes automatisations</CardTitle>
                  <CardDescription>Gérez vos automatisations LinkedIn</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle automatisation</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="active">Actives</TabsTrigger>
                  <TabsTrigger value="paused">En pause</TabsTrigger>
                  <TabsTrigger value="scheduled">Planifiées</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {[
                    {
                      name: "Envoi de messages de suivi",
                      description:
                        "Envoie automatiquement des messages de suivi aux nouvelles connexions après 3 jours",
                      type: "Messages",
                      frequency: "Quotidien",
                      status: "active",
                      lastRun: "Aujourd'hui, 09:15",
                      nextRun: "Demain, 09:15",
                      actions: "12 messages envoyés cette semaine",
                    },
                    {
                      name: "Interactions avec le réseau",
                      description: "Aime et commente les publications de votre réseau pour augmenter la visibilité",
                      type: "Engagement",
                      frequency: "Quotidien",
                      status: "active",
                      lastRun: "Aujourd'hui, 10:30",
                      nextRun: "Demain, 10:00",
                      actions: "28 interactions cette semaine",
                    },
                    {
                      name: "Demandes de connexion ciblées",
                      description: "Envoie des demandes de connexion aux professionnels de votre secteur",
                      type: "Connexions",
                      frequency: "Hebdomadaire",
                      status: "paused",
                      lastRun: "Il y a 5 jours",
                      nextRun: "En pause",
                      actions: "15 demandes envoyées ce mois",
                    },
                    {
                      name: "Publication de contenu",
                      description: "Publie automatiquement du contenu selon un calendrier prédéfini",
                      type: "Contenu",
                      frequency: "Hebdomadaire",
                      status: "scheduled",
                      lastRun: "Jamais exécuté",
                      nextRun: "Lundi prochain, 08:00",
                      actions: "Planifié pour démarrer la semaine prochaine",
                    },
                    {
                      name: "Félicitations automatiques",
                      description: "Envoie des félicitations pour les anniversaires et changements de poste",
                      type: "Messages",
                      frequency: "Quotidien",
                      status: "active",
                      lastRun: "Aujourd'hui, 08:00",
                      nextRun: "Demain, 08:00",
                      actions: "7 messages envoyés cette semaine",
                    },
                    {
                      name: "Veille concurrentielle",
                      description: "Surveille et interagit avec le contenu des concurrents et leaders du secteur",
                      type: "Veille",
                      frequency: "Bi-hebdomadaire",
                      status: "scheduled",
                      lastRun: "Jamais exécuté",
                      nextRun: "Jeudi, 14:00",
                      actions: "Planifié pour démarrer cette semaine",
                    },
                  ].map((automation, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              automation.type === "Messages"
                                ? "bg-blue-100"
                                : automation.type === "Engagement"
                                  ? "bg-green-100"
                                  : automation.type === "Connexions"
                                    ? "bg-purple-100"
                                    : automation.type === "Contenu"
                                      ? "bg-amber-100"
                                      : "bg-gray-100"
                            }`}
                          >
                            {automation.type === "Messages" ? (
                              <MessageSquare
                                className={`h-5 w-5 ${automation.type === "Messages" ? "text-blue-600" : ""}`}
                              />
                            ) : automation.type === "Engagement" ? (
                              <ThumbsUp className="h-5 w-5 text-green-600" />
                            ) : automation.type === "Connexions" ? (
                              <Users className="h-5 w-5 text-purple-600" />
                            ) : automation.type === "Contenu" ? (
                              <Edit className="h-5 w-5 text-amber-600" />
                            ) : (
                              <Zap className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{automation.name}</h3>
                              <Badge
                                variant="outline"
                                className={`${
                                  automation.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : automation.status === "paused"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {automation.status === "active"
                                  ? "Actif"
                                  : automation.status === "paused"
                                    ? "En pause"
                                    : "Planifié"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{automation.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          {automation.status === "active" ? (
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Pause className="h-4 w-4" />
                              <span className="sr-only">Pause</span>
                            </Button>
                          ) : automation.status === "paused" ? (
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Reprendre</span>
                            </Button>
                          ) : (
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">Planifier</span>
                            </Button>
                          )}
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Plus</span>
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted/30 px-4 py-2 text-xs border-t">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <RefreshCw className="h-3 w-3 text-muted-foreground" />
                              <span>{automation.frequency}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>Dernière exécution: {automation.lastRun}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>Prochaine: {automation.nextRun}</span>
                            </div>
                          </div>
                          <div className="text-muted-foreground">{automation.actions}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier d'automatisation</CardTitle>
              <CardDescription>Visualisez toutes vos actions automatisées sur un calendrier</CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationCalendar />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle automatisation</CardTitle>
              <CardDescription>Configurez une nouvelle action automatisée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="automation-name" className="text-sm font-medium">
                  Nom de l'automatisation
                </label>
                <Input id="automation-name" placeholder="Ex: Messages de suivi hebdomadaires" />
              </div>

              <div className="space-y-2">
                <label htmlFor="automation-type" className="text-sm font-medium">
                  Type d'automatisation
                </label>
                <Select>
                  <SelectTrigger id="automation-type">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="messages">Messages</SelectItem>
                    <SelectItem value="connections">Demandes de connexion</SelectItem>
                    <SelectItem value="engagement">Interactions (likes, commentaires)</SelectItem>
                    <SelectItem value="content">Publication de contenu</SelectItem>
                    <SelectItem value="monitoring">Veille concurrentielle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="automation-frequency" className="text-sm font-medium">
                  Fréquence
                </label>
                <Select>
                  <SelectTrigger id="automation-frequency">
                    <SelectValue placeholder="Sélectionnez une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="biweekly">Bi-hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                    <SelectItem value="custom">Personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="automation-target" className="text-sm font-medium">
                  Cible
                </label>
                <Select>
                  <SelectTrigger id="automation-target">
                    <SelectValue placeholder="Sélectionnez une cible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-connections">Nouvelles connexions</SelectItem>
                    <SelectItem value="all-network">Tout mon réseau</SelectItem>
                    <SelectItem value="specific-list">Liste spécifique</SelectItem>
                    <SelectItem value="industry">Par secteur d'activité</SelectItem>
                    <SelectItem value="custom-search">Recherche personnalisée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="automation-content" className="text-sm font-medium">
                  Contenu
                </label>
                <Textarea
                  id="automation-content"
                  placeholder="Contenu du message ou de la publication..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>
                    Vous pouvez utiliser des variables comme {"{prénom}"} ou {"{entreprise}"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="automation-active" className="text-sm font-medium">
                    Activer immédiatement
                  </label>
                  <Switch id="automation-active" />
                </div>
              </div>

              <div className="rounded-lg border p-3 bg-amber-50 border-amber-200 mt-4">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Recommandations de sécurité</p>
                    <p className="mt-1">
                      Pour éviter les restrictions LinkedIn, limitez vos automatisations à 20-25 actions par jour et
                      variez les heures d'exécution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button>Créer l'automatisation</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modèles d'automatisation</CardTitle>
              <CardDescription>Utilisez des modèles prédéfinis pour démarrer rapidement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Suivi des nouvelles connexions",
                  description: "Envoie automatiquement un message de suivi 3 jours après l'acceptation d'une connexion",
                  type: "Messages",
                  popularity: "Populaire",
                },
                {
                  name: "Engagement quotidien",
                  description: "Aime et commente les publications de votre réseau pour augmenter votre visibilité",
                  type: "Engagement",
                  popularity: "Très populaire",
                },
                {
                  name: "Prospection ciblée",
                  description: "Envoie des demandes de connexion personnalisées à des prospects ciblés",
                  type: "Connexions",
                  popularity: "Populaire",
                },
                {
                  name: "Partage de contenu",
                  description: "Publie automatiquement du contenu selon un calendrier prédéfini",
                  type: "Contenu",
                  popularity: "Nouveau",
                },
                {
                  name: "Félicitations automatiques",
                  description: "Envoie des félicitations pour les anniversaires et changements de poste",
                  type: "Messages",
                  popularity: "Efficace",
                },
              ].map((template, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      template.type === "Messages"
                        ? "bg-blue-100"
                        : template.type === "Engagement"
                          ? "bg-green-100"
                          : template.type === "Connexions"
                            ? "bg-purple-100"
                            : template.type === "Contenu"
                              ? "bg-amber-100"
                              : "bg-gray-100"
                    }`}
                  >
                    {template.type === "Messages" ? (
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    ) : template.type === "Engagement" ? (
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                    ) : template.type === "Connexions" ? (
                      <Users className="h-5 w-5 text-purple-600" />
                    ) : template.type === "Contenu" ? (
                      <Edit className="h-5 w-5 text-amber-600" />
                    ) : (
                      <Zap className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge
                        variant="outline"
                        className={`${
                          template.popularity === "Très populaire"
                            ? "bg-green-100 text-green-800"
                            : template.popularity === "Populaire"
                              ? "bg-blue-100 text-blue-800"
                              : template.popularity === "Nouveau"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {template.popularity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    <Button variant="link" className="h-auto p-0 mt-1 text-sm">
                      Utiliser ce modèle
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Voir tous les modèles
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques d'automatisation</CardTitle>
              <CardDescription>Performances de vos automatisations au fil du temps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">127</div>
                  <div className="text-sm text-muted-foreground">Actions automatisées ce mois</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+24% vs mois dernier</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Taux de réponse moyen</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+12% vs mois dernier</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Nouvelles connexions</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+8% vs mois dernier</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">3.2h</div>
                  <div className="text-sm text-muted-foreground">Temps économisé par semaine</div>
                  <div className="text-xs text-muted-foreground">Basé sur vos automatisations</div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Performances par type d'automatisation</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span>Messages</span>
                      </div>
                      <span className="font-medium">78% de réponses</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span>Demandes de connexion</span>
                      </div>
                      <span className="font-medium">65% d'acceptation</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span>Interactions</span>
                      </div>
                      <span className="font-medium">92% de visibilité</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-amber-600" />
                        <span>Publications</span>
                      </div>
                      <span className="font-medium">54% d'engagement</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Actualiser les statistiques</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
