"use client"

import { Activity } from "lucide-react"
import { MiniChart } from "./mini-chart"

interface UtilizationPanelProps {
  title: string
  mainValue: string
  mainLabel: string
  stats: { label: string; value: string }[]
  chartData: { name: string; value: number }[]
  chartColor?: string
}

export function UtilizationPanel({
  title,
  mainValue,
  mainLabel,
  stats,
  chartData,
  chartColor = "#c6f135",
}: UtilizationPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      </div>

      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          {stats.slice(0, 2).map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{mainLabel}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">
              {mainValue}
            </span>
            <span className="text-lg text-primary">%</span>
          </div>
          {stats.length > 2 && (
            <div className="mt-1 space-y-0.5">
              {stats.slice(2).map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 justify-end">
                  <span className="text-xs font-medium text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MiniChart data={chartData} color={chartColor} height={50} />
    </div>
  )
}
