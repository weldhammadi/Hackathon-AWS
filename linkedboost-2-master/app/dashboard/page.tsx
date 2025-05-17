import Image from "next/image"
import { ArrowUpRight, Bell, Calendar, Clock, LineChart, MoreHorizontal, Plus, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NetworkChart } from "@/components/network-chart"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue, Marie. Voici un aperçu de votre réseau LinkedIn.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Paramètres</span>
            </Button>
            <div className="flex items-center gap-2">
              <Image
                src="/professional-woman-portrait.png"
                alt="Marie Dupont"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Connexions totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">487</div>
              <p className="text-xs text-muted-foreground">+24 ce mois-ci</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taux d'acceptation</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Score de profil</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78/100</div>
              <Progress value={78} className="h-2 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages envoyés</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">18 réponses reçues</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Évolution de votre réseau</CardTitle>
              <CardDescription>Croissance de vos connexions au cours des 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkChart />
            </CardContent>
          </Card>
          <Card className="md:col-span-3">
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Opportunités détectées</CardTitle>
                <CardDescription>Contacts pertinents pour votre réseau</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>Voir tout</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Alexandre Martin",
                    role: "Directeur Marketing",
                    company: "TechVision",
                    mutual: 12,
                  },
                  {
                    name: "Julie Lefebvre",
                    role: "Product Manager",
                    company: "InnoSoft",
                    mutual: 8,
                  },
                  {
                    name: "Thomas Bernard",
                    role: "Développeur Senior",
                    company: "DataTech",
                    mutual: 5,
                  },
                  {
                    name: "Sophie Moreau",
                    role: "Responsable RH",
                    company: "GlobalCorp",
                    mutual: 3,
                  },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image
                      src={`/placeholder-xyxcs.png?height=40&width=40&query=portrait of professional person ${i + 1}`}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.role} chez {contact.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{contact.mutual}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Options</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Scanner pour plus d'opportunités
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-7">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Actions planifiées</CardTitle>
              <CardDescription>Vos prochaines actions de networking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Suivi avec Jean Dupont",
                    description: "Discuter de l'opportunité chez TechCorp",
                    date: "Aujourd'hui, 14:00",
                  },
                  {
                    title: "Message de remerciement",
                    description: "Suite à la réunion avec Marie Laurent",
                    date: "Demain, 10:00",
                  },
                  {
                    title: "Invitation à se connecter",
                    description: "Nouveaux contacts de la conférence Tech",
                    date: "Jeudi, 09:00",
                  },
                ].map((task, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{task.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Options</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une action
              </Button>
            </CardFooter>
          </Card>
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Optimisation de profil</CardTitle>
              <CardDescription>Suggestions pour améliorer votre profil LinkedIn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-medium">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Améliorez votre titre professionnel</h4>
                    <p className="text-sm text-muted-foreground">
                      Votre titre actuel pourrait être plus percutant et inclure des mots-clés pertinents.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>Optimiser</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-medium">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Complétez votre section compétences</h4>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez 5 compétences supplémentaires pour améliorer votre visibilité dans les recherches.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>Optimiser</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 font-medium">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Enrichissez votre résumé</h4>
                    <p className="text-sm text-muted-foreground">
                      Votre résumé pourrait être plus engageant et mettre en avant vos réalisations clés.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>Optimiser</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Score actuel:</span>
                <div className="flex items-center gap-1.5">
                  <Progress value={78} className="h-2 w-24" />
                  <span className="text-sm">78/100</span>
                </div>
              </div>
              <Button>Voir l'analyse complète</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
