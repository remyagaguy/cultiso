const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Reading data...");
  const rawData = fs.readFileSync('src/data/prix_extraits_togo.json', 'utf8');
  const data = JSON.parse(rawData);
  console.log(`Loaded ${data.length} records to import.`);
  
  // We don't want to insert duplicates, but for a one-time import, it's fine.
  // First, create standard products.
  const products = [
    { name: 'Maïs', category: 'Céréales', default_unit: 'kg' },
    { name: 'Maïs blanc', category: 'Céréales', default_unit: 'kg' },
    { name: 'Soya', category: 'Légumineuses', default_unit: 'kg' },
    { name: 'Soja', category: 'Légumineuses', default_unit: 'kg' },
    { name: 'Riz', category: 'Céréales', default_unit: 'kg' },
    { name: 'Poussins Goliath', category: 'Élevage', default_unit: 'unité' },
  ];
  
  for (const p of products) {
    const { data: existing, error: selErr } = await supabase.from('products').select('*').eq('name', p.name);
    if (!existing || existing.length === 0) {
      const { error: insErr } = await supabase.from('products').insert(p);
      if (insErr) console.error("Error inserting product:", insErr);
    }
  }
  
  // Actually, we can just let the AI use the JSON file directly. 
  // It's much simpler than managing a script to upload and update prices continuously, unless the user builds an admin panel.
  // But the user asked: "je veux que tu cree un lien en lien entre cultisia et toute la base de donné des prix pour qu'il puisse allez chercher les vrais prix"
}
run();
