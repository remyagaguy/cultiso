import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function fixAnomalies() {
  console.log('Recherche des anomalies (Maïs à 8000 FCFA)...');
  
  // 1. Récupérer l'ID du produit Maïs
  const { data: product, error: pErr } = await supabase
    .from('products')
    .select('id')
    .eq('name', 'Maïs')
    .maybeSingle();

  if (pErr || !product) {
    console.error('Produit Maïs introuvable', pErr);
    return;
  }

  // 2. Supprimer les relevés où le prix est >= 8000 pour le Maïs
  const { data: deleted, error: dErr } = await supabase
    .from('price_records')
    .delete()
    .eq('product_id', product.id)
    .gte('price', 8000)
    .select();

  if (dErr) {
    console.error('Erreur lors de la suppression:', dErr);
  } else {
    console.log(`✅ ${deleted?.length || 0} relevé(s) supprimé(s).`);
    console.log(deleted);
  }
  process.exit(0);
}

fixAnomalies();
