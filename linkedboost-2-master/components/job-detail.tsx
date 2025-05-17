import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Building, Calendar, Clock, Globe, GraduationCap, MapPin, Share2, Star, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { Job } from "@/lib/jobs-service"

interface JobDetailProps {
  job: Job
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <Card>
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.company}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <Building className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-lg text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Star className="h-5 w-5" />
              <span className="sr-only">Sauvegarder</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Partager</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {job.experienceLevel}
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
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Publié {job.postedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Date de début: {job.startDate || "Dès que possible"}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>Diplôme: {job.education || "Non spécifié"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>Langues: {job.languages?.join(", ") || "Non spécifié"}</span>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-3">Description du poste</h2>
          <div className="space-y-4 text-sm">
            <p>{job.description}</p>
            {job.responsibilities && (
              <div>
                <h3 className="font-medium mb-2">Responsabilités:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-3">Profil recherché</h2>
          <div className="space-y-4 text-sm">
            {job.requirements && (
              <div>
                <h3 className="font-medium mb-2">Compétences requises:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {job.niceToHave && (
              <div>
                <h3 className="font-medium mb-2">Compétences appréciées:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.niceToHave.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-3">Avantages</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {job.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-3">À propos de {job.company}</h2>
          <p className="text-sm">{job.companyDescription}</p>
          {job.companyWebsite && (
            <Button variant="link" className="px-0 h-auto mt-2" asChild>
              <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                Visiter le site web
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
