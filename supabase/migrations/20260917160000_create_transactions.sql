-- Création de la table transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cultiso_id UUID NOT NULL REFERENCES public.cultisos(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    category TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour accélérer les requêtes de filtrage
CREATE INDEX idx_transactions_cultiso_id ON public.transactions(cultiso_id);
CREATE INDEX idx_transactions_date ON public.transactions(date);

-- Activation du Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (L'utilisateur ne voit que les transactions de ses propres Cultisos)
-- Note: cultisos table has user_id, so we need to join or use a subquery

CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.cultisos c 
    WHERE c.id = transactions.cultiso_id 
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their own transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cultisos c 
    WHERE c.id = transactions.cultiso_id 
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own transactions" 
ON public.transactions 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.cultisos c 
    WHERE c.id = transactions.cultiso_id 
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own transactions" 
ON public.transactions 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.cultisos c 
    WHERE c.id = transactions.cultiso_id 
    AND c.user_id = auth.uid()
  )
);
