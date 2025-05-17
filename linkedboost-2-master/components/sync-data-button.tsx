"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SyncDataButtonProps {
  type: "users" | "connections" | "opportunities"
  userId?: string
  filters?: any
  onSuccess?: (result: any) => void
}

export function SyncDataButton({ type, userId, filters, onSuccess }: SyncDataButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSync = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          userId,
          filters,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Échec de la synchronisation")
      }

      toast({
        title: "Synchronisation réussie",
        description: `${result.count} éléments synchronisés.`,
        variant: "default",
      })

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation:", error)

      toast({
        title: "Erreur de synchronisation",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSync} disabled={isLoading} variant="outline" className="gap-2">
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Synchronisation...</span>
        </>
      ) : (
        <>
          <RefreshCw className="h-4 w-4" />
          <span>
            Synchroniser les{" "}
            {type === "users" ? "utilisateurs" : type === "connections" ? "connexions" : "opportunités"}
          </span>
        </>
      )}
    </Button>
  )
}
