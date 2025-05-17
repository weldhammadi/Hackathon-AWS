"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, MessageSquare, ThumbsUp, Users } from "lucide-react"

export function AutomationCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Exemple de données d'automatisation pour le calendrier
  const automationDates = [
    {
      date: new Date(2025, 4, 15),
      automations: [
        { type: "Messages", count: 3 },
        { type: "Engagement", count: 1 },
      ],
    },
    {
      date: new Date(2025, 4, 16),
      automations: [
        { type: "Connexions", count: 2 },
        { type: "Messages", count: 1 },
      ],
    },
    {
      date: new Date(2025, 4, 17),
      automations: [{ type: "Engagement", count: 2 }],
    },
    {
      date: new Date(2025, 4, 18),
      automations: [{ type: "Contenu", count: 1 }],
    },
    {
      date: new Date(2025, 4, 20),
      automations: [
        { type: "Messages", count: 2 },
        { type: "Connexions", count: 1 },
      ],
    },
    {
      date: new Date(2025, 4, 22),
      automations: [
        { type: "Engagement", count: 1 },
        { type: "Messages", count: 1 },
      ],
    },
    {
      date: new Date(2025, 4, 24),
      automations: [{ type: "Contenu", count: 1 }],
    },
    {
      date: new Date(2025, 4, 25),
      automations: [
        { type: "Messages", count: 2 },
        { type: "Connexions", count: 1 },
      ],
    },
    {
      date: new Date(2025, 4, 27),
      automations: [{ type: "Engagement", count: 3 }],
    },
    {
      date: new Date(2025, 4, 29),
      automations: [
        { type: "Messages", count: 1 },
        { type: "Contenu", count: 1 },
      ],
    },
  ]

  // Fonction pour vérifier si une date a des automatisations
  const hasAutomations = (day: Date) => {
    return automationDates.some(
      (item) =>
        item.date.getDate() === day.getDate() &&
        item.date.getMonth() === day.getMonth() &&
        item.date.getFullYear() === day.getFullYear(),
    )
  }

  // Fonction pour obtenir les automatisations d'une date spécifique
  const getAutomationsForDate = (day: Date) => {
    return (
      automationDates.find(
        (item) =>
          item.date.getDate() === day.getDate() &&
          item.date.getMonth() === day.getMonth() &&
          item.date.getFullYear() === day.getFullYear(),
      )?.automations || []
    )
  }

  // Fonction pour rendre les automatisations du jour sélectionné
  const renderSelectedDateAutomations = () => {
    if (!date) return null

    const automations = getAutomationsForDate(date)

    if (automations.length === 0) {
      return (
        <div className="text-center py-4 text-muted-foreground">Aucune automatisation planifiée pour cette date</div>
      )
    }

    return (
      <div className="space-y-3">
        {automations.map((automation, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                automation.type === "Messages"
                  ? "bg-blue-100"
                  : automation.type === "Engagement"
                    ? "bg-green-100"
                    : automation.type === "Connexions"
                      ? "bg-purple-100"
                      : "bg-amber-100"
              }`}
            >
              {automation.type === "Messages" ? (
                <MessageSquare className="h-4 w-4 text-blue-600" />
              ) : automation.type === "Engagement" ? (
                <ThumbsUp className="h-4 w-4 text-green-600" />
              ) : automation.type === "Connexions" ? (
                <Users className="h-4 w-4 text-purple-600" />
              ) : (
                <Edit className="h-4 w-4 text-amber-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {automation.type === "Messages"
                  ? "Envoi de messages"
                  : automation.type === "Engagement"
                    ? "Interactions avec le réseau"
                    : automation.type === "Connexions"
                      ? "Demandes de connexion"
                      : "Publication de contenu"}
              </p>
              <p className="text-xs text-muted-foreground">
                {automation.count} {automation.count > 1 ? "actions" : "action"} planifiée
                {automation.count > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-7">
      <div className="md:col-span-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              const automations = getAutomationsForDate(props.date)
              return (
                <div className="relative h-full w-full p-2">
                  <div className="absolute top-0 right-0 left-0 flex justify-center">{props.date.getDate()}</div>
                  {automations.length > 0 && (
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                      {automations.map((automation, index) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full ${
                            automation.type === "Messages"
                              ? "bg-blue-500"
                              : automation.type === "Engagement"
                                ? "bg-green-500"
                                : automation.type === "Connexions"
                                  ? "bg-purple-500"
                                  : "bg-amber-500"
                          }`}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              )
            },
          }}
        />
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="font-medium">
                {date
                  ? new Intl.DateTimeFormat("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(date)
                  : "Sélectionnez une date"}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Messages
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Interactions
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  <Users className="h-3 w-3 mr-1" />
                  Connexions
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  <Edit className="h-3 w-3 mr-1" />
                  Contenu
                </Badge>
              </div>
            </div>
            {renderSelectedDateAutomations()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
