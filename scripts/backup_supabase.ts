import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erreur: Il manque les clés Supabase dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function backup() {
  console.log("Sauvegarde des produits en cours...");
  const { data: products, error: prodErr } = await supabase.from('products').select('*');
  if (prodErr) console.error("Erreur lors de la récupération des produits:", prodErr);

  console.log("Sauvegarde des prix en cours...");
  const { data: price_records, error: priceErr } = await supabase.from('price_records').select('*');
  if (priceErr) console.error("Erreur lors de la récupération des prix:", priceErr);
  
  console.log("Sauvegarde des business plans en cours...");
  const { data: business_plans, error: bpErr } = await supabase.from('business_plans').select('*');
  if (bpErr && bpErr.code !== '42P01') { 
    console.error("Erreur lors de la récupération des business plans:", bpErr);
  }

  const backupData = {
    date_export: new Date().toISOString(),
    products: products || [],
    price_records: price_records || [],
    business_plans: business_plans || []
  };

  const backupPath = path.join(process.cwd(), 'supabase_backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
  
  console.log(`\n✅ Sauvegarde terminée avec succès !`);
  console.log(`Fichier généré : ${backupPath}`);
  console.log(`Statistiques :`);
  console.log(`- ${products?.length || 0} produits`);
  console.log(`- ${price_records?.length || 0} relevés de prix`);
  console.log(`- ${business_plans?.length || 0} business plans`);
}

backup();
