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

async function restore() {
  const backupPath = path.join(process.cwd(), 'supabase_backup.json');
  if (!fs.existsSync(backupPath)) {
    console.error("Erreur: Fichier supabase_backup.json introuvable !");
    process.exit(1);
  }

  console.log("Lecture du fichier de sauvegarde...");
  const rawData = fs.readFileSync(backupPath, 'utf8');
  const backupData = JSON.parse(rawData);

  const { products, price_records, business_plans } = backupData;

  console.log(`Données trouvées : ${products.length} produits, ${price_records.length} prix, ${business_plans.length} business plans.`);

  // 1. Restaurer les produits
  if (products && products.length > 0) {
    console.log("Restauration des produits...");
    const { error: prodErr } = await supabase.from('products').upsert(products);
    if (prodErr) {
      console.error("Erreur lors de la restauration des produits:", prodErr);
    } else {
      console.log("✅ Produits restaurés.");
    }
  }

  // 2. Restaurer les prix
  if (price_records && price_records.length > 0) {
    console.log("Restauration des prix en cours (par lots pour éviter les timeouts)...");
    
    // Découpage en lots de 100
    const chunkSize = 100;
    for (let i = 0; i < price_records.length; i += chunkSize) {
      const chunk = price_records.slice(i, i + chunkSize);
      const { error: priceErr } = await supabase.from('price_records').upsert(chunk);
      if (priceErr) {
        console.error(`Erreur sur le lot ${i/chunkSize + 1}:`, priceErr);
      }
    }
    console.log("✅ Relevés de prix restaurés.");
  }

  // 3. Restaurer les business plans (si existants)
  if (business_plans && business_plans.length > 0) {
    console.log("Restauration des business plans...");
    const { error: bpErr } = await supabase.from('business_plans').upsert(business_plans);
    if (bpErr) {
      console.error("Erreur lors de la restauration des business plans:", bpErr);
    } else {
      console.log("✅ Business plans restaurés.");
    }
  }

  console.log("\n🎉 Restauration complète terminée !");
}

restore();
