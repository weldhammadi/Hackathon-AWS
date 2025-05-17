export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  companyWebsite?: string
  companyDescription?: string
  location: string
  type: string
  salary?: string
  description: string
  responsibilities?: string[]
  requirements?: string[]
  niceToHave?: string[]
  benefits?: string[]
  experienceLevel: string
  education?: string
  languages?: string[]
  remote: boolean
  urgent: boolean
  postedAt: string
  startDate?: string
  applicationDeadline?: string
  views: number
  applications: number
}

// Données fictives pour simuler une API
const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Développeur Frontend React",
    company: "TechVision",
    companyLogo: "/abstract-tech-logo.png",
    companyWebsite: "https://example.com",
    companyDescription:
      "TechVision est une entreprise innovante spécialisée dans le développement de solutions web et mobiles pour les entreprises de toutes tailles.",
    location: "Paris",
    type: "CDI",
    salary: "45 000€ - 60 000€",
    description:
      "Nous recherchons un développeur Frontend React passionné pour rejoindre notre équipe et participer au développement de nos applications web.",
    responsibilities: [
      "Développer des interfaces utilisateur réactives et intuitives",
      "Collaborer avec les designers UX/UI pour implémenter les maquettes",
      "Participer à l'amélioration continue de nos produits",
      "Assurer la maintenance et le debugging des applications existantes",
    ],
    requirements: [
      "3+ ans d'expérience en développement frontend",
      "Maîtrise de React, TypeScript et des hooks",
      "Expérience avec Next.js et les API RESTful",
      "Connaissance des bonnes pratiques en matière d'accessibilité web",
    ],
    niceToHave: [
      "Expérience avec les tests unitaires et d'intégration",
      "Connaissance de GraphQL",
      "Expérience avec les animations CSS et les transitions",
    ],
    benefits: [
      "Télétravail partiel",
      "Horaires flexibles",
      "Formation continue",
      "Mutuelle d'entreprise",
      "Tickets restaurant",
      "Participation aux bénéfices",
    ],
    experienceLevel: "3-5 ans",
    education: "Bac+3 minimum",
    languages: ["Français", "Anglais"],
    remote: true,
    urgent: false,
    postedAt: "il y a 2 jours",
    startDate: "Dès que possible",
    applicationDeadline: "30/06/2025",
    views: 245,
    applications: 18,
  },
  {
    id: "job-2",
    title: "Data Scientist",
    company: "DataInsight",
    companyLogo: "/data-company-logo.png",
    companyDescription:
      "DataInsight est une entreprise spécialisée dans l'analyse de données et l'intelligence artificielle, aidant les entreprises à prendre des décisions basées sur les données.",
    location: "Lyon",
    type: "CDI",
    salary: "50 000€ - 70 000€",
    description:
      "Nous recherchons un Data Scientist expérimenté pour rejoindre notre équipe et travailler sur des projets d'analyse de données et de machine learning.",
    responsibilities: [
      "Analyser et interpréter des ensembles de données complexes",
      "Développer des modèles de machine learning",
      "Collaborer avec les équipes produit pour intégrer les modèles",
      "Présenter les résultats aux parties prenantes",
    ],
    requirements: [
      "Master ou Doctorat en Data Science, Statistiques ou domaine connexe",
      "Expérience en Python et bibliothèques de data science (Pandas, NumPy, Scikit-learn)",
      "Connaissance des algorithmes de machine learning",
      "Expérience avec les bases de données SQL et NoSQL",
    ],
    experienceLevel: "2-4 ans",
    remote: false,
    urgent: true,
    postedAt: "il y a 5 jours",
    views: 189,
    applications: 12,
  },
  {
    id: "job-3",
    title: "Chef de Projet Digital",
    company: "AgenceWeb",
    companyLogo: "/digital-agency-logo.png",
    location: "Bordeaux",
    type: "CDI",
    description:
      "Nous recherchons un Chef de Projet Digital pour gérer nos projets web et coordonner les équipes de développement et de design.",
    experienceLevel: "5+ ans",
    remote: true,
    urgent: false,
    postedAt: "il y a 1 semaine",
    views: 156,
    applications: 9,
  },
  {
    id: "job-4",
    title: "Développeur Backend Node.js",
    company: "StartupInno",
    companyLogo: "/abstract-startup-logo.png",
    location: "Lille",
    type: "CDD",
    salary: "40 000€ - 55 000€",
    description:
      "Rejoignez notre startup en pleine croissance en tant que développeur backend Node.js pour contribuer au développement de notre API.",
    experienceLevel: "2-3 ans",
    remote: true,
    urgent: true,
    postedAt: "il y a 3 jours",
    views: 210,
    applications: 15,
  },
  {
    id: "job-5",
    title: "UX/UI Designer",
    company: "DesignStudio",
    companyLogo: "/design-studio-logo.png",
    location: "Paris",
    type: "Freelance",
    description:
      "Nous recherchons un designer UX/UI talentueux pour travailler sur des projets variés pour nos clients dans différents secteurs.",
    experienceLevel: "3+ ans",
    remote: false,
    urgent: false,
    postedAt: "il y a 2 semaines",
    views: 98,
    applications: 7,
  },
  {
    id: "job-6",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyLogo: "/cloud-company-logo.png",
    location: "Télétravail",
    type: "CDI",
    salary: "55 000€ - 75 000€",
    description:
      "Nous recherchons un ingénieur DevOps pour gérer notre infrastructure cloud et améliorer nos processus de déploiement continu.",
    experienceLevel: "4-6 ans",
    remote: true,
    urgent: false,
    postedAt: "il y a 4 jours",
    views: 132,
    applications: 6,
  },
  {
    id: "job-7",
    title: "Product Manager",
    company: "ProductLab",
    companyLogo: "/generic-product-logo.png",
    location: "Marseille",
    type: "CDI",
    description:
      "Rejoignez notre équipe en tant que Product Manager pour définir la vision produit et coordonner son développement.",
    experienceLevel: "5+ ans",
    remote: false,
    urgent: false,
    postedAt: "il y a 1 semaine",
    views: 145,
    applications: 11,
  },
  {
    id: "job-8",
    title: "Développeur Mobile React Native",
    company: "MobileApps",
    companyLogo: "/mobile-app-logo.png",
    location: "Lyon",
    type: "CDI",
    salary: "45 000€ - 60 000€",
    description:
      "Nous recherchons un développeur mobile React Native pour créer des applications mobiles performantes et intuitives.",
    experienceLevel: "2-4 ans",
    remote: true,
    urgent: true,
    postedAt: "il y a 6 jours",
    views: 178,
    applications: 14,
  },
]

