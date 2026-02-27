"use client"

import { useState, useRef, useCallback } from "react"
import {
  ChevronRight,
  Download,
  Printer,
  Save,
  Plus,
  FolderOpen,
  Trash2,
  Check,
  AlertTriangle,
  Loader2,
  Info,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  INTELAKA: { amount: 300000, rate: 0.02, duration: 7 },
  START_TPE: { amount: 50000 },
  SUBVENTION: { rate: 0.3 },
  MIN_INVESTMENT: 80000,
  MAX_INVESTMENT: 5000000,
}

// ─── SECTORS ────────────────────────────────────────────────────────────────
const SECTORS = [
  {
    id: 1,
    name: "Menuiserie CNC 3D",
    icon: "CNC",
    desc: "Portes, bureaux, moucharabiehs",
    eq: 200000,
    sw: 40000,
    postes: [
      ["Frais constitution & etudes", 9000],
      ["Amenagement atelier", 30000],
      ["Machine CNC 3 axes", 200000],
      ["Logiciels CAO/FAO", 40000],
      ["Outillage & consommables", 10000],
      ["Infrastructure reseau", 15000],
      ["Bail & garanties (3 mois)", 21000],
      ["BFR charges demarrage", 50000],
    ],
  },
  {
    id: 2,
    name: "Impression 3D Bijouterie",
    icon: "3D",
    desc: "Moules haute precision, cire perdue",
    eq: 180000,
    sw: 35000,
    postes: [
      ["Frais constitution & etudes", 8000],
      ["Amenagement atelier bijouterie", 22000],
      ["Imprimante 3D Resine SLA", 140000],
      ["Four & materiel fonderie", 40000],
      ["Logiciels design 3D", 35000],
      ["Outillage bijouterie", 15000],
      ["Bail & garanties", 12000],
      ["BFR charges demarrage", 40000],
    ],
  },
  {
    id: 3,
    name: "Laboratoire Dentaire",
    icon: "MED",
    desc: "Couronnes, bridges, gouttieres",
    eq: 220000,
    sw: 45000,
    postes: [
      ["Frais constitution & etudes reglementaires", 12000],
      ["Amenagement laboratoire dentaire", 45000],
      ["Scanner 3D intra-oral", 80000],
      ["Imprimante 3D medicale", 90000],
      ["Logiciels CAD/CAM dentaire", 45000],
      ["Mobilier & equipements", 20000],
      ["Bail & garanties", 15000],
      ["BFR charges demarrage", 45000],
    ],
  },
  {
    id: 4,
    name: "Prototypage Industriel",
    icon: "IND",
    desc: "Pieces de rechange, maquettes",
    eq: 190000,
    sw: 38000,
    postes: [
      ["Frais constitution", 10000],
      ["Amenagement atelier", 30000],
      ["Imprimante 3D FDM industrielle", 120000],
      ["Machine CNC compact", 70000],
      ["Logiciels CAO", 38000],
      ["Outillage & mesure", 15000],
      ["Bail & garanties", 12000],
      ["BFR charges demarrage", 35000],
    ],
  },
  {
    id: 5,
    name: "Marbrerie CNC",
    icon: "MRB",
    desc: "Zellige, bas-reliefs, construction luxe",
    eq: 250000,
    sw: 42000,
    postes: [
      ["Frais constitution", 10000],
      ["Amenagement atelier (120 m2)", 45000],
      ["Fraiseuse CNC jet d'eau", 200000],
      ["Compresseur & equipements", 25000],
      ["Logiciels dessin", 42000],
      ["Outillage specialise", 18000],
      ["Bail & garanties", 18000],
      ["BFR charges demarrage", 42000],
    ],
  },
  {
    id: 6,
    name: "Decoration Interieure",
    icon: "DEC",
    desc: "Panneaux, claustras, agencement sur mesure",
    eq: 170000,
    sw: 32000,
    postes: [
      ["Frais constitution", 8000],
      ["Amenagement showroom & atelier", 35000],
      ["Machine CNC routeur", 130000],
      ["Decoupe laser CO2", 40000],
      ["Logiciels design & pilotage", 32000],
      ["Stock matieres premieres", 15000],
      ["Bail & garanties", 14000],
      ["BFR charges demarrage", 38000],
    ],
  },
  {
    id: 7,
    name: "Patisserie & Chocolaterie",
    icon: "PAT",
    desc: "Moules alimentaires, gateaux mariage",
    eq: 80000,
    sw: 15000,
    postes: [
      ["Frais constitution", 6000],
      ["Amenagement laboratoire alimentaire", 25000],
      ["Imprimante 3D alimentaire", 45000],
      ["Four & equipements patisserie", 35000],
      ["Logiciels design moules", 15000],
      ["Matieres premieres initiales", 10000],
      ["Bail & garanties", 9000],
      ["BFR charges demarrage", 20000],
    ],
  },
  {
    id: 8,
    name: "Maintenance Industrielle",
    icon: "MNT",
    desc: "Pieces de rechange, reparation machines",
    eq: 160000,
    sw: 25000,
    postes: [
      ["Frais constitution", 9000],
      ["Amenagement atelier", 25000],
      ["Scanner 3D portable", 50000],
      ["Imprimante 3D HR metal/plastique", 110000],
      ["Materiel diagnostic & mesure", 25000],
      ["Logiciels scan & modelisation", 25000],
      ["Bail & garanties", 11000],
      ["BFR charges demarrage", 35000],
    ],
  },
]

