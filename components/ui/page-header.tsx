import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="col-span-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-text-primary tracking-tight">{title}</h2>
          {description && (
            <p className="text-text-secondary mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}