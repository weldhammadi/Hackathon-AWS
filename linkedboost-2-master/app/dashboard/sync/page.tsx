import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SyncDataButton } from "@/components/sync-data-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Database, RefreshCw, Server } from "lucide-react"

export default function SyncPage() {
  // Dans une application réelle, vous récupéreriez l'ID de l'utilisateur connecté
  const userId = "user_id_example"

  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Synchronisation des données</h1>
            <p className="text-muted-foreground">
              Synchronisez les données entre l'API Python et la base de données MongoDB
            </p>
          </div>
        </header>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            La synchronisation permet de récupérer les dernières données de l'API Python et de les stocker dans MongoDB.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="connections">Connexions</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Synchronisation des utilisateurs</CardTitle>
                <CardDescription>
                  Récupérez les données des utilisateurs depuis l'API Python et mettez à jour MongoDB
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <Server className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">API Python</h3>
                      <p className="text-sm text-muted-foreground">Source des données utilisateurs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">MongoDB</h3>
                      <p className="text-sm text-muted-foreground">Stockage des données utilisateurs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SyncDataButton type="users" />
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Synchronisation des connexions</CardTitle>
                <CardDescription>
                  Récupérez les connexions LinkedIn depuis l'API Python et mettez à jour MongoDB
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <Server className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">API Python</h3>
                      <p className="text-sm text-muted-foreground">Source des données de connexions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">MongoDB</h3>
                      <p className="text-sm text-muted-foreground">Stockage des données de connexions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SyncDataButton type="connections" userId={userId} />
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Synchronisation des opportunités</CardTitle>
                <CardDescription>
                  Récupérez les opportunités de networking depuis l'API Python et mettez à jour MongoDB
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <Server className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">API Python</h3>
                      <p className="text-sm text-muted-foreground">Source des données d'opportunités</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Database className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">MongoDB</h3>
                      <p className="text-sm text-muted-foreground">Stockage des données d'opportunités</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SyncDataButton type="opportunities" userId={userId} filters={{ minScore: 50 }} />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
