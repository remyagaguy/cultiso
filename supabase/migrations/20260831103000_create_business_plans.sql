-- Migration: 20260831103000_create_business_plans.sql

CREATE TABLE business_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  market_data JSONB DEFAULT '{}'::jsonb,
  technical_data JSONB DEFAULT '{}'::jsonb,
  financial_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Active le Row Level Security (RLS) sur la table
ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs ne peuvent voir que leurs propres projets
CREATE POLICY "Les utilisateurs peuvent voir leurs propres projets"
  ON business_plans
  FOR SELECT
  USING (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent insérer leurs propres projets
CREATE POLICY "Les utilisateurs peuvent insérer leurs propres projets"
  ON business_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent modifier leurs propres projets
CREATE POLICY "Les utilisateurs peuvent modifier leurs propres projets"
  ON business_plans
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent supprimer leurs propres projets
CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres projets"
  ON business_plans
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger pour mettre à jour automatiquement le champ updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_business_plans_modtime
  BEFORE UPDATE ON business_plans
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();
