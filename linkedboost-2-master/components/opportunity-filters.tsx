"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, X } from "lucide-react"
import type { OpportunityDetectionOptions } from "@/lib/opportunity-detection-service"

interface OpportunityFiltersProps {
  onFilterChange: (filters: OpportunityDetectionOptions) => void
  isLoading?: boolean
}

export function OpportunityFilters({ onFilterChange, isLoading = false }: OpportunityFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [industry, setIndustry] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [minRelevanceScore, setMinRelevanceScore] = useState(50)
  const [excludeConnected, setExcludeConnected] = useState(true)
  const [includeSecondDegree, setIncludeSecondDegree] = useState(true)
  const [includeThirdDegree, setIncludeThirdDegree] = useState(true)
  const [sortBy, setSortBy] = useState<"relevance" | "recent" | "mutual">("relevance")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const applyFilters = () => {
    // Construire les filtres actifs pour l'affichage
    const newActiveFilters: string[] = []

    if (searchQuery) newActiveFilters.push(`Recherche: ${searchQuery}`)
    if (industry) newActiveFilters.push(`Secteur: ${industry}`)
    if (role) newActiveFilters.push(`Poste: ${role}`)
    if (company) newActiveFilters.push(`Entreprise: ${company}`)
    if (location) newActiveFilters.push(`Localisation: ${location}`)
    if (minRelevanceScore > 50) newActiveFilters.push(`Score min: ${minRelevanceScore}`)
    if (sortBy !== "relevance") {
      newActiveFilters.push(`Tri: ${sortBy === "recent" ? "Plus récents" : "Plus de connexions"}`)
    }

    setActiveFilters(newActiveFilters)

    // Construire les options de filtrage
    const filterOptions: OpportunityDetectionOptions = {
      minRelevanceScore,
      excludeConnected,
      includeSecondDegree,
      includeThirdDegree,
      sortBy,
    }

    // Ajouter les filtres textuels s'ils sont définis
    if (industry) filterOptions.industries = [industry]
    if (role) filterOptions.roles = [role]
    if (company) filterOptions.companies = [company]

    // Ajouter les mots-clés de recherche
    if (searchQuery) filterOptions.keywords = searchQuery.split(" ").filter((k) => k.length > 0)

    // Appliquer les filtres
    onFilterChange(filterOptions)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setIndustry("")
    setRole("")
    setCompany("")
    setLocation("")
    setMinRelevanceScore(50)
    setExcludeConnected(true)
    setIncludeSecondDegree(true)
    setIncludeThirdDegree(true)
    setSortBy("relevance")
    setActiveFilters([])

    onFilterChange({
      minRelevanceScore: 50,
      excludeConnected: true,
      includeSecondDegree: true,
      includeThirdDegree: true,
      sortBy: "relevance",
    })
  }

  const removeFilter = (filter: string) => {
    // Extraire le type et la valeur du filtre
    const [type, ...valueParts] = filter.split(": ")
    const value = valueParts.join(": ")

    // Réinitialiser le filtre correspondant
    switch (type) {
      case "Recherche":
        setSearchQuery("")
        break
      case "Secteur":
        setIndustry("")
        break
      case "Poste":
        setRole("")
        break
      case "Entreprise":
        setCompany("")
        break
      case "Localisation":
        setLocation("")
        break
      case "Score min":
        setMinRelevanceScore(50)
        break
      case "Tri":
        setSortBy("relevance")
        break
    }

    // Mettre à jour les filtres actifs
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Réappliquer les filtres
    applyFilters()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, entreprise ou poste"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Développement logiciel">Développement logiciel</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Ressources humaines">Ressources humaines</SelectItem>
                  <SelectItem value="Vente">Vente</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Poste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Directeur">Directeur</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Développeur">Développeur</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Consultant">Consultant</SelectItem>
                  <SelectItem value="Responsable">Responsable</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Lyon">Lyon</SelectItem>
                  <SelectItem value="Marseille">Marseille</SelectItem>
                  <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                  <SelectItem value="Télétravail">Télétravail</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("advanced-filters")?.click()}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtres avancés</span>
              </Button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="gap-1 pl-2">
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Supprimer le filtre</span>
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetFilters}>
                Réinitialiser tous les filtres
              </Button>
            </div>
          )}

          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="advanced-filters" className="border-b-0">
              <AccordionTrigger id="advanced-filters" className="py-2">
                Filtres avancés
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 py-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Score de pertinence minimum</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[minRelevanceScore]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setMinRelevanceScore(value[0])}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8 text-right">{minRelevanceScore}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Entreprise spécifique</label>
                    <Input
                      placeholder="Nom de l'entreprise"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trier par</label>
                      <Select
                        value={sortBy}
                        onValueChange={(value: "relevance" | "recent" | "mutual") => setSortBy(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Méthode de tri" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Pertinence</SelectItem>
                          <SelectItem value="recent">Plus récents</SelectItem>
                          <SelectItem value="mutual">Plus de connexions communes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Exclure mes connexions</label>
                        <Switch checked={excludeConnected} onCheckedChange={setExcludeConnected} />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Inclure 2ème degré</label>
                        <Switch checked={includeSecondDegree} onCheckedChange={setIncludeSecondDegree} />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Inclure 3ème degré</label>
                        <Switch checked={includeThirdDegree} onCheckedChange={setIncludeThirdDegree} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={resetFilters}>
                    Réinitialiser
                  </Button>
                  <Button onClick={applyFilters} disabled={isLoading}>
                    {isLoading ? "Chargement..." : "Appliquer les filtres"}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
