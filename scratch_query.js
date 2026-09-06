const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

async function run() {
  const combinedQuery = "combien coute le mais a kara";
  const normalizedQuery = removeAccents(combinedQuery);
  
  const { data: allProducts } = await supabase.from('products').select('*');
  
  let dbPriceContext = "";
  if (allProducts) {
    const matchedProducts = allProducts.filter(p => {
       const normName = removeAccents(p.name);
       // Check if word is in query (simple matching)
       return normalizedQuery.includes(normName);
    });
    
    for (const p of matchedProducts) {
      const { data: prices } = await supabase.from('price_records')
         .select('*')
         .eq('product_id', p.id)
         .order('record_date', { ascending: false })
         .limit(3);
         
      if (prices && prices.length > 0) {
         prices.forEach(pr => {
            dbPriceContext += `- ${p.name}: ${pr.price} ${pr.currency} / ${p.default_unit} (Lieu: ${pr.location || 'Non précisé'}, Date: ${pr.record_date})\n`;
         });
      }
    }
  }
  
  console.log("FOUND PRICES:");
  console.log(dbPriceContext);
}
run();
