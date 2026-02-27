// components/projects-list.tsx
"use client";
"use client";

import { useEffect, useState } from "react";
import { listProjects, deleteProject, type KessefProjectRow } from "@/lib/supabase/kessef-db";
import { Trash2, Eye, Loader2 } from "lucide-react";
import { BusinessPlanViewer } from "./project-form";   // ← this is the fixed import

export function ProjectsList() {
  // full code from my last message (the one with fixed delete + loading)
}

export function ProjectsList() {
  // full code from my last message (the one with fixed delete + loading)
}
export function ProjectsList() {
  const [projects, setProjects] = useState<KessefProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer définitivement ce projet ?")) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      alert("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border bg-card">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="max-w-5xl w-full max-h-[95vh] overflow-auto rounded-3xl bg-background">
            <BusinessPlanViewer 
              plan={selectedPlan} 
              onSave={() => {}} 
              onNew={() => setSelectedPlan(null)} 
              saving={false} 
            />
            <div className="text-center py-6">
              <button 
                onClick={() => setSelectedPlan(null)} 
                className="text-sm underline text-muted-foreground"
              >
                Fermer la prévisualisation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl border bg-card overflow-hidden">
        <div className="border-b px-6 py-4 flex items-center justify-between bg-muted/50">
          <h3 className="font-semibold text-lg">Mes Projets KESSEF</h3>
          <span className="text-xs text-muted-foreground">{projects.length} projet{projects.length > 1 ? "s" : ""}</span>
        </div>

        {projects.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            Aucun projet enregistré pour le moment.<br />
            Créez votre premier projet dans "Nouveau projet"
          </div>
        ) : (
          <div className="divide-y">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-6 py-5 hover:bg-muted/30 group">
                <div>
                  <div className="font-medium">{p.company_name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-3">
                    {p.sector} • {p.city}
                    <span className="text-xs">• {new Date(p.created_at).toLocaleDateString("fr-MA")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => setSelectedPlan(p.plan_data)}
                    className="rounded-xl border p-3 hover:bg-card"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="rounded-xl border p-3 text-red-500 hover:bg-red-950"
                  >
                    {deletingId === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}