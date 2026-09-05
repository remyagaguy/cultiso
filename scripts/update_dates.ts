import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function updateDates() {
  console.log('Mise à jour des dates...');
  // Date cible: 24 août 2026
  const targetDate = new Date('2026-08-24T12:00:00Z').toISOString();
  
  const { error } = await supabase
    .from('price_records')
    .update({ record_date: targetDate })
    .neq('id', '00000000-0000-0000-0000-000000000000'); // match all existing records

  if (error) {
    console.error('Erreur:', error);
  } else {
    console.log('✅ Dates mises à jour avec succès au 24 août 2026.');
  }
}

updateDates();
