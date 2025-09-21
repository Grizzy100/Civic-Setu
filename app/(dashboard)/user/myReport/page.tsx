import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Home, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ReportStatus = 'submitted' | 'progress' | 'resolved' | 'rejected';

interface Report {
  id: string;
  title: string;
  category: string;
  status: ReportStatus;
  daysAgo: number;
  stepsCompleted: number;
  totalSteps: number;
}

const reports: Report[] = [
  {
    id: "1",
    title: "Water Leak in Sector 12",
    category: "Infrastructure",
    status: "submitted",
    daysAgo: 2,
    stepsCompleted: 1,
    totalSteps: 4
  },
  {
    id: "2", 
    title: "Road Pothole on Main Road",
    category: "Road",
    status: "progress",
    daysAgo: 5,
    stepsCompleted: 2,
    totalSteps: 4
  },
  {
    id: "3",
    title: "Streetlight Outage in Block C", 
    category: "Utilities",
    status: "resolved",
    daysAgo: 14,
    stepsCompleted: 4,
    totalSteps: 4
  }
];

const StatusIndicator = ({ status, stepsCompleted, totalSteps }: { status: ReportStatus, stepsCompleted: number, totalSteps: number }) => {
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'submitted': return 'bg-status-submitted';
      case 'progress': return 'bg-status-progress';
      case 'resolved': return 'bg-status-resolved';
      case 'rejected': return 'bg-status-rejected';
      default: return 'bg-muted';
    }
  };

  const progressPercentage = (stepsCompleted / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span className="capitalize">{status}</span>
        <span>{stepsCompleted}/{totalSteps} Steps</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div 
          className={cn("h-1.5 rounded-full transition-all duration-300", getStatusColor(status))}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default function ReportsList() {
  return (
    <Card className="h-full bg-gradient-card border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Civic Sethu - My Reports List
          </CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Reports</h2>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="border border-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-foreground">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted {report.daysAgo} days ago
                    </p>
                  </div>
                  
                  <StatusIndicator 
                    status={report.status}
                    stepsCompleted={report.stepsCompleted}
                    totalSteps={report.totalSteps}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-4 left-4 right-4 md:relative md:bottom-0 md:left-0 md:right-0 md:mt-8">
          <Card className="bg-card/95 backdrop-blur-sm border">
            <CardContent className="p-3">
              <div className="flex items-center justify-center space-x-8">
                <Button variant="ghost" size="icon" className="flex flex-col gap-1">
                  <Home className="w-5 h-5" />
                  <span className="text-xs">Home</span>
                </Button>
                <Button size="icon" className="rounded-full bg-gradient-civic hover:opacity-90">
                  <Plus className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="flex flex-col gap-1">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}