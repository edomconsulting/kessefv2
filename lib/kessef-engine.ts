// lib/kessef-engine.ts
export interface Sector {
  id: number;
  name: string;
  icon: string;
  desc: string;
  eq: number;
  sw: number;
  postes: [string, number][];
}

export interface ProjectForm {
  company: string;
  promoter: string;
  city: string;
  year: number;
  investment: string;
  employees: string;
  ca1: string;
}

export interface Financement {
  subvention: number;
  intelaka: number;
  startTpe: number;
  apport: number;
  totalAid: number;
  investment: number;
}

export interface ScheduleRow {
  year: number;
  remaining: number;
  interest: number;
  capital: number;
  total: number;
  isDeferment: boolean;
}

export interface CPCRow {
  year: number;
  ca: number;
  matieres: number;
  externes: number;
  impots: number;
  personnel: number;
  autres: number;
  amort: number;
  total: number;
  rex: number;
  interets: number;
  rap: number;
  is: number;
  net: number;
}

export interface KPIData {
  payback: number;
  marge: number;
  avg5: number;
  roi: number;
}

export interface BusinessPlan {
  id: string;
  createdAt: string;
  form: ProjectForm & { year: number; employees: number };
  sector: Sector;
  fin: Financement;
  cpc: CPCRow[];
  kpi: KPIData;
  sched: ScheduleRow[];
  post: [string, number][];
}

export const CONFIG = {
  INTELAKA: { amount: 300000, rate: 0.02, duration: 7 },
  START_TPE: { amount: 50000 },
  SUBVENTION: { rate: 0.30 },
  MIN_INVESTMENT: 80000,
  MAX_INVESTMENT: 5000000,
};

export const SECTORS: Sector[] = [ /* paste all 8 sectors from your original file here */ ];

export const fn = (v: number) => Math.round(v).toLocaleString("fr-MA");
export const fm = (v: number) => fn(v) + " MAD";
export const fp = (v: number) => Number(v).toFixed(2) + "%";

export function generatePlan(/* ... same functions as before ... */) { /* full code from earlier message */ }
// (keep all calcFin, calcSchedule, calcCPC, calcKPI, validate, scalePostes exactly as I gave you before)