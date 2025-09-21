import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const departments = [
  { name: "Public Works", issues: 512, resolved: 425, efficiency: 83 },
  { name: "Water Department", issues: 389, resolved: 312, efficiency: 80 },
  { name: "Electrical Services", issues: 356, resolved: 298, efficiency: 84 },
  { name: "Sanitation", issues: 334, resolved: 267, efficiency: 80 },
  { name: "Parks & Recreation", issues: 223, resolved: 189, efficiency: 85 },
  { name: "Transportation", issues: 198, resolved: 156, efficiency: 79 },
];

export default function Departments() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <PageHeader 
          title="Departments"
          description="Monitor and manage departmental performance"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card key={dept.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand-orange">domain</span>
                  {dept.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Issues</span>
                  <span className="font-semibold">{dept.issues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Resolved</span>
                  <span className="font-semibold text-status-success">{dept.resolved}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Efficiency</span>
                    <span className="font-semibold">{dept.efficiency}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-2 bg-status-success rounded" 
                      style={{ width: `${dept.efficiency}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}