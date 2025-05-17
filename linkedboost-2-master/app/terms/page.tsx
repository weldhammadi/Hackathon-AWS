import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="LinkedBoost" width={36} height={36} />
            <span className="text-xl font-bold">LinkedBoost</span>
          </div>
          <Link href="/">
            <Button variant="ghost">Retour à l'accueil</Button>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>

          <div className="prose prose-slate max-w-none">
            <p>Dernière mise à jour : 16 mai 2025</p>

            <h2>1. Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant LinkedBoost, vous acceptez d'être lié par ces conditions d'utilisation, toutes
              les lois et réglementations applicables, et vous acceptez que vous êtes responsable du respect des lois
              locales applicables. Si vous n'acceptez pas l'une de ces conditions, vous n'êtes pas autorisé à utiliser
              ou à accéder à ce site.
            </p>

            <h2>2. Utilisation de la licence</h2>
            <p>
              La permission est accordée de télécharger temporairement une copie des documents sur le site de
              LinkedBoost pour un affichage transitoire personnel et non commercial uniquement. Il s'agit de l'octroi
              d'une licence, et non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :
            </p>
            <ul>
              <li>modifier ou copier les documents ;</li>
              <li>utiliser les documents à des fins commerciales ou pour toute présentation publique ;</li>
              <li>tenter de décompiler ou de désossiérer tout logiciel contenu sur le site de LinkedBoost ;</li>
              <li>supprimer tout droit d'auteur ou autres notations de propriété des documents ; ou</li>
              <li>transférer les documents à une autre personne ou "refléter" les documents sur tout autre serveur.</li>
            </ul>

            <h2>3. Clause de non-responsabilité</h2>
            <p>
              Les documents sur le site de LinkedBoost sont fournis "tels quels". LinkedBoost ne donne aucune garantie,
              expresse ou implicite, et décline et nie par la présente toutes les autres garanties, y compris, sans
              limitation, les garanties implicites ou les conditions de qualité marchande, d'adéquation à un usage
              particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.
            </p>

            <h2>4. Limitations</h2>
            <p>
              En aucun cas, LinkedBoost ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans
              limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité)
              découlant de l'utilisation ou de l'incapacité d'utiliser les matériaux sur le site de LinkedBoost, même si
              LinkedBoost ou un représentant autorisé de LinkedBoost a été informé oralement ou par écrit de la
              possibilité de tels dommages.
            </p>

            <h2>5. Révisions et errata</h2>
            <p>
              Les documents apparaissant sur le site de LinkedBoost peuvent inclure des erreurs techniques,
              typographiques ou photographiques. LinkedBoost ne garantit pas que l'un des documents sur son site Web est
              exact, complet ou à jour. LinkedBoost peut apporter des modifications aux documents contenus sur son site
              Web à tout moment sans préavis.
            </p>

            <h2>6. Liens</h2>
            <p>
              LinkedBoost n'a pas examiné tous les sites liés à son site Internet et n'est pas responsable du contenu de
              ces sites liés. L'inclusion de tout lien n'implique pas l'approbation par LinkedBoost du site.
              L'utilisation de tout site Web lié est aux risques et périls de l'utilisateur.
            </p>

            <h2>7. Modifications des conditions d'utilisation</h2>
            <p>
              LinkedBoost peut réviser ces conditions d'utilisation de son site Web à tout moment sans préavis. En
              utilisant ce site Web, vous acceptez d'être lié par la version actuelle de ces conditions d'utilisation.
            </p>

            <h2>8. Loi applicable</h2>
            <p>
              Toute réclamation relative au site de LinkedBoost sera régie par les lois de la France sans égard à ses
              dispositions en matière de conflit de lois.
            </p>

            <h2>9. Confidentialité</h2>
            <p>
              Votre utilisation de notre site est également régie par notre politique de confidentialité, qui est
              incorporée ici par référence.
            </p>

            <h2>10. Contact</h2>
            <p>
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à
              contact@linkedboost.app.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="LinkedBoost" width={28} height={28} />
              <span className="text-lg font-bold">LinkedBoost</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LinkedBoost. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