// ─── FINANCIAL CALCULATIONS ─────────────────────────────────────────────────
const fn = (v: number) => Math.round(v).toLocaleString("fr-MA")
const fm = (v: number) => fn(v) + " MAD"
const fp = (v: number) => Number(v).toFixed(2) + "%"

type Sector = (typeof SECTORS)[number]

function calcFin(invest: number, eq: number, sw: number) {
  const sub = Math.round((eq + sw) * CONFIG.SUBVENTION.rate)
  const intel = CONFIG.INTELAKA.amount
  const stpe = CONFIG.START_TPE.amount
  const totalAid = sub + intel + stpe
  const apport = Math.max(0, invest - totalAid)
  return { subvention: sub, intelaka: intel, startTpe: stpe, apport, totalAid, investment: invest }
}

function calcSchedule(principal = 300000) {
  const pay = Math.round(principal / (CONFIG.INTELAKA.duration - 1))
  let rem = principal
  return Array.from({ length: CONFIG.INTELAKA.duration + 1 }, (_, i) => {
    const yr = i + 1
    if (yr === 1) return { year: yr, remaining: rem, interest: 0, capital: 0, total: 0, isDeferment: true }
    const interest = Math.round(rem * CONFIG.INTELAKA.rate)
    const capital = yr <= CONFIG.INTELAKA.duration ? pay : rem
    rem -= capital
    return { year: yr, remaining: Math.max(0, rem), interest, capital, total: interest + capital, isDeferment: false }
  })
}

function calcCPC(invest: number, fin: ReturnType<typeof calcFin>, ca1: number, employees: number, startYear: number) {
  const amort = Math.round(invest / 7)
  const growth = [1, 1.4, 1.75, 2.0, 2.2, 2.35]
  const salMoy = 5500
  const sched = calcSchedule(fin.intelaka)
  return growth.map((g, i) => {
    const year = startYear + i
    const ca = Math.round(ca1 * g)
    const matieres = Math.round(ca * 0.35)
    const externes = Math.round(95000 * Math.pow(1.03, i))
    const impots = Math.round(5000 * Math.pow(1.04, i))
    const personnel = Math.round(employees * salMoy * 12 * Math.pow(1.05, i))
    const autres = Math.round(15000 * Math.pow(1.03, i))
    const total = matieres + externes + impots + personnel + autres + amort
    const rex = ca - total
    const interets = i < sched.length ? sched[i].interest : 0
    const rap = rex - interets
    const is_ = i < 5 ? 0 : Math.round(Math.max(0, rap) * 0.2)
    return { year, ca, matieres, externes, impots, personnel, autres, amort, total, rex, interets, rap, is: is_, net: rap - is_ }
  })
}

