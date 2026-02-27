// components/dashboard/top-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, FolderOpen, Bot, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/nouveau-projet", label: "Nouveau projet", icon: PlusCircle },
    { href: "/mes-projets", label: "Mes projets", icon: FolderOpen },
    { href: "/assistant-ia", label: "Assistant IA", icon: Bot },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-black font-bold text-xl">K</div>
            <span className="font-bold text-2xl tracking-tighter">KESSEF</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profil"
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-muted"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Mon compte</span>
          </Link>
          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-red-500 hover:bg-red-950/50">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  );
}