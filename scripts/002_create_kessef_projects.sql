-- Drop existing table and policies if they exist
DROP TABLE IF EXISTS public.kessef_projects CASCADE;

-- Create kessef_projects table
CREATE TABLE public.kessef_projects (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  promoter TEXT NOT NULL,
  city TEXT NOT NULL,
  sector_name TEXT NOT NULL,
  sector_icon TEXT DEFAULT '',
  year INTEGER NOT NULL DEFAULT 2025,
  investment NUMERIC NOT NULL DEFAULT 0,
  employees INTEGER NOT NULL DEFAULT 1,
  ca1 NUMERIC NOT NULL DEFAULT 0,
  subvention NUMERIC DEFAULT 0,
  intelaka NUMERIC DEFAULT 0,
  start_tpe NUMERIC DEFAULT 0,
  result_net_an1 NUMERIC DEFAULT 0,
  plan_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.kessef_projects ENABLE ROW LEVEL SECURITY;

-- Public policies (no auth required)
CREATE POLICY "allow_select_all" ON public.kessef_projects FOR SELECT USING (true);
CREATE POLICY "allow_insert_all" ON public.kessef_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_delete_all" ON public.kessef_projects FOR DELETE USING (true);
CREATE POLICY "allow_update_all" ON public.kessef_projects FOR UPDATE USING (true);
