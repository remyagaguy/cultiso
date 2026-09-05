import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const data = [
  // 07 MARS 2026 (SEMENCES - TOGO)
  { "product": "Semence Maïs", "category": "SEMENCE", "price": 625, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Riz", "category": "SEMENCE", "price": 550, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Sorgho", "category": "SEMENCE", "price": 800, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Fonio", "category": "SEMENCE", "price": 600, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Sésame", "category": "SEMENCE", "price": 2500, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Niébé", "category": "SEMENCE", "price": 800, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Soja", "category": "SEMENCE", "price": 700, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },
  { "product": "Semence Arachide", "category": "SEMENCE", "price": 800, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-03-07T12:00:00Z" },

  // 17 MARS & 26 FEVR 2026 (NOIX DE CAJOU - TOGO)
  { "product": "Noix de cajou (Bord champ)", "category": "RENTE", "price": 350, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-02-26T12:00:00Z" },
  { "product": "Noix de cajou (Livraison usine)", "category": "RENTE", "price": 400, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2026-02-26T12:00:00Z" },
  { "product": "Noix de cajou (Bord champ)", "category": "RENTE", "price": 425, "unit": "kg", "location": "Togo", "country": "Togo", "date": "2025-03-17T12:00:00Z" } // Rétroactif 2025 mentionné
];

async function insertData() {
  console.log('Début de l\'insertion des données de Semences et Cajou (2026)...');
  
  const productMap = new Map<string, string>();
  for (const item of data) {
    if (!productMap.has(item.product)) {
      const { data: existing, error } = await supabase
        .from('products')
        .select('id')
        .eq('name', item.product)
        .maybeSingle();
        
      if (existing) {
        productMap.set(item.product, existing.id);
      } else {
        const id = crypto.randomUUID();
        const { error: insErr } = await supabase.from('products').insert({
          id,
          name: item.product,
          category: item.category,
          default_unit: item.unit
        });
        if (insErr) {
            console.error('Erreur produit:', item.product, insErr);
        } else {
            productMap.set(item.product, id);
        }
      }
    }
  }

  const records = data.map(item => ({
    id: crypto.randomUUID(),
    product_id: productMap.get(item.product),
    price: item.price,
    currency: 'FCFA',
    location: item.location,
    country: item.country,
    record_date: item.date,
    source: `Agridigitale (${item.date.split('T')[0]})`
  })).filter(r => r.product_id);

  const { error } = await supabase.from('price_records').insert(records);
  if (error) {
    console.error('Erreur lors de l\'insertion des prix:', error);
  } else {
    console.log(`✅ ${records.length} relevés insérés avec succès.`);
  }
}

insertData();
