import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Building, Clock, MapPin, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getJobs } from "@/lib/jobs-service"

export async function JobsList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // Dans une application réelle, cette fonction récupérerait les données depuis l'API ou MongoDB
  const jobs = await getJobs(searchParams)

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mx-auto bg-muted w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Aucune offre trouvée</h3>
          <p className="text-muted-foreground mb-4">
            Aucune offre ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
          </p>
          <Link href="/jobs">
            <Button variant="outline">Voir toutes les offres</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <Link href={`/jobs/${job.id}`} className="block">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    {job.companyLogo ? (
                      <Image
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <Building className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Star className="h-5 w-5" />
                  <span className="sr-only">Sauvegarder</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.type}
                </Badge>
                {job.remote && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Télétravail
                  </Badge>
                )}
                {job.urgent && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Urgent
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Publié {job.postedAt}</span>
                </div>
                <div className="text-sm font-medium">{job.salary ? job.salary : "Salaire non précisé"}</div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm">Postuler</Button>
                <Button size="sm" variant="outline">
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
