import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, ArrowLeft } from "lucide-react"

export default function JobNotFound() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto bg-muted w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">Offre d'emploi introuvable</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              L'offre d'emploi que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/jobs">
                <Button className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Retour aux offres d'emploi
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Aller au tableau de bord
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
