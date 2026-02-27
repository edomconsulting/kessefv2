-- Create kessef_projects table
CREATE TABLE IF NOT EXISTS public.kessef_projects (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  promoter TEXT NOT NULL,
  city TEXT NOT NULL,
  sector_name TEXT NOT NULL,
  sector_icon TEXT,
  year INTEGER NOT NULL,
  investment NUMERIC NOT NULL,
  employees INTEGER NOT NULL,
  ca1 NUMERIC NOT NULL,
  subvention NUMERIC,
  intelaka NUMERIC,
  start_tpe NUMERIC,
  result_net_an1 NUMERIC,
  plan_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.kessef_projects ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read/write (public app, no auth required for now)
CREATE POLICY "allow_select_all" ON public.kessef_projects FOR SELECT USING (true);
CREATE POLICY "allow_insert_all" ON public.kessef_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_delete_all" ON public.kessef_projects FOR DELETE USING (true);
CREATE POLICY "allow_update_all" ON public.kessef_projects FOR UPDATE USING (true);
