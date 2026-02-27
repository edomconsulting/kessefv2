// components/dashboard/dashboard-overview.tsx
"use client";

import { MetricCard } from "./metric-card";
import { AccountInsight } from "./account-insight";
import { AIAssistant } from "./ai-assistant";
import { ProjectsList } from "../projects-list";   // ← fixed relative path
import { DollarSign, Users, TrendingUp, Award } from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-10">
      {/* your existing dashboard code */}
      <div className="lg:col-span-8">
        <ProjectsList />
      </div>

export function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Bonjour Khalid 👋</h1>
        <p className="text-muted-foreground mt-2 text-lg">Voici un aperçu de vos projets KESSEF aujourd’hui</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Investissement total"
          value="2.84"
          unit="M MAD"
          change="+18%"
          icon={<DollarSign className="h-6 w-6" />}
          accent
        />
        <MetricCard
          title="Emplois créés"
          value="27"
          change="+4"
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="ROI moyen 5 ans"
          value="24.8"
          unit="%"
          change="+2.3%"
          icon={<TrendingUp className="h-6 w-6" />}
          accent
        />
        <MetricCard
          title="Subventions obtenues"
          value="684"
          unit="k MAD"
          icon={<Award className="h-6 w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProjectsList />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <AccountInsight />
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}