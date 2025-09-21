import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <PageHeader 
          title="Analytics"
          description="Insights and data analysis for civic operations"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <span className="material-symbols-outlined text-text-muted">description</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,547</div>
              <p className="text-xs text-text-muted">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
              <span className="material-symbols-outlined text-status-success">check_circle</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,847</div>
              <p className="text-xs text-text-muted">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
              <span className="material-symbols-outlined text-text-muted">schedule</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 days</div>
              <p className="text-xs text-text-muted">-0.3 days from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
              <span className="material-symbols-outlined text-text-muted">domain</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-text-muted">All departments active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Roads & Infrastructure", count: 847, percentage: 33 },
                  { category: "Water Supply", count: 562, percentage: 22 },
                  { category: "Street Lighting", count: 445, percentage: 17 },
                  { category: "Waste Management", count: 398, percentage: 16 },
                  { category: "Public Safety", count: 295, percentage: 12 },
                ].map((item) => (
                  <div key={item.category} className="flex items-center">
                    <div className="w-24 text-sm font-medium">{item.percentage}%</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded mr-4">
                      <div 
                        className="h-2 bg-brand-orange rounded" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-text-secondary">{item.category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "Public Works", resolved: 425, total: 512, efficiency: 83 },
                  { dept: "Water Department", resolved: 312, total: 389, efficiency: 80 },
                  { dept: "Electrical Services", resolved: 298, total: 356, efficiency: 84 },
                  { dept: "Sanitation", resolved: 267, total: 334, efficiency: 80 },
                  { dept: "Parks & Recreation", resolved: 189, total: 223, efficiency: 85 },
                ].map((item) => (
                  <div key={item.dept} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.dept}</span>
                      <span className="text-text-secondary">{item.resolved}/{item.total}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-status-success rounded" 
                        style={{ width: `${item.efficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}