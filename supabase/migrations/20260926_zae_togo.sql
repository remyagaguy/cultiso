-- Create Table for Agro-Ecological Zones (Togo)
CREATE TABLE IF NOT EXISTS public.cultiplan_zae_togo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id TEXT UNIQUE NOT NULL, -- e.g., 'ZONE_1', 'ZONE_2'
    name TEXT NOT NULL, -- e.g., 'Région des Savanes'
    description TEXT,
    rainfall_min_mm INTEGER,
    rainfall_max_mm INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS Policies
ALTER TABLE public.cultiplan_zae_togo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to zae_togo"
    ON public.cultiplan_zae_togo FOR SELECT
    USING (true);

-- Insert Data for the 5 zones of Togo
INSERT INTO public.cultiplan_zae_togo (zone_id, name, description, rainfall_min_mm, rainfall_max_mm)
VALUES 
    ('ZONE_1', 'Zone I (Savanes)', 'Nord du Togo, plaines. Climat soudanais.', 900, 1100),
    ('ZONE_2', 'Zone II (Kara)', 'Région septentrionale, massifs montagneux.', 1200, 1300),
    ('ZONE_3', 'Zone III (Centrale)', 'Plaine centrale, climat de transition.', 1200, 1500),
    ('ZONE_4', 'Zone IV (Plateaux)', 'Sud-ouest, montagnes et forêts, zone café-cacao.', 1400, 1600),
    ('ZONE_5', 'Zone V (Maritime)', 'Sud du pays, côte et basse plaine.', 800, 1200)
ON CONFLICT (zone_id) DO UPDATE SET 
    name = EXCLUDED.name, 
    description = EXCLUDED.description, 
    rainfall_min_mm = EXCLUDED.rainfall_min_mm, 
    rainfall_max_mm = EXCLUDED.rainfall_max_mm;
