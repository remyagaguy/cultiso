import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const wholesaleData = [
  { name: 'Maïs blanc (Sac 100kg)', category: 'CEREALE', unit: 'sac', price: 40000, location: 'Hédzranawoé (Lomé)', date: '2025-03-03' },
  { name: 'Maïs rouge (Sac 100kg)', category: 'CEREALE', unit: 'sac', price: 45000, location: 'Hédzranawoé (Lomé)', date: '2025-03-03' },
  { name: 'Riz local (Sac 25kg)', category: 'CEREALE', unit: 'sac', price: 18500, location: 'Lomé', date: '2024-12-09' },
  { name: 'Maïs (Sac 50kg)', category: 'CEREALE', unit: 'sac', price: 8000, location: 'Mango', date: '2026-06-23' }
];

async function recoverWholesale() {
  for (const item of wholesaleData) {
    // 1. Créer ou récupérer le produit de gros
    let { data: product } = await supabase.from('products').select('id').eq('name', item.name).maybeSingle();
    
    if (!product) {
      const id = crypto.randomUUID();
      await supabase.from('products').insert({
        id,
        name: item.name,
        category: item.category,
        default_unit: item.unit
      });
      product = { id };
    }

    // 2. Insérer le prix
    await supabase.from('price_records').insert({
      id: crypto.randomUUID(),
      product_id: product.id,
      price: item.price,
      currency: 'FCFA',
      location: item.location,
      country: 'Togo',
      record_date: item.date,
      source: 'Agridigitale (Récupération prix de gros)'
    });
    
    console.log(`Réinséré : ${item.name} à ${item.price} FCFA (${item.location})`);
  }
  process.exit(0);
}

recoverWholesale();
