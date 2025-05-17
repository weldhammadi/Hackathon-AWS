import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export function APIPermissionsList() {
  const permissions = [
    {
      name: "r_liteprofile",
      description: "Accès au profil de base",
      granted: true,
      required: true,
    },
    {
      name: "r_emailaddress",
      description: "Accès à l'adresse e-mail",
      granted: true,
      required: true,
    },
    {
      name: "w_member_social",
      description: "Création de publications et interactions",
      granted: true,
      required: true,
    },
    {
      name: "r_network",
      description: "Accès aux connexions",
      granted: true,
      required: true,
    },
    {
      name: "rw_organization_admin",
      description: "Gestion des pages d'entreprise",
      granted: false,
      required: false,
    },
    {
      name: "w_messages",
      description: "Envoi de messages",
      granted: false,
      required: true,
    },
  ]

  return (
    <div className="space-y-3">
      {permissions.map((permission) => (
        <div
          key={permission.name}
          className={`flex items-center justify-between p-3 rounded-lg border ${
            permission.granted ? "bg-muted/30" : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {permission.granted ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium">{permission.name}</span>
                {permission.required && (
                  <Badge variant="outline" className="text-xs">
                    Requis
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{permission.description}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={
              permission.granted
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }
          >
            {permission.granted ? "Accordé" : "Non accordé"}
          </Badge>
        </div>
      ))}
    </div>
  )
}
