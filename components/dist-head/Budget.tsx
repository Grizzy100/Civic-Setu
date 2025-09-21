import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { MapCard } from "@/components/ui/map-card";

export default function Budget() {
  return (
    <DashboardLayout>
      <div className="p-8 grid grid-cols-3 grid-rows-[auto_1fr_auto] gap-8">
        <PageHeader 
          title="Budget"
          description="Track and manage departmental budgets"
        />
        
        <MapCard
          title="San Francisco Report"
          location="Pothole on Mission St"
          department="Public Works"
          handler="Jane Doe"
          backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAH8bfA7aXWuxa1fvjP-eavD1290lvRtWkHFxMAzH1_02raCcA3xzASDyPb9AT9v8HlFjHWaXkxuNzpjL0yvowcGi1GTYzdtLDrgBb3YvDSjqhdYh5LzpkCeLp7TtxVmRgZrKO5Kqhua15YqdvIumRcJMw18yzmEr_1g3usWKrhEr7bIwVeg2CSaCKEzJo3Dh11rh4W0EODw8FFpDkYV5dm3xbxPWXiyyoYTZEQkJvu6EMUrvqV5a4M18cKCz6992GcXWFlqKRcoG4"
        />
        
        <div className="col-span-3 bg-background-alt p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Budget Tracker</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-secondary mb-2">Total Budget</h4>
              <p className="text-3xl font-bold text-status-success">$5,000,000</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-secondary mb-2">Spent</h4>
              <p className="text-3xl font-bold text-status-error">$1,257,500</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-status-success h-4 rounded-full" style={{ width: '25.15%' }}></div>
            </div>
            <p className="text-right text-sm text-text-muted mt-1">25.15% used</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}