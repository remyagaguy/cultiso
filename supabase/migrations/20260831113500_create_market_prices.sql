-- Migration: 20260831113500_create_market_prices.sql

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  default_unit TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE price_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'FCFA',
  location TEXT,
  record_date DATE NOT NULL,
  source TEXT NOT NULL,
  raw_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activation du Row Level Security (RLS) sur les tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_records ENABLE ROW LEVEL SECURITY;

-- 1. Politique : Lecture publique autorisée pour tous (anonyme et authentifié)
CREATE POLICY "Les produits sont visibles par tout le monde"
  ON products FOR SELECT USING (true);

CREATE POLICY "Les prix sont visibles par tout le monde"
  ON price_records FOR SELECT USING (true);

-- 2. Politique : Insertion bloquée pour le public.
-- Par défaut, ne définir aucune politique d'INSERT bloque les écritures depuis les clients web
-- via l'anon_key.
-- L'administration et l'IA devront utiliser la 'service_role key' (qui contourne le RLS) 
-- ou un rôle personnalisé pour insérer les données.
