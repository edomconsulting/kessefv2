// components/dashboard/metric-card.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  icon: ReactNode;
  accent?: boolean;
}

export function MetricCard({ title, value, unit, change, icon, accent }: MetricCardProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl opacity-80">{icon}</div>
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className={cn("text-4xl font-bold tracking-tighter", accent && "text-primary")}>
          {value}
        </span>
        {unit && <span className="text-xl text-muted-foreground">{unit}</span>}
      </div>
      {change && (
        <div className="text-xs mt-3 text-emerald-500 font-medium">↑ {change} ce mois</div>
      )}
    </div>
  );
}