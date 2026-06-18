import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "magenta" | "accent" | "muted";
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300",
          variant === "muted" ? "border-muted bg-muted/20" : "border-border",
          hoverEffect && "premium-card",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card };
