import { Suspense } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { JobsHeader } from "@/components/jobs-header"
import { JobsList } from "@/components/jobs-list"
import { JobsFilters } from "@/components/jobs-filters"
import { JobsLoading } from "./loading"

export const metadata = {
  title: "Offres d'emploi | LinkedBoost",
  description: "Découvrez et postulez aux offres d'emploi correspondant à votre profil",
}

export default function JobsPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F2EF]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">
        <JobsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1">
            <JobsFilters />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<JobsLoading />}>
              <JobsList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
