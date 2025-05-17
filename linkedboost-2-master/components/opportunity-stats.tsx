"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Users, Building, MapPin, Briefcase } from "lucide-react"
import type { NetworkingOpportunity } from "@/lib/opportunity-detection-service"

interface OpportunityStatsProps {
  opportunities: NetworkingOpportunity[]
}

export function OpportunityStats({ opportunities }: OpportunityStatsProps) {
  // Calculer les statistiques
  const totalOpportunities = opportunities.length
  const highRelevanceCount = opportunities.filter((opp) => opp.relevanceScore >= 80).length
  const mediumRelevanceCount = opportunities.filter((opp) => opp.relevanceScore >= 60 && opp.relevanceScore < 80).length
  const lowRelevanceCount = opportunities.filter((opp) => opp.relevanceScore < 60).length

  const highRelevancePercentage =
    totalOpportunities > 0 ? Math.round((highRelevanceCount / totalOpportunities) * 100) : 0

  const mediumRelevancePercentage =
    totalOpportunities > 0 ? Math.round((mediumRelevanceCount / totalOpportunities) * 100) : 0

  const lowRelevancePercentage = totalOpportunities > 0 ? Math.round((lowRelevanceCount / totalOpportunities) * 100) : 0

  // Calculer les sources principales
  const sourceCount: Record<string, number> = {}
  opportunities.forEach((opp) => {
    sourceCount[opp.source] = (sourceCount[opp.source] || 0) + 1
  })

  const topSources = Object.entries(sourceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / totalOpportunities) * 100),
    }))

  // Calculer les industries principales
  const industries: Record<string, number> = {}
  opportunities.forEach((opp) => {
    if (opp.company) {
      industries[opp.company] = (industries[opp.company] || 0) + 1
    }
  })

  const topIndustries = Object.entries(industries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([industry, count]) => ({
      industry,
      count,
      percentage: Math.round((count / totalOpportunities) * 100),
    }))

  const getSourceLabel = (source: string): string => {
    switch (source) {
      case "industry_match":
        return "Même secteur"
      case "mutual_connections":
        return "Connexions communes"
      case "similar_role":
        return "Rôle similaire"
      case "company_interest":
        return "Entreprise d'intérêt"
      case "event_attendance":
        return "Même événement"
      case "content_engagement":
        return "Engagement contenu"
      case "career_change":
        return "Changement de carrière"
      case "viewed_profile":
        return "A consulté votre profil"
      case "ai_recommendation":
        return "Recommandation IA"
      default:
        return source
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Répartition par pertinence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Pertinence élevée (80-100)</span>
              </div>
              <span className="font-medium">{highRelevanceCount}</span>
            </div>
            <Progress value={highRelevancePercentage} className="h-2 bg-muted" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">Pertinence moyenne (60-79)</span>
              </div>
              <span className="font-medium">{mediumRelevanceCount}</span>
            </div>
            <Progress value={mediumRelevancePercentage} className="h-2 bg-muted" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Pertinence faible (0-59)</span>
              </div>
              <span className="font-medium">{lowRelevanceCount}</span>
            </div>
            <Progress value={lowRelevancePercentage} className="h-2 bg-muted" />
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total des opportunités</span>
              <span className="text-2xl font-bold">{totalOpportunities}</span>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1 justify-end mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+{Math.floor(Math.random() * 20) + 5}% vs semaine dernière</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Sources principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {source.source === "mutual_connections" ? (
                      <Users className="h-4 w-4 text-primary" />
                    ) : source.source === "industry_match" ? (
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    ) : source.source === "company_interest" ? (
                      <Building className="h-4 w-4 text-amber-600" />
                    ) : (
                      <MapPin className="h-4 w-4 text-green-600" />
                    )}
                    <span className="text-sm">{getSourceLabel(source.source)}</span>
                  </div>
                  <span className="font-medium">{source.count}</span>
                </div>
                <Progress value={source.percentage} className="h-2 bg-muted" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Entreprises principales</div>
            <div className="space-y-2">
              {topIndustries.map((industry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{industry.industry}</span>
                  </div>
                  <span className="text-sm font-medium">{industry.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
