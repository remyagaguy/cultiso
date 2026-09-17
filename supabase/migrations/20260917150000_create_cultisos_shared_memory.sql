-- Migration: 20260917150000_create_cultisos_shared_memory.sql

-- 1. Création de la table centrale "cultisos" (Le Jumeau Numérique / Mémoire Partagée)
CREATE TABLE cultisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT, -- ex: 'cultures_vivrieres', 'elevage', 'maraichage'
  status TEXT DEFAULT 'draft', -- ex: 'draft' (Cultiplan), 'active' (Cultima)
  surface_area NUMERIC,
  surface_unit TEXT, -- ex: 'ha', 'm2'
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Sécurité (RLS) pour la table cultisos
ALTER TABLE cultisos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Les utilisateurs peuvent voir leurs propres cultisos"
  ON cultisos FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent insérer leurs propres cultisos"
  ON cultisos FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent modifier leurs propres cultisos"
  ON cultisos FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres cultisos"
  ON cultisos FOR DELETE USING (auth.uid() = user_id);

-- 3. Trigger pour la mise à jour automatique de updated_at
CREATE TRIGGER update_cultisos_modtime
  BEFORE UPDATE ON cultisos
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

-- 4. Lier la table existante business_plans (Cultiplan) à notre nouvelle mémoire centrale
ALTER TABLE business_plans 
ADD COLUMN cultiso_id UUID REFERENCES cultisos(id) ON DELETE CASCADE;

-- Optionnel: Ajouter un index pour accélérer les requêtes jointes
CREATE INDEX idx_business_plans_cultiso_id ON business_plans(cultiso_id);
