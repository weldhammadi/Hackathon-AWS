import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { JobDetail } from "@/components/job-detail"
import { JobApplicationForm } from "@/components/job-application-form"
import { SimilarJobs } from "@/components/similar-jobs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getJobById } from "@/lib/jobs-service"
import { JobDetailLoading } from "./loading"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  // Dans un environnement réel, cette fonction récupérerait les données depuis l'API ou MongoDB
  const job = await getJobById(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <Link href="/jobs">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour aux offres
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<JobDetailLoading />}>
              <JobDetail job={job} />
            </Suspense>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <JobApplicationForm jobId={params.id} />
            <SimilarJobs currentJobId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
