"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function JobsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Récupérer les filtres actuels depuis l'URL
  const currentTypes = searchParams.get("types")?.split(",") || []
  const currentLocations = searchParams.get("locations")?.split(",") || []
  const currentExperience = searchParams.get("experience") || "0,10"
  const [experienceRange, setExperienceRange] = useState(currentExperience.split(",").map(Number))

  // Options de filtres
  const jobTypes = [
    { id: "full-time", label: "CDI" },
    { id: "part-time", label: "CDD" },
    { id: "contract", label: "Freelance" },
    { id: "internship", label: "Stage" },
    { id: "remote", label: "Télétravail" },
  ]

  const locations = [
    { id: "paris", label: "Paris" },
    { id: "lyon", label: "Lyon" },
    { id: "marseille", label: "Marseille" },
    { id: "bordeaux", label: "Bordeaux" },
    { id: "lille", label: "Lille" },
    { id: "remote", label: "Télétravail" },
  ]

  // Mettre à jour les filtres
  const updateFilters = (key: string, value: string[]) => {
    const params = new URLSearchParams(searchParams)
    if (value.length > 0) {
      params.set(key, value.join(","))
    } else {
      params.delete(key)
    }
    router.push(`/jobs?${params.toString()}`)
  }

  const updateExperienceFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.set("experience", experienceRange.join(","))
    router.push(`/jobs?${params.toString()}`)
  }

  const toggleFilter = (key: string, value: string, currentValues: string[]) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    updateFilters(key, newValues)
  }

  const clearAllFilters = () => {
    router.push("/jobs")
  }

  const hasActiveFilters = currentTypes.length > 0 || currentLocations.length > 0 || currentExperience !== "0,10"

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtres</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2">
              Effacer tout
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Filtres actifs</div>
            <div className="flex flex-wrap gap-1">
              {currentTypes.map((type) => {
                const typeLabel = jobTypes.find((t) => t.id === type)?.label || type
                return (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {typeLabel}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleFilter("types", type, currentTypes)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Supprimer {typeLabel}</span>
                    </Button>
                  </Badge>
                )
              })}
              {currentLocations.map((location) => {
                const locationLabel = locations.find((l) => l.id === location)?.label || location
                return (
                  <Badge key={location} variant="secondary" className="gap-1">
                    {locationLabel}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => toggleFilter("locations", location, currentLocations)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Supprimer {locationLabel}</span>
                    </Button>
                  </Badge>
                )
              })}
              {currentExperience !== "0,10" && (
                <Badge variant="secondary" className="gap-1">
                  {experienceRange[0]}-{experienceRange[1]} ans d'expérience
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setExperienceRange([0, 10])
                      const params = new URLSearchParams(searchParams)
                      params.delete("experience")
                      router.push(`/jobs?${params.toString()}`)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Réinitialiser l'expérience</span>
                  </Button>
                </Badge>
              )}
            </div>
            <Separator className="my-2" />
          </div>
        )}

        {/* Type de contrat */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Type de contrat</div>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={currentTypes.includes(type.id)}
                  onCheckedChange={() => toggleFilter("types", type.id, currentTypes)}
                />
                <Label htmlFor={`type-${type.id}`} className="text-sm">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Localisation */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Localisation</div>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location.id}`}
                  checked={currentLocations.includes(location.id)}
                  onCheckedChange={() => toggleFilter("locations", location.id, currentLocations)}
                />
                <Label htmlFor={`location-${location.id}`} className="text-sm">
                  {location.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Expérience */}
        <div className="space-y-4">
          <div className="text-sm font-medium">Années d'expérience</div>
          <Slider
            value={experienceRange}
            min={0}
            max={10}
            step={1}
            onValueChange={setExperienceRange}
            onValueCommit={updateExperienceFilter}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {experienceRange[0]} an{experienceRange[0] > 1 ? "s" : ""}
            </span>
            <span>
              {experienceRange[1]} an{experienceRange[1] > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          Appliquer les filtres
        </Button>
      </CardContent>
    </Card>
  )
}
