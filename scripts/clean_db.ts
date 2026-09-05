import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function cleanData() {
  console.log('Suppression des anciens relevés de prix...');
  const { error: err1 } = await supabase.from('price_records').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err1) console.error(err1);
  
  console.log('Suppression des anciens produits...');
  const { error: err2 } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (err2) console.error(err2);

  console.log('Nettoyage terminé !');
}

cleanData();
