import { cn } from "@/lib/utils";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  filled?: boolean;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base", 
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

export function Icon({ 
  name, 
  size = "md", 
  filled = false, 
  className, 
  ...props 
}: IconProps) {
  return (
    <span 
      className={cn(
        "material-symbols-outlined select-none",
        sizeClasses[size],
        filled && "font-medium",
        className
      )} 
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
      {...props}
    >
      {name}
    </span>
  );
}