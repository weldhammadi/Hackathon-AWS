import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Briefcase, Building, Filter, MapPin, MessageSquare, Search, Users, X } from "lucide-react"

export default function OpportunitiesPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Opportunités de networking</h1>
          <p className="text-muted-foreground">
            Découvrez des contacts pertinents pour développer votre réseau professionnel
          </p>
        </header>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher par nom, entreprise ou poste" className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technologie</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="healthcare">Santé</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Poste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="director">Directeur</SelectItem>
                    <SelectItem value="developer">Développeur</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                    <SelectItem value="remote">Télétravail</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filtres avancés</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="recommended">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="recommended">Recommandés</TabsTrigger>
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="saved">Sauvegardés</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">42 contacts trouvés</div>
          </div>

          <TabsContent value="recommended" className="space-y-4">
            {[
              {
                name: "Alexandre Martin",
                role: "Directeur Marketing",
                company: "TechVision",
                location: "Paris, France",
                mutual: 12,
                relevance: "Très pertinent",
                relevanceScore: 95,
                skills: ["Marketing Digital", "SEO", "Stratégie de contenu"],
                about: "Plus de 10 ans d'expérience en marketing digital et stratégie de contenu.",
              },
              {
                name: "Julie Lefebvre",
                role: "Product Manager",
                company: "InnoSoft",
                location: "Lyon, France",
                mutual: 8,
                relevance: "Pertinent",
                relevanceScore: 82,
                skills: ["Gestion de produit", "UX/UI", "Agile"],
                about: "Spécialiste en développement de produits SaaS et méthodologies agiles.",
              },
              {
                name: "Thomas Bernard",
                role: "Développeur Senior",
                company: "DataTech",
                location: "Télétravail",
                mutual: 5,
                relevance: "Pertinent",
                relevanceScore: 78,
                skills: ["React", "Node.js", "AWS"],
                about: "Développeur full-stack avec expertise en architecture cloud et applications web.",
              },
              {
                name: "Sophie Moreau",
                role: "Responsable RH",
                company: "GlobalCorp",
                location: "Marseille, France",
                mutual: 3,
                relevance: "Moyennement pertinent",
                relevanceScore: 65,
                skills: ["Recrutement", "Gestion des talents", "Formation"],
                about: "Spécialiste RH avec focus sur le développement des talents et la culture d'entreprise.",
              },
              {
                name: "Pierre Dubois",
                role: "Consultant Business",
                company: "StratConsult",
                location: "Paris, France",
                mutual: 7,
                relevance: "Pertinent",
                relevanceScore: 80,
                skills: ["Stratégie d'entreprise", "Analyse financière", "Développement commercial"],
                about: "Consultant en stratégie d'entreprise avec expérience dans divers secteurs.",
              },
            ].map((contact, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-64 h-40 md:h-auto bg-gradient-to-r from-[#0077B5]/10 to-[#36B37E]/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={`/placeholder-xyxcs.png?height=100&width=100&query=portrait of professional person ${i + 1}`}
                          alt={contact.name}
                          width={100}
                          height={100}
                          className="rounded-full border-4 border-white"
                        />
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{contact.name}</h3>
                          <p className="text-muted-foreground">{contact.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                            <Users className="h-3 w-3 mr-1" />
                            {contact.mutual} relations
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                            {contact.relevance}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">{contact.about}</p>
                        <div className="flex flex-wrap gap-1">
                          {contact.skills.map((skill, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm" className="gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>Se connecter</span>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Message</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Ignorer</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Detail Sheet - This would be shown when clicking on a contact */}
      <Sheet>
        <SheetContent className="w-full sm:max-w-md overflow-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Profil détaillé</SheetTitle>
            <SheetDescription>Informations complètes sur le contact</SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Image
                  src="/professional-man-portrait.png"
                  alt="Alexandre Martin"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Alexandre Martin</h3>
              <p className="text-muted-foreground">Directeur Marketing</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/10">
                  <Users className="h-3 w-3 mr-1" />
                  12 relations
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">TechVision</p>
                  <p className="text-sm text-muted-foreground">2018 - Présent · 5 ans</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Paris, France</p>
                  <p className="text-sm text-muted-foreground">Région Île-de-France</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Expérience</p>
                  <p className="text-sm text-muted-foreground">Plus de 10 ans en marketing</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">À propos</h4>
              <p className="text-sm text-muted-foreground">
                Plus de 10 ans d'expérience en marketing digital et stratégie de contenu. Spécialiste en acquisition
                client et fidélisation. Passionné par l'innovation et les nouvelles technologies.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Compétences</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Marketing Digital</Badge>
                <Badge variant="secondary">SEO</Badge>
                <Badge variant="secondary">Stratégie de contenu</Badge>
                <Badge variant="secondary">Acquisition client</Badge>
                <Badge variant="secondary">Analytics</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Relations communes</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Image
                      src={`/placeholder-xyxcs.png?height=40&width=40&query=portrait of professional person ${i}`}
                      alt={`Relation ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">Nom de la relation {i}</p>
                      <p className="text-xs text-muted-foreground">Poste · Entreprise</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button className="w-full gap-2">
                <Users className="h-4 w-4" />
                <span>Se connecter</span>
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Envoyer un message</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
