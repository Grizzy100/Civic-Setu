import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "open" | "in-progress" | "resolved" | "pending";
  priority?: "low" | "medium" | "high";
  className?: string;
}

const statusStyles = {
  open: "bg-status-info/10 text-status-info",
  "in-progress": "bg-status-warning/10 text-status-warning",
  resolved: "bg-status-success/10 text-status-success",
  pending: "bg-status-error/10 text-status-error",
};

const priorityStyles = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export function StatusBadge({ status, priority, className }: StatusBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status]
      )}>
        {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      {priority && (
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          priorityStyles[priority]
        )}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </span>
      )}
    </div>
  );
}