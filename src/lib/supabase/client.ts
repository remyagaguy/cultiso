import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Utilisation d'un singleton pour éviter la re-création du client côté navigateur
let supabase: SupabaseClient<Database> | undefined;

export function createClient() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('⚠️ Variables d\'environnement Supabase manquantes.');
      // En mode développement, on peut retourner un client mocké ou laisser planter selon le besoin.
      // Pour éviter le plantage immédiat si les variables ne sont pas encore définies :
      return createSupabaseClient<Database>('https://placeholder.supabase.co', 'placeholder');
    }

    supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  
  return supabase;
}
