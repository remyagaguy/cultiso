import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateAlimentaire() {
  console.log('Mise à jour des produits alimentaires...');
  
  await supabase
    .from('products')
    .update({ category: 'PRODUIT ALIMENTAIRE' })
    .in('name', ['Tapioca', 'Huile', 'Sel', 'Gari']);
    
  console.log('✅ Gari, Tapioca, Huile et Sel sont classés dans PRODUIT ALIMENTAIRE.');
}

updateAlimentaire();
