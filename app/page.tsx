"use client"

import { useState } from "react"
import { TopNav } from "@/components/dashboard/top-nav"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ProjectForm } from "@/components/dashboard/project-form"

export default function Page() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="min-h-screen bg-background">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === "Overview" && <DashboardOverview />}
        {activeTab === "Companies" && <ProjectForm />}
        {activeTab === "Analytics" && (
          <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground text-sm">
            Analytics view coming soon
          </div>
        )}
        {activeTab === "Documents" && (
          <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground text-sm">
            Documents view coming soon
          </div>
        )}
      </main>
    </div>
  )
}
