import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
async function test() {
  const { data, error } = await supabase
    .from('price_records')
    .select('id, product:products!inner(category)')
    .eq('products.category', 'INTRANT')
    .limit(1);
  console.log('Test products.category:', JSON.stringify({ data, error }));
  
  const { data: d2, error: e2 } = await supabase
    .from('price_records')
    .select('id, product:products!inner(category)')
    .eq('product.category', 'INTRANT')
    .limit(1);
  console.log('Test product.category:', JSON.stringify({ data: d2, error: e2 }));
}
test();
