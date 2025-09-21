"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  date: string;
  images: string[];
  karma: number;
}

const mockReports: Report[] = [
  /* ... your mockReports array ... */
];

const getStatusColor = (status: Report["status"]) => {
  switch (status) {
    case "resolved":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: Report["status"]) => {
  switch (status) {
    case "resolved":
      return "check_circle";
    case "in-progress":
      return "schedule";
    case "pending":
      return "hourglass_empty";
    default:
      return "hourglass_empty";
  }
};

export default function ReportHistory() {
  const router = useRouter();
  const [reports] = useState<Report[]>(mockReports);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex h-screen w-full flex-col bg-warm-background">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-warm border-b border-border">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/profile")}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow_back" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1 pr-8 font-display">
            My Reports
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="report" size="4xl" className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                No Reports Yet
              </h3>
              <p className="text-muted-foreground">
                Start reporting issues to help improve your community!
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-background rounded-xl p-4 card-shadow hover:shadow-md transition-all"
              >
                {/* Report Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight font-display">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon name="location_on" size="sm" className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.location}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(report.status)} border-0`}>
                    <Icon name={getStatusIcon(report.status)} size="sm" className="mr-1" />
                    {report.status.replace("-", " ")}
                  </Badge>
                </div>

                {/* Report Images */}
                {report.images.length > 0 && (
                  <div className="mb-3">
                    <div className="flex gap-2 overflow-x-auto">
                      {report.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Report image ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Report Description */}
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {report.description}
                </p>

                {/* Report Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formatDate(report.date)}</span>
                    <div className="flex items-center gap-1">
                      <Icon name="stars" size="sm" className="text-primary" />
                      <span className="text-primary font-medium">+{report.karma} Karma</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