// Fonction pour récupérer toutes les offres d'emploi avec filtres
export async function getJobs(searchParams?: { [key: string]: string | string[] | undefined }): Promise<Job[]> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredJobs = [...mockJobs]

  if (searchParams) {
    // Filtrer par recherche
    const q = searchParams.q as string
    if (q) {
      const searchLower = q.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      )
    }

    // Filtrer par type de contrat
    const types = searchParams.types as string
    if (types) {
      const typesList = types.split(",")
      filteredJobs = filteredJobs.filter((job) => typesList.includes(job.type.toLowerCase()))
    }

    // Filtrer par localisation
    const locations = searchParams.locations as string
    if (locations) {
      const locationsList = locations.split(",")
      filteredJobs = filteredJobs.filter((job) => {
        const jobLocation = job.location.toLowerCase()
        return locationsList.some((loc) => jobLocation.includes(loc.toLowerCase()))
      })
    }

    // Filtrer par expérience
    const experience = searchParams.experience as string
    if (experience) {
      const [min, max] = experience.split(",").map(Number)
      filteredJobs = filteredJobs.filter((job) => {
        const expMatch = job.experienceLevel.match(/(\d+)[-+](\d+)?/)
        if (expMatch) {
          const jobMinExp = Number.parseInt(expMatch[1])
          const jobMaxExp = expMatch[2] ? Number.parseInt(expMatch[2]) : jobMinExp + 2
          return jobMinExp >= min && jobMaxExp <= max
        }
        return true
      })
    }
  }

  return filteredJobs
}

// Fonction pour récupérer une offre d'emploi par ID
export async function getJobById(id: string): Promise<Job | null> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 300))

  const job = mockJobs.find((job) => job.id === id)
  return job || null
}

// Fonction pour récupérer des offres similaires
export async function getSimilarJobs(currentJobId: string): Promise<Job[]> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 400))

  const currentJob = mockJobs.find((job) => job.id === currentJobId)
  if (!currentJob) return []

  // Trouver des offres similaires basées sur le titre, la localisation ou le type
  return mockJobs
    .filter((job) => job.id !== currentJobId)
    .filter(
      (job) =>
        job.title.includes(currentJob.title.split(" ")[0]) ||
        job.location === currentJob.location ||
        job.type === currentJob.type,
    )
    .slice(0, 3)
}
