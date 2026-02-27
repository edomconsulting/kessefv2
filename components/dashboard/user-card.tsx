"use client"

import { ArrowUpRight } from "lucide-react"

interface UserCardProps {
  name: string
  email: string
  avatar: string
  color: string
}

export function UserCard({ name, email, avatar, color }: UserCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(198,241,53,0.03)]">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-background"
        style={{ backgroundColor: color }}
      >
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
      <button
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
        aria-label={`View ${name}'s profile`}
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
