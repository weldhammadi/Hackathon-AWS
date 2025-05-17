import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin } from "lucide-react"
import { getSimilarJobs } from "@/lib/jobs-service"

interface SimilarJobsProps {
  currentJobId: string
}

export async function SimilarJobs({ currentJobId }: SimilarJobsProps) {
  // Dans une application réelle, cette fonction récupérerait les données depuis l'API ou MongoDB
  const similarJobs = await getSimilarJobs(currentJobId)

  if (similarJobs.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Offres similaires</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {similarJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1">{job.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    <MapPin className="h-2.5 w-2.5 mr-1" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0 h-5">
                    {job.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
