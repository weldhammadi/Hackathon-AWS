"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Search, Bell, BellOff } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function JobsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("q") || "")
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set("q", search)
    } else {
      params.delete("q")
    }
    router.push(`/jobs?${params.toString()}`)
  }

  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled)
    // Dans une application réelle, vous enregistreriez cette préférence dans la base de données
  }

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Offres d'emploi
        </h1>
        <p className="text-muted-foreground">Découvrez et postulez aux offres d'emploi correspondant à votre profil</p>
      </header>

      <Card className="mb-6">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, entreprise ou compétence"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit">Rechercher</Button>
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center space-x-2">
                <Switch id="job-alerts" checked={alertsEnabled} onCheckedChange={toggleAlerts} />
                <Label htmlFor="job-alerts" className="flex items-center gap-1.5">
                  {alertsEnabled ? (
                    <Bell className="h-4 w-4 text-primary" />
                  ) : (
                    <BellOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="hidden md:inline">Alertes</span>
                </Label>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
