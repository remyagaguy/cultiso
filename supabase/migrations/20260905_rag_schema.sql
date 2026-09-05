-- Activer l'extension pgvector pour la recherche sémantique
CREATE EXTENSION IF NOT EXISTS vector;

-- Créer la table des connaissances RAG
CREATE TABLE IF NOT EXISTS cultisia_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_hash TEXT NOT NULL, -- Pour vérifier les doublons
  chunk_index INTEGER NOT NULL, -- Numéro du morceau dans le fichier
  content TEXT NOT NULL, -- Le texte extrait
  metadata JSONB DEFAULT '{}'::jsonb, -- Catégorie, date, etc.
  embedding vector(384), -- Les vecteurs générés (384 dimensions pour le modèle local all-MiniLM-L6-v2)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activer la politique de sécurité (RLS)
ALTER TABLE cultisia_knowledge ENABLE ROW LEVEL SECURITY;

-- Autoriser la lecture publique (si nécessaire pour l'IA côté client)
CREATE POLICY "Les connaissances sont lisibles par tous"
  ON cultisia_knowledge FOR SELECT USING (true);

-- L'insertion sera faite par le service_role, donc pas besoin d'une politique d'INSERT publique.

-- Créer un index pour accélérer la recherche par similarité (HNSW)
CREATE INDEX ON cultisia_knowledge USING hnsw (embedding vector_cosine_ops);

-- Fonction pour chercher les documents similaires (Similarity Search)
CREATE OR REPLACE FUNCTION match_cultisia_knowledge (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  file_name text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    cultisia_knowledge.id,
    cultisia_knowledge.file_name,
    cultisia_knowledge.content,
    cultisia_knowledge.metadata,
    1 - (cultisia_knowledge.embedding <=> query_embedding) AS similarity
  FROM cultisia_knowledge
  WHERE 1 - (cultisia_knowledge.embedding <=> query_embedding) > match_threshold
  ORDER BY cultisia_knowledge.embedding <=> query_embedding
  LIMIT match_count;
$$;