function calcKPI(invest: number, cpc: ReturnType<typeof calcCPC>) {
  const avg5 = cpc.slice(0, 5).reduce((s, y) => s + y.net, 0) / 5
  const payback = Math.round((invest / (avg5 + cpc[0].amort)) * 10) / 10
  const marge = Math.round((cpc[0].net / cpc[0].ca) * 10000) / 100
  const roi = Math.round((avg5 / invest) * 10000) / 100
  return { payback, marge, avg5: Math.round(avg5), roi }
}

function scalePostes(postes: [string, number][], target: number): [string, number][] {
  const base = postes.reduce((s, [, v]) => s + v, 0)
  const ratio = target / base
  const scaled: [string, number][] = postes.map(([n, v]) => [n, Math.round(v * ratio)])
  const diff = target - scaled.reduce((s, [, v]) => s + v, 0)
  if (diff !== 0) scaled[scaled.length - 1][1] += diff
  return [...scaled, ["Frais divers & imprevus (5%)", Math.round(target * 0.05)]]
}

function validate(form: FormState, sector: Sector | null) {
  const e: string[] = []
  if (!sector) e.push("Selectionnez un secteur d'activite")
  if (!form.company?.trim()) e.push("Nom de l'entreprise requis")
  if (!form.promoter?.trim()) e.push("Nom du porteur du projet requis")
  if (!form.city?.trim()) e.push("Ville requise")
  const inv = parseFloat(form.investment) || 0
  if (inv < CONFIG.MIN_INVESTMENT) e.push(`Investissement minimum : ${fn(CONFIG.MIN_INVESTMENT)} MAD`)
  if (inv > CONFIG.MAX_INVESTMENT) e.push(`Investissement maximum : ${fn(CONFIG.MAX_INVESTMENT)} MAD`)
  const ca = parseFloat(form.ca1) || 0
  if (ca < 10000) e.push("CA previsionnel invalide (minimum 10 000 MAD)")
  const eff = parseInt(form.employees) || 0
  if (eff < 1) e.push("Effectif minimum : 1 personne")
  if (eff > 50) e.push("Effectif maximum : 50 personnes (TPME)")
  return e
}

interface FormState {
  company: string
  promoter: string
  city: string
  year: string
  investment: string
  employees: string
  ca1: string
}

interface PlanData {
  id: string
  form: FormState & { year: number; employees: number }
  sector: Sector
  fin: ReturnType<typeof calcFin>
  cpc: ReturnType<typeof calcCPC>
  kpi: ReturnType<typeof calcKPI>
  sched: ReturnType<typeof calcSchedule>
  post: [string, number][]
}

interface ToastData {
  id: number
  type: "success" | "error" | "warning" | "info"
  message: string
}

