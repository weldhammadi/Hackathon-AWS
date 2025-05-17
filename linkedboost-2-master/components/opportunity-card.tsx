"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  Building,
  Calendar,
  Info,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Star,
  Users,
  X,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { NetworkingOpportunity } from "@/lib/opportunity-detection-service"

interface OpportunityCardProps {
  opportunity: NetworkingOpportunity
  onConnect?: (opportunity: NetworkingOpportunity) => void
  onMessage?: (opportunity: NetworkingOpportunity) => void
  onIgnore?: (opportunity: NetworkingOpportunity) => void
  onSave?: (opportunity: NetworkingOpportunity) => void
}

export function OpportunityCard({ opportunity, onConnect, onMessage, onIgnore, onSave }: OpportunityCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
    if (onSave) onSave(opportunity)
  }

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

  const getSourceColor = (source: string): string => {
    switch (source) {
      case "industry_match":
        return "bg-blue-100 text-blue-800"
      case "mutual_connections":
        return "bg-green-100 text-green-800"
      case "similar_role":
        return "bg-purple-100 text-purple-800"
      case "company_interest":
        return "bg-amber-100 text-amber-800"
      case "event_attendance":
        return "bg-indigo-100 text-indigo-800"
      case "content_engagement":
        return "bg-pink-100 text-pink-800"
      case "career_change":
        return "bg-orange-100 text-orange-800"
      case "viewed_profile":
        return "bg-red-100 text-red-800"
      case "ai_recommendation":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-40 md:h-auto bg-gradient-to-r from-[#0077B5]/10 to-[#36B37E]/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={opportunity.profilePicture || `/placeholder.svg?height=100&width=100&query=professional person`}
                alt={`${opportunity.firstName} ${opportunity.lastName}`}
                width={100}
                height={100}
                className="rounded-full border-4 border-white"
              />
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  {opportunity.firstName} {opportunity.lastName}
                </h3>
                <p className="text-muted-foreground">{opportunity.headline || opportunity.position}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                  <Users className="h-3 w-3 mr-1" />
                  {opportunity.mutualConnections} relations
                </Badge>
                <Badge variant="outline" className={getSourceColor(opportunity.source)}>
                  {getSourceLabel(opportunity.source)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {opportunity.company && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{opportunity.company}</span>
                </div>
              )}
              {opportunity.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{opportunity.location}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">Score de pertinence</div>
                <div className="text-sm font-medium">{opportunity.relevanceScore}/100</div>
              </div>
              <Progress value={opportunity.relevanceScore} className="h-2" />
              <div className="flex justify-end mt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2 max-w-xs">
                        <p className="font-medium">Facteurs de pertinence:</p>
                        <ul className="text-xs space-y-1">
                          {opportunity.relevanceFactors.map((factor, i) => (
                            <li key={i}>• {factor.description}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {opportunity.tags.map((tag, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button size="sm" className="gap-1" onClick={() => onConnect?.(opportunity)}>
                <Users className="h-3.5 w-3.5" />
                <span>Se connecter</span>
              </Button>
              <Button size="sm" variant="outline" className="gap-1" onClick={() => onMessage?.(opportunity)}>
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={`gap-1 ${isSaved ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50" : ""}`}
                onClick={handleSave}
              >
                <Star className="h-3.5 w-3.5" fill={isSaved ? "currentColor" : "none"} />
                <span>{isSaved ? "Sauvegardé" : "Sauvegarder"}</span>
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={() => window.open(`https://linkedin.com/in/${opportunity.contactId}`, "_blank")}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span>Voir sur LinkedIn</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onIgnore?.(opportunity)}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Ignorer</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        {opportunity.lastActivity && (
          <div className="bg-muted/30 px-4 py-2 text-xs border-t">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>Dernière activité: {opportunity.lastActivity.toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
