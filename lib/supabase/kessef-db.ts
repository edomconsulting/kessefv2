import { createClient } from "@/lib/supabase/client"
import type { BusinessPlan } from "@/lib/kessef-engine"

export interface KessefProjectRow {
  id: string
  company_name: string
  promoter: string
  city: string
  sector: string
  sub_sector: string
  investment_total: number
  fonds_propres: number
  credit_bancaire: number
  subvention: number
  chiffre_affaires: number
  emplois_crees: number
  plan_data: BusinessPlan
  created_at: string
  updated_at: string
}

export async function saveProject(plan: BusinessPlan): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("kessef_projects").insert({
    company_name: plan.form.company,
    promoter: plan.form.promoter,
    city: plan.form.city,
    sector: plan.sector.name,
    sub_sector: plan.sector.desc,
    investment_total: plan.fin.investment,
    fonds_propres: plan.fin.apport,
    credit_bancaire: plan.fin.intelaka + plan.fin.startTpe,
    subvention: plan.fin.subvention,
    chiffre_affaires: parseFloat(plan.form.ca1) || 0,
    emplois_crees: typeof plan.form.employees === "number" ? plan.form.employees : parseInt(String(plan.form.employees)) || 0,
    plan_data: plan as unknown as Record<string, unknown>,
  })
  if (error) throw new Error(error.message)
}

export async function listProjects(): Promise<KessefProjectRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("kessef_projects")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return (data || []) as KessefProjectRow[]
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from("kessef_projects")
    .delete()
    .eq("id", id)
  if (error) throw new Error(error.message)
}
