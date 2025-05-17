"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { SyncDataButton } from "@/components/sync-data-button"

export default function TestIntegrationPage() {
  const [mongoStatus, setMongoStatus] = useState<{
    success?: boolean
    message?: string
    collections?: string[]
    error?: string
  }>({})

  const [apiStatus, setApiStatus] = useState<{
    success?: boolean
    message?: string
    apiResponse?: any
    error?: string
  }>({})

  const [isTestingMongo, setIsTestingMongo] = useState(false)
  const [isTestingApi, setIsTestingApi] = useState(false)

  const testMongoConnection = async () => {
    setIsTestingMongo(true)
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setMongoStatus(data)
    } catch (error) {
      setMongoStatus({
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      })
    } finally {
      setIsTestingMongo(false)
    }
  }

  const testApiConnection = async () => {
    setIsTestingApi(true)
    try {
      const response = await fetch("/api/test-api")
      const data = await response.json()
      setApiStatus(data)
    } catch (error) {
      setApiStatus({
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      })
    } finally {
      setIsTestingApi(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Test d'intégration API Python → MongoDB</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test de connexion MongoDB</CardTitle>
            <CardDescription>Vérifiez que votre application peut se connecter à MongoDB</CardDescription>
          </CardHeader>
          <CardContent>
            {mongoStatus.success !== undefined && (
              <Alert variant={mongoStatus.success ? "default" : "destructive"} className="mb-4">
                {mongoStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{mongoStatus.success ? "Connexion réussie" : "Échec de connexion"}</AlertTitle>
                <AlertDescription>
                  {mongoStatus.message || mongoStatus.error}
                  {mongoStatus.collections && (
                    <div className="mt-2">
                      <p className="font-semibold">Collections disponibles:</p>
                      <ul className="list-disc pl-5 mt-1">
                        {mongoStatus.collections.map((collection) => (
                          <li key={collection}>{collection}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testMongoConnection} disabled={isTestingMongo}>
              {isTestingMongo ? "Test en cours..." : "Tester la connexion MongoDB"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test de connexion API Python</CardTitle>
            <CardDescription>Vérifiez que votre application peut se connecter à l'API Python</CardDescription>
          </CardHeader>
          <CardContent>
            {apiStatus.success !== undefined && (
              <Alert variant={apiStatus.success ? "default" : "destructive"} className="mb-4">
                {apiStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{apiStatus.success ? "Connexion réussie" : "Échec de connexion"}</AlertTitle>
                <AlertDescription>
                  {apiStatus.message || apiStatus.error}
                  {apiStatus.apiResponse && (
                    <div className="mt-2">
                      <p className="font-semibold">Réponse de l'API:</p>
                      <pre className="bg-muted p-2 rounded-md text-xs mt-1 overflow-auto max-h-40">
                        {JSON.stringify(apiStatus.apiResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testApiConnection} disabled={isTestingApi}>
              {isTestingApi ? "Test en cours..." : "Tester la connexion API Python"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">Test de synchronisation</h2>

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
                Testez la synchronisation des utilisateurs depuis l'API Python vers MongoDB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Cette action va récupérer les utilisateurs depuis l'API Python et les stocker dans MongoDB.
                </AlertDescription>
              </Alert>
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
                Testez la synchronisation des connexions depuis l'API Python vers MongoDB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Cette action va récupérer les connexions depuis l'API Python et les stocker dans MongoDB. Vous devez
                  spécifier un ID d'utilisateur valide.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <SyncDataButton type="connections" userId="user_id_example" />
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Synchronisation des opportunités</CardTitle>
              <CardDescription>
                Testez la synchronisation des opportunités depuis l'API Python vers MongoDB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Cette action va récupérer les opportunités depuis l'API Python et les stocker dans MongoDB. Vous devez
                  spécifier un ID d'utilisateur valide.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <SyncDataButton type="opportunities" userId="user_id_example" />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
