// components/dashboard/account-insight.tsx
"use client";

import { User, Award, Calendar } from "lucide-react";

export function AccountInsight() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-3xl text-black font-bold">KM</div>
        <div>
          <div className="font-semibold text-xl">Khalid Marwan</div>
          <div className="text-sm text-muted-foreground">Tanger • Porteur de projet</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-muted/50 p-4 text-center">
          <div className="text-3xl font-bold text-primary">12</div>
          <div className="text-xs text-muted-foreground mt-1">Projets créés</div>
        </div>
        <div className="rounded-2xl bg-muted/50 p-4 text-center">
          <div className="text-3xl font-bold text-emerald-500">8</div>
          <div className="text-xs text-muted-foreground mt-1">Plans validés</div>
        </div>
        <div className="rounded-2xl bg-muted/50 p-4 text-center">
          <div className="text-3xl font-bold">4.2M</div>
          <div className="text-xs text-muted-foreground mt-1">MAD financés</div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-emerald-500">
        <Award className="h-4 w-4" />
        Éligible Pacte National d'Investissement 2022-2026
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">Dernière connexion : aujourd'hui</div>
    </div>
  );
}