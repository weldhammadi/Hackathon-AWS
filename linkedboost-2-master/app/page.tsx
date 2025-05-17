import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, MessageSquare, Search, UserCheck, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="LinkedBoost" width={36} height={36} />
            <span className="text-xl font-bold">LinkedBoost</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Fonctionnalités
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Témoignages
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Tarifs
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Se connecter
            </Link>
            <Button asChild>
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-[#F3F2EF] py-20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Boostez votre networking LinkedIn <span className="text-primary">avec l'IA</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              LinkedBoost aide les introvertis et professionnels à générer des messages personnalisés, optimiser leur
              profil, trouver des opportunités de networking et automatiser leurs actions LinkedIn.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#0077B5] hover:bg-[#005885]">
                Commencer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Voir une démo
              </Button>
            </div>
            <div className="mt-16 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0077B5] to-[#36B37E] opacity-30 blur-xl rounded-xl"></div>
              <Image
                src="/dashboard-preview.png"
                alt="LinkedBoost Dashboard"
                width={1200}
                height={675}
                className="relative rounded-xl border shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Fonctionnalités principales</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Des outils puissants pour optimiser votre présence sur LinkedIn et développer votre réseau
                professionnel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-[#0077B5]" />
                  </div>
                  <CardTitle>Messages personnalisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Générez des messages d'accroche et de suivi personnalisés qui obtiennent des réponses.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Search className="h-6 w-6 text-[#36B37E]" />
                  </div>
                  <CardTitle>Scanner d'opportunités</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Identifiez les contacts stratégiques et opportunités de networking pertinentes pour votre carrière.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                    <UserCheck className="h-6 w-6 text-[#0077B5]" />
                  </div>
                  <CardTitle>Optimisation de profil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Améliorez votre profil LinkedIn avec des suggestions basées sur l'IA pour maximiser votre
                    visibilité.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-[#36B37E]" />
                  </div>
                  <CardTitle>Automatisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Planifiez et automatisez vos actions LinkedIn pour maintenir une présence constante et efficace.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[#F3F2EF]">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ce que nos utilisateurs disent</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Découvrez comment LinkedBoost a aidé des professionnels à développer leur réseau.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/professional-woman-portrait.png"
                      alt="Sophie Martin"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Sophie Martin</CardTitle>
                      <CardDescription>Consultante Marketing Digital</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Grâce à LinkedBoost, j'ai pu tripler mon taux de réponse aux messages de prospection. Les messages
                    générés sont pertinents et personnalisés, ce qui fait toute la différence."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-[#36B37E]">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Utilisatrice vérifiée</span>
                  </div>
                </CardFooter>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/professional-man-portrait.png"
                      alt="Thomas Dubois"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Thomas Dubois</CardTitle>
                      <CardDescription>Développeur Freelance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "En tant qu'introverti, le networking a toujours été un défi. LinkedBoost m'a aidé à trouver les
                    bons contacts et à engager des conversations pertinentes sans stress."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-[#36B37E]">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Utilisateur vérifié</span>
                  </div>
                </CardFooter>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/professional-woman-glasses.png"
                      alt="Camille Leroy"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Camille Leroy</CardTitle>
                      <CardDescription>Responsable RH</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "L'outil d'optimisation de profil a complètement transformé ma présence sur LinkedIn. J'ai reçu plus
                    de 200% de visites sur mon profil en seulement un mois."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-[#36B37E]">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Utilisatrice vérifiée</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#0077B5] to-[#36B37E] text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à transformer votre networking LinkedIn?
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
              Rejoignez des milliers de professionnels qui utilisent LinkedBoost pour développer leur réseau et booster
              leur carrière.
            </p>
            <Button size="lg" variant="secondary" className="mt-10">
              Commencer gratuitement
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="LinkedBoost" width={28} height={28} />
                <span className="text-lg font-bold">LinkedBoost</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Boostez votre networking LinkedIn avec l'intelligence artificielle.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LinkedBoost. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