function Toast({ type, message, onClose }: ToastData & { onClose: () => void }) {
  const config = {
    success: { bg: "bg-[#0d2a0d]", border: "border-[#2a6a2a]", text: "text-[#4ade80]", Icon: Check },
    error: { bg: "bg-[#3a0808]", border: "border-[#8a2020]", text: "text-destructive", Icon: AlertTriangle },
    warning: { bg: "bg-[#2a2008]", border: "border-[#7a6020]", text: "text-[#e8d080]", Icon: AlertTriangle },
    info: { bg: "bg-[#0a1a2a]", border: "border-[#2a5a8a]", text: "text-[#80c0f0]", Icon: Info },
  }
  const c = config[type]
  return (
    <div role="alert" className={cn("flex items-center justify-between gap-3 rounded-lg border px-4 py-3 mb-3 animate-fade-in-up", c.bg, c.border)}>
      <div className={cn("flex items-center gap-2 text-sm", c.text)}>
        <c.Icon className="h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className={cn("text-lg leading-none", c.text)} aria-label="Close notification">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Financial table ────────────────────────────────────────────────────────
function FinTable({
  headers,
  rows,
  footer,
  highlightRows = [],
}: {
  headers: string[]
  rows: (string[] | "---")[]
  footer?: string[]
  highlightRows?: number[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-xs" role="table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  "whitespace-nowrap border-b border-border bg-secondary px-3 py-2 font-semibold text-primary",
                  i === 0 ? "text-left" : "text-right"
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            if (row === "---")
              return (
                <tr key={ri}>
                  <td colSpan={headers.length} className="h-px bg-border p-0" />
                </tr>
              )
            const isHL = highlightRows.includes(ri)
            const isBold =
              typeof row[0] === "string" &&
              (row[0].startsWith("TOTAL") || row[0].startsWith("RESULTAT") || row[0].startsWith("BENEFICE"))
            const isDim =
              typeof row[0] === "string" &&
              (row[0].startsWith("PRODUITS") || row[0].startsWith("CHARGES") || row[0].includes("EXPLOITATION") || row[0].includes("FINANCIERES"))
            return (
              <tr
                key={ri}
                className={cn(
                  isHL ? "bg-primary/5" : ri % 2 === 0 ? "bg-card" : "bg-background"
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "whitespace-nowrap border-b border-border/50 px-3 py-1.5",
                      ci === 0 ? "text-left" : "text-right",
                      isHL ? "font-semibold text-primary" : isBold ? "font-semibold text-foreground" : isDim ? "italic text-muted-foreground" : "text-foreground/80"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="bg-secondary">
              {footer.map((c, i) => (
                <td
                  key={i}
                  className={cn(
                    "whitespace-nowrap border-t-2 border-primary/30 px-3 py-2 font-bold text-primary",
                    i === 0 ? "text-left" : "text-right"
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8" aria-labelledby={`sec-${num}`}>
      <div className="flex items-center gap-3 border-b border-primary/20 pb-2 mb-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {num}
        </span>
        <h2 id={`sec-${num}`} className="text-sm font-bold uppercase tracking-wider text-primary">
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed text-foreground/80">{children}</div>
    </section>
  )
}

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-center">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className={cn("text-lg font-bold", accent ? "text-primary" : "text-foreground")}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export function ProjectForm() {
  const [view, setView] = useState<"form" | "plan">("form")
  const [sector, setSector] = useState<Sector | null>(null)
  const [form, setForm] = useState<FormState>({
    company: "",
    promoter: "",
    city: "Tanger",
    year: "2026",
    investment: "350000",
    employees: "5",
    ca1: "500000",
  })
  const [plan, setPlan] = useState<PlanData | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [toasts, setToasts] = useState<ToastData[]>([])
  const planRef = useRef<HTMLDivElement>(null)

  const investNum = parseFloat(form.investment) || 0
  const ca1Num = parseFloat(form.ca1) || 0
  const effNum = parseInt(form.employees) || 1
  const prevFin = sector && investNum > 0 ? calcFin(investNum, sector.eq, sector.sw) : null

  const toast = useCallback((type: ToastData["type"], message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, type, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000)
  }, [])

  async function generate() {
    const errs = validate(form, sector)
    if (errs.length > 0) {
      setErrors(errs)
      return
    }
    setErrors([])
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    try {
      if (!sector) throw new Error("No sector selected")
      const fin = calcFin(investNum, sector.eq, sector.sw)
      const cpc = calcCPC(investNum, fin, ca1Num, effNum, parseInt(form.year) || 2026)
      const kpi = calcKPI(investNum, cpc)
      const sched = calcSchedule(fin.intelaka)
      const post = scalePostes(sector.postes as [string, number][], investNum)
      const data: PlanData = {
        id: "KSF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substr(2, 4).toUpperCase(),
        form: { ...form, year: parseInt(form.year) || 2026, employees: effNum },
        sector,
        fin,
        cpc,
        kpi,
        sched,
        post,
      }
      setPlan(data)
      setView("plan")
      toast("success", "Business plan generated successfully!")
      setTimeout(() => planRef.current?.scrollIntoView({ behavior: "smooth" }), 200)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error"
      toast("error", "Generation error: " + message)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setView("form")
    setPlan(null)
    setErrors([])
    setForm({ company: "", promoter: "", city: "Tanger", year: "2026", investment: "350000", employees: "5", ca1: "500000" })
    setSector(null)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      {/* Toasts */}
      <div aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))} />
        ))}
      </div>

      {/* ═══════════ FORM VIEW ═══════════ */}
      {view === "form" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">New Project</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Generate an optimized business plan with Pacte National d{"'"}Investissement 2022-2026
            </p>
          </div>

          {/* Step 1: Sector */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Sector Selection
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Select a sector">
              {SECTORS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSector(s); setErrors([]) }}
                  role="radio"
                  aria-checked={sector?.id === s.id}
                  className={cn(
                    "relative rounded-lg border p-4 text-left transition-all duration-200",
                    sector?.id === s.id
                      ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(198,241,53,0.1)]"
                      : "border-border bg-background hover:border-primary/30"
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-[10px] font-bold text-primary mb-2">
                    {s.icon}
                  </div>
                  <div className={cn("text-xs font-medium leading-tight", sector?.id === s.id ? "text-primary" : "text-foreground")}>
                    {s.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{s.desc}</div>
                  {sector?.id === s.id && (
                    <div className="absolute right-2 top-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Project Information
              </span>
            </div>

            {sector && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs">
                <span className="text-muted-foreground">Sector:</span>
                <span className="font-semibold text-primary">{sector.name}</span>
                <span className="text-muted-foreground">- {sector.desc}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { k: "company", l: "Company Name", p: "Ex: MENUISERIE DIGITAL TANGER SARL", t: "text" },
                { k: "promoter", l: "Project Owner", p: "First Last Name", t: "text" },
                { k: "city", l: "City", p: "Ex: Tanger, Casablanca, Fes...", t: "text" },
                { k: "year", l: "Creation Year", p: "2026", t: "number" },
                { k: "investment", l: "Total Investment (MAD)", p: "350 000", t: "number" },
                { k: "employees", l: "Expected Headcount", p: "5", t: "number" },
              ].map((f) => (
                <div key={f.k}>
                  <label htmlFor={f.k} className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {f.l}
                  </label>
                  <input
                    id={f.k}
                    type={f.t}
                    placeholder={f.p}
                    value={form[f.k as keyof FormState]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                    aria-required="true"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="ca1" className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Projected Revenue - Year 1 (MAD)
                </label>
                <input
                  id="ca1"
                  type="number"
                  placeholder="500 000"
                  value={form.ca1}
                  onChange={(e) => setForm((p) => ({ ...p, ca1: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Financing preview */}
            {prevFin && (
              <div className="mt-4 rounded-lg border border-[#2a5a2a]/40 bg-[#0d1a0d] p-4">
                <div className="text-[10px] uppercase tracking-wider text-[#4ade80] mb-3 font-medium">
                  Financing Preview - Pacte National d{"'"}Investissement
                </div>
                {[
                  ["Total Investment", fm(investNum), false],
                  ["CRI Subsidy (30% equip.+soft.)", "+ " + fm(prevFin.subvention), true],
                  ["Intelaka Credit (2% - 7 yrs)", fm(prevFin.intelaka), false],
                  ["Start TPE (repayable yr 5)", fm(prevFin.startTpe), false],
                  ["Personal Contribution", fm(prevFin.apport), false],
                ].map(([l, v, g]) => (
                  <div key={l as string} className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#4ade80]/70">{l as string}</span>
                    <span className={cn("font-medium", g ? "text-[#4ade80] font-bold" : "text-foreground/80")}>{v as string}</span>
                  </div>
                ))}
                <div className="mt-3 border-t border-[#2a5a2a]/30 pt-2 text-center text-[10px] text-[#4ade80]/60">
                  Eligible - Subsidy 30% - IS 0% (5 yrs) - Intelaka 2% - Start TPE
                </div>
              </div>
            )}

            {/* Validation errors */}
            {errors.length > 0 && (
              <div role="alert" className="mt-4 space-y-2">
                {errors.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={generate}
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Business Plan
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ PLAN VIEW ═══════════ */}
      {view === "plan" && plan && (
        <article ref={planRef} className="space-y-6">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={reset} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/30">
              <Plus className="h-3.5 w-3.5" /> New Project
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/30">
              <Printer className="h-3.5 w-3.5" /> Print / PDF
            </button>
          </div>

          {/* Plan content */}
          <div className="rounded-xl border border-border bg-card p-8">
            {/* Cover */}
            <header className="mb-10 border-b border-border pb-8 text-center">
              <div className="mb-2 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {plan.sector.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {plan.form.company.toUpperCase()}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.sector.name}</p>
              <p className="text-xs text-muted-foreground">
                {plan.form.city.toUpperCase()}, Maroc - {plan.form.year}
              </p>
              <div className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                Business Plan - Optimized Subsidy Version
              </div>
            </header>

            {/* 1. Executive Summary */}
            <Section num="1" title="Executive Summary">
              <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                <p>
                  <strong className="text-primary">{plan.form.company}</strong> is an investment project in{" "}
                  <strong className="text-primary">{plan.sector.name}</strong> ({plan.sector.desc}), based in{" "}
                  <strong className="text-primary">{plan.form.city}</strong>. Led by{" "}
                  <strong className="text-primary">{plan.form.promoter}</strong>, the project launches in {plan.form.year} with{" "}
                  <strong className="text-primary">{plan.form.employees} employees</strong>.
                </p>
                <p>
                  Financing optimized via Pacte National d{"'"}Investissement 2022-2026:{" "}
                  <strong className="text-[#4ade80]">CRI Subsidy 30%</strong> ({fm(plan.fin.subvention)}),{" "}
                  <strong className="text-primary">Intelaka Credit 2%</strong> ({fm(plan.fin.intelaka)}) and{" "}
                  <strong className="text-primary">Start TPE</strong> ({fm(plan.fin.startTpe)}).
                </p>
                <p>
                  <strong className="text-[#4ade80]">Positive net result from year 1</strong> ({fm(plan.cpc[0].net)}).
                  Growing revenue from {fm(plan.cpc[0].ca)} to {fm(plan.cpc[5].ca)} over 6 years.
                  Payback: <strong className="text-primary">{plan.kpi.payback} years</strong>. Average ROI 5 yrs:{" "}
                  <strong className="text-[#4ade80]">{fp(plan.kpi.roi)}</strong>.
                </p>
              </div>
            </Section>

            {/* 5. Investment Program */}
            <Section num="2" title="Investment Program">
              <p className="mb-3">
                Total investment set at <strong className="text-primary">{fm(investNum)}</strong>:
              </p>
              <FinTable
                headers={["DESIGNATION", "AMOUNT HT (MAD)"]}
                rows={plan.post.map(([n, v]) => [n, fn(v)])}
                footer={["TOTAL INVESTMENT", fn(investNum)]}
              />
            </Section>

            {/* 6. Financing Plan */}
            <Section num="3" title="Optimized Financing Plan">
              <p className="mb-3">
                With Pacte National d{"'"}Investissement, the subsidy reaches{" "}
                <strong className="text-[#4ade80]">{fm(plan.fin.subvention)}</strong>:
              </p>
              <FinTable
                headers={["FINANCING SOURCE", "AMOUNT (MAD)", "SHARE (%)"]}
                rows={[
                  ["CRI Subsidy (Pacte Investissement - 30%)", fn(plan.fin.subvention), "-"],
                  ["Intelaka Credit (2% - 7 yrs - 12 mo deferral)", fn(plan.fin.intelaka), fp((plan.fin.intelaka / investNum) * 100)],
                  ["Start TPE (repayable yr 5)", fn(plan.fin.startTpe), fp((plan.fin.startTpe / investNum) * 100)],
                  ["Personal contribution", fn(plan.fin.apport), fp((plan.fin.apport / investNum) * 100)],
                ]}
                footer={["TOTAL FINANCING", fn(investNum), "100%"]}
                highlightRows={[0]}
              />
            </Section>

            {/* 7. Amortization Schedule */}
            <Section num="4" title={`Intelaka Amortization (${fm(plan.fin.intelaka)} - 2% - 7 yrs)`}>
              <FinTable
                headers={["YEAR", "Outstanding (MAD)", "Interest (MAD)", "Capital (MAD)", "Total Annuity (MAD)"]}
                rows={plan.sched.map((r) => [
                  r.isDeferment ? "Yr 1 - Deferral" : "Yr " + r.year,
                  fn(r.remaining),
                  fn(r.interest),
                  fn(r.capital),
                  r.isDeferment ? "- (no payment)" : fn(r.total),
                ])}
              />
            </Section>

            {/* 8. CPC */}
            <Section num="5" title={`P&L Forecast ${plan.form.year}-${plan.form.year + 5}`}>
              <p className="mb-3">Income Statement - IS 0% yr 1-5, IS 20% yr 6:</p>
              <FinTable
                headers={["INCOME STATEMENT", ...plan.cpc.map((y) => String(y.year))]}
                rows={[
                  ["OPERATING INCOME", ...plan.cpc.map(() => "")],
                  ["Revenue", ...plan.cpc.map((y) => fn(y.ca))],
                  ["TOTAL INCOME", ...plan.cpc.map((y) => fn(y.ca))],
                  "---",
                  ["OPERATING EXPENSES", ...plan.cpc.map(() => "")],
                  ["Raw materials (35% Rev)", ...plan.cpc.map((y) => fn(y.matieres))],
                  ["External expenses", ...plan.cpc.map((y) => fn(y.externes))],
                  ["Taxes", ...plan.cpc.map((y) => fn(y.impots))],
                  ["Personnel", ...plan.cpc.map((y) => fn(y.personnel))],
                  ["Other expenses", ...plan.cpc.map((y) => fn(y.autres))],
                  ["Depreciation (7 yrs)", ...plan.cpc.map((y) => fn(y.amort))],
                  ["TOTAL EXPENSES", ...plan.cpc.map((y) => fn(y.total))],
                  "---",
                  ["OPERATING RESULT", ...plan.cpc.map((y) => fn(y.rex))],
                  "---",
                  ["FINANCIAL CHARGES", ...plan.cpc.map(() => "")],
                  ["Intelaka Interest 2%", ...plan.cpc.map((y) => fn(y.interets))],
                  ["RESULT BEFORE TAX", ...plan.cpc.map((y) => fn(y.rap))],
                  ["IS (5-yr exemption)", ...plan.cpc.map((y) => (y.is === 0 ? "0" : fn(y.is)))],
                  ["NET RESULT", ...plan.cpc.map((y) => fn(y.net))],
                ]}
                highlightRows={[2, 11, 13, 17, 19]}
              />
            </Section>

            {/* 10. KPIs */}
            <Section num="6" title="Economic Viability Indicators">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <KPICard label="Payback Period" value={plan.kpi.payback + " yrs"} sub="Total investment" />
                <KPICard label="Net Margin Y1" value={fp(plan.kpi.marge)} sub="Result / Revenue" accent />
                <KPICard label="Avg Net Result 5Y" value={fn(plan.kpi.avg5) + " MAD"} sub="IS excluded" />
                <KPICard label="ROI Average 5Y" value={fp(plan.kpi.roi)} sub="Return on Investment" accent />
              </div>
            </Section>

            {/* 11. Conclusion */}
            <Section num="7" title="Conclusion">
              <div className="rounded-lg border border-border bg-background p-4 space-y-3">
                <p>
                  The project <strong className="text-primary">{plan.form.company}</strong> demonstrates confirmed economic viability:{" "}
                  <strong className="text-[#4ade80]">positive net result from year 1</strong> ({fm(plan.cpc[0].net)}), ROI of{" "}
                  {fp(plan.kpi.roi)}, payback period of {plan.kpi.payback} years.
                </p>
                <p>
                  <strong className="text-primary">Socio-economic impact:</strong> Creation of {plan.form.employees} direct jobs in{" "}
                  {plan.form.city}, valorization of Moroccan artisanal expertise, import substitution and improvement of the national trade balance. Fully aligned with Pacte National d{"'"}Investissement 2022-2026.
                </p>
              </div>
            </Section>

            {/* Footer */}
            <div className="mt-8 border-t border-border pt-4 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              {plan.form.company.toUpperCase()} - Business Plan {plan.form.year} - CONFIDENTIAL
              <br />
              KESSEF - Pacte National d{"'"}Investissement 2022-2026 - ID: {plan.id}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
