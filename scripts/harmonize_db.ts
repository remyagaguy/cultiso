import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function harmonize() {
  const { data: products } = await supabase.from('products').select('*');
  if (!products) return;

  // Règles de fusion : { "Nom à supprimer": "Nom principal à conserver/renommer" }
  const merges: Record<string, string> = {
    'Maïs (Maïs ancien)': 'Maïs ancien',
    'Nouveau maïs': 'Maïs nouveau',
    'Maïs (Nouveau maïs)': 'Maïs nouveau',
    'Tomate fraîche': 'Tomate',
    'Riz local (Kovié)': 'Riz local',
    'Piment vert ': 'Piment vert', // au cas où espace
  };

  const nameMap = new Map(products.map(p => [p.name.trim(), p]));

  for (const [sourceName, targetName] of Object.entries(merges)) {
    // 1. Chercher le produit source
    const sourceProd = products.find(p => p.name.trim().toLowerCase() === sourceName.toLowerCase());
    
    if (!sourceProd) {
      console.log(`Source '${sourceName}' introuvable, on ignore.`);
      continue;
    }

    // 2. Chercher ou créer le produit cible
    let targetProd = products.find(p => p.name.trim().toLowerCase() === targetName.toLowerCase());
    
    if (!targetProd) {
      // Si la cible n'existe pas encore (ex: Maïs nouveau), on renomme simplement la source
      console.log(`Renommage : '${sourceProd.name}' -> '${targetName}'`);
      await supabase.from('products').update({ name: targetName }).eq('id', sourceProd.id);
      // Mettre à jour la liste locale pour la suite
      sourceProd.name = targetName;
      continue;
    }

    if (sourceProd.id === targetProd.id) continue;

    console.log(`Fusion : transfert des prix de '${sourceProd.name}' vers '${targetProd.name}'`);
    
    // 3. Transférer les price_records
    await supabase.from('price_records').update({ product_id: targetProd.id }).eq('product_id', sourceProd.id);

    // 4. Supprimer le produit source
    await supabase.from('products').delete().eq('id', sourceProd.id);
  }

  // Renommages simples supplémentaires qui ne sont pas des fusions
  const renames = [
    { old: 'Piment (Aneto)', new: 'Piment Aneto' },
    { old: 'Piment (Basorto)', new: 'Piment Basorto' },
    { old: 'Piment (Guanaco)', new: 'Piment Guanaco' },
  ];
  for (const r of renames) {
    const p = products.find(prod => prod.name === r.old);
    if (p) {
      await supabase.from('products').update({ name: r.new }).eq('id', p.id);
      console.log(`Renommé : ${r.old} -> ${r.new}`);
    }
  }

  console.log('Harmonisation terminée.');
  process.exit(0);
}

harmonize();
