import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ClipboardCopy,
  ExternalLink,
  Key,
  Lock,
  RefreshCw,
  Settings,
  Shield,
  XCircle,
  Users,
  MessageSquare,
} from "lucide-react"
import { LinkedInAuthButton } from "@/components/linkedin-auth-button"
import { APIPermissionsList } from "@/components/api-permissions-list"

export default function APIIntegrationPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Intégration API LinkedIn</h1>
          <p className="text-muted-foreground">
            Configurez la connexion à l'API LinkedIn pour activer les automatisations
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Statut de connexion</CardTitle>
              <CardDescription>État actuel de votre connexion à l'API LinkedIn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium">Connecté</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Votre compte est correctement connecté à l'API LinkedIn
                </p>
                <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Limite d'API quotidienne</span>
                  <span className="font-medium">68% utilisée</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#0077B5] rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Se réinitialise dans 7h 23min</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Compte connecté</div>
                  <Badge variant="outline">Personnel</Badge>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-medium">Marie Dupont</p>
                    <p className="text-xs text-muted-foreground">marie.dupont@example.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Expiration du token</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="px-2 py-1 rounded bg-muted">
                    <span className="font-mono">28 jours restants</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Rafraîchir le token</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button variant="outline" className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Rafraîchir la connexion</span>
              </Button>
              <Button variant="destructive" className="w-full gap-2">
                <XCircle className="h-4 w-4" />
                <span>Déconnecter</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Configuration de l'API LinkedIn</CardTitle>
              <CardDescription>Gérez vos paramètres d'intégration avec LinkedIn</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="connection">
                <TabsList className="mb-4">
                  <TabsTrigger value="connection">Connexion</TabsTrigger>
                  <TabsTrigger value="permissions">Autorisations</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>

                <TabsContent value="connection" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Connecter votre compte LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">
                      Pour utiliser les fonctionnalités d'automatisation, vous devez connecter votre compte LinkedIn et
                      autoriser LinkedBoost à effectuer des actions en votre nom.
                    </p>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Compte connecté</AlertTitle>
                      <AlertDescription>
                        Votre compte LinkedIn est correctement connecté. Vous pouvez maintenant utiliser toutes les
                        fonctionnalités d'automatisation.
                      </AlertDescription>
                    </Alert>

                    <div className="flex flex-col items-center justify-center py-4">
                      <LinkedInAuthButton connected={true} />
                      <p className="text-xs text-muted-foreground mt-2">Dernière connexion: 15 mai 2025, 14:32</p>
                    </div>

                    <div className="rounded-lg border p-4 bg-muted/30">
                      <h4 className="text-sm font-medium mb-2">Informations importantes</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
                        <li>
                          LinkedIn limite le nombre d'actions automatisées pour éviter les abus. Respectez ces limites
                          pour éviter les restrictions.
                        </li>
                        <li>
                          Les tokens d'accès expirent après 60 jours et doivent être renouvelés pour maintenir la
                          connexion.
                        </li>
                        <li>
                          Vous pouvez révoquer l'accès à tout moment depuis vos paramètres de sécurité LinkedIn ou
                          depuis cette page.
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Autorisations de l'API</h3>
                    <p className="text-sm text-muted-foreground">
                      LinkedBoost requiert certaines autorisations pour exécuter des actions sur votre compte LinkedIn.
                      Voici les autorisations actuellement accordées.
                    </p>

                    <APIPermissionsList />

                    <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                      <AlertCircle className="h-4 w-4 text-amber-800" />
                      <AlertTitle>Autorisations manquantes</AlertTitle>
                      <AlertDescription>
                        Certaines autorisations sont manquantes pour utiliser toutes les fonctionnalités. Veuillez vous
                        reconnecter pour les accorder.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-end">
                      <Button className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        <span>Mettre à jour les autorisations</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Paramètres d'API</h3>
                    <p className="text-sm text-muted-foreground">
                      Configurez les paramètres avancés pour l'intégration de l'API LinkedIn.
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="client-id" className="text-sm font-medium">
                          Client ID
                        </label>
                        <div className="flex gap-2">
                          <Input id="client-id" value="86f53o2yfpqxot" type="password" className="font-mono" readOnly />
                          <Button variant="outline" size="icon">
                            <ClipboardCopy className="h-4 w-4" />
                            <span className="sr-only">Copier</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="client-secret" className="text-sm font-medium">
                          Client Secret
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="client-secret"
                            value="••••••••••••••••"
                            type="password"
                            className="font-mono"
                            readOnly
                          />
                          <Button variant="outline" size="icon">
                            <ClipboardCopy className="h-4 w-4" />
                            <span className="sr-only">Copier</span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="redirect-uri" className="text-sm font-medium">
                          URI de redirection
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="redirect-uri"
                            value="https://linkedboost.app/api/auth/callback/linkedin"
                            className="font-mono text-xs"
                            readOnly
                          />
                          <Button variant="outline" size="icon">
                            <ClipboardCopy className="h-4 w-4" />
                            <span className="sr-only">Copier</span>
                          </Button>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Mode de sécurité renforcé</label>
                            <p className="text-xs text-muted-foreground">
                              Ajoute des délais entre les actions pour éviter les restrictions
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Rotation automatique des tokens</label>
                            <p className="text-xs text-muted-foreground">
                              Renouvelle automatiquement les tokens avant expiration
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <label className="text-sm font-medium">Notifications d'erreur API</label>
                            <p className="text-xs text-muted-foreground">
                              Vous alerte en cas d'erreur ou de limitation d'API
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Guide d'intégration LinkedIn</CardTitle>
              <CardDescription>
                Suivez ces étapes pour configurer correctement l'intégration avec LinkedIn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-medium flex-shrink-0">
                    1
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Créer une application LinkedIn Developer</h3>
                    <p className="text-sm text-muted-foreground">
                      Rendez-vous sur le portail LinkedIn Developer pour créer une nouvelle application.
                    </p>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Accéder au portail LinkedIn Developer</span>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-medium flex-shrink-0">
                    2
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Configurer les autorisations OAuth</h3>
                    <p className="text-sm text-muted-foreground">
                      Dans les paramètres de votre application LinkedIn, configurez les scopes OAuth nécessaires pour
                      LinkedBoost.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono">
                      <div>r_liteprofile</div>
                      <div>r_emailaddress</div>
                      <div>w_member_social</div>
                      <div>r_network</div>
                      <div>rw_organization_admin</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-medium flex-shrink-0">
                    3
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Ajouter l'URI de redirection</h3>
                    <p className="text-sm text-muted-foreground">
                      Configurez l'URI de redirection dans votre application LinkedIn Developer.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value="https://linkedboost.app/api/auth/callback/linkedin"
                        className="font-mono text-xs"
                        readOnly
                      />
                      <Button variant="outline" size="icon">
                        <ClipboardCopy className="h-4 w-4" />
                        <span className="sr-only">Copier</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-medium flex-shrink-0">
                    4
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Obtenir les identifiants d'API</h3>
                    <p className="text-sm text-muted-foreground">
                      Copiez le Client ID et le Client Secret de votre application LinkedIn et ajoutez-les dans les
                      paramètres ci-dessus.
                    </p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Client ID</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Client Secret</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-medium flex-shrink-0">
                    5
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Connecter votre compte</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilisez le bouton de connexion LinkedIn pour autoriser LinkedBoost à accéder à votre compte.
                    </p>
                    <LinkedInAuthButton connected={true} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="gap-2 w-full">
                <Shield className="h-4 w-4" />
                <span>Vérifier la configuration</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Tester l'intégration API</CardTitle>
              <CardDescription>Vérifiez que votre connexion à l'API LinkedIn fonctionne correctement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg border bg-card flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium">Récupération du profil</h3>
                    <p className="text-sm text-muted-foreground mb-4">Vérifie l'accès aux données de profil</p>
                    <Badge className="bg-green-100 text-green-800">Succès</Badge>
                  </div>

                  <div className="p-4 rounded-lg border bg-card flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium">Envoi de message</h3>
                    <p className="text-sm text-muted-foreground mb-4">Vérifie la capacité d'envoi de messages</p>
                    <Badge className="bg-green-100 text-green-800">Succès</Badge>
                  </div>

                  <div className="p-4 rounded-lg border bg-card flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                      <Settings className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="font-medium">Actions automatisées</h3>
                    <p className="text-sm text-muted-foreground mb-4">Vérifie les actions d'automatisation</p>
                    <Badge className="bg-amber-100 text-amber-800">Partiel</Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Journal de test</h3>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs h-32 overflow-auto">
                    <div className="text-green-600">[INFO] Test démarré: 16/05/2025 09:26:12</div>
                    <div className="text-green-600">[SUCCESS] Authentification réussie</div>
                    <div className="text-green-600">[SUCCESS] Profil récupéré: Marie Dupont</div>
                    <div className="text-green-600">[SUCCESS] Connexions récupérées: 487 connexions</div>
                    <div className="text-green-600">[SUCCESS] Test d'envoi de message: Simulé avec succès</div>
                    <div className="text-amber-600">[WARNING] Limite d'API: 68% de la limite quotidienne utilisée</div>
                    <div className="text-amber-600">
                      [WARNING] Certaines autorisations avancées sont manquantes pour l'automatisation complète
                    </div>
                    <div className="text-green-600">[INFO] Test terminé: 16/05/2025 09:26:39</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exporter les résultats</Button>
              <Button className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Relancer les tests</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="gap-2" size="lg">
            <span>Retour aux automatisations</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
