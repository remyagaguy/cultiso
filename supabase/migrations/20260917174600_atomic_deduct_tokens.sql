-- Fonction RPC pour déduire les tokens de manière atomique
-- SECURITY DEFINER permet à la fonction d'outrepasser le RLS et d'écrire dans auth.users
CREATE OR REPLACE FUNCTION deduct_tokens(deduction_amount INT)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id UUID;
  current_metadata JSONB;
  current_balance INT;
  new_balance INT;
BEGIN
  -- 1. Récupérer l'ID de l'utilisateur connecté via le JWT
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 2. Verrouiller la ligne de l'utilisateur pour éviter les race conditions (FOR UPDATE)
  SELECT raw_app_meta_data INTO current_metadata
  FROM auth.users
  WHERE id = current_user_id
  FOR UPDATE;

  -- 3. Lire le solde actuel (ou 0 par défaut)
  current_balance := COALESCE((current_metadata->>'tokens_balance')::INT, 0);
  
  -- 4. Calculer le nouveau solde
  new_balance := current_balance - deduction_amount;

  -- 5. Mettre à jour atomiquement le JSONB
  UPDATE auth.users
  SET raw_app_meta_data = jsonb_set(
      COALESCE(current_metadata, '{}'::jsonb), 
      '{tokens_balance}', 
      to_jsonb(new_balance)
  )
  WHERE id = current_user_id;

  -- 6. Retourner le nouveau solde
  RETURN new_balance;
END;
$$;
