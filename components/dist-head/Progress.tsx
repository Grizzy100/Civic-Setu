import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { MapCard } from "@/components/ui/map-card";

export default function Progress() {
  return (
    <DashboardLayout>
      <div className="p-8 grid grid-cols-3 grid-rows-[auto_1fr_auto] gap-8">
        <PageHeader 
          title="Progress"
          description="Track the progress of ongoing civic projects"
        />
        
        <MapCard
          title="San Francisco District Report"
          location="Pothole on Market Street"
          department="Public Works"
          handler="Jane Doe"
          backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuB_P0r1pLz-f7u9K0FDAQUKsXOYth0uRR8qdYLCZ16vmnDJLgvjr-PVpKlEdtRr9R-DWIMNZ7xvjRek0UwYxreJS_giuFPlfdJK5iT_sQKPafYNNLB35P_12wmD6GIui9IPRZEQVCFFm6G3C2b4_5gqDdZbc2tr9EyRIWh6NdcEZ7JvUTtwlvgEm216xPS_OsVAWV7BPamrn41HRVXDC4UD3h6-kEJsWgZ0wovof6HswX3XB5l6FM9EKuSz9L6m7_MSxAuaGYnFnR8"
        />
        
        <div className="col-span-3 relative bg-surface-glass glass-effect border border-white/20 p-6 rounded-2xl shadow-lg">
          <button className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h3 className="text-2xl font-bold text-text-primary mb-4">Project Progress Overview</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path 
                  className="text-gray-200" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="text-brand-orange" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeDasharray="68, 100" 
                  strokeLinecap="round" 
                  strokeWidth="4"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-bold text-text-primary">68%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h4 className="font-semibold text-text-secondary">Active Projects</h4>
                <p className="text-2xl font-bold text-text-primary">248</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-secondary">On Track</h4>
                <p className="text-2xl font-bold text-status-success">168</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-secondary">Delayed</h4>
                <p className="text-2xl font-bold text-status-warning">52</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-secondary">At Risk</h4>
                <p className="text-2xl font-bold text-status-error">28</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}