import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  const { data: p } = await supabase.from('products').select('*').in('category', ['CEREALE', 'TUBERCULE', 'MARAICHER', 'LEGUMINEUSE']);
  if (!p) return;
  const pIds = p.map(x => x.id);
  
  const { data: r } = await supabase.from('price_records')
    .select('id, price, location, record_date, product:products(name, default_unit, category)')
    .in('product_id', pIds)
    .gte('price', 3000);
    
  if (!r) return;
  
  const suspicious = r.filter(x => {
    const unit = (x.product as any).default_unit?.toLowerCase();
    return ['bol', 'kg', 'tas'].includes(unit);
  });
  
  suspicious.forEach(x => {
    const prod = x.product as any;
    console.log(`${x.id} | ${prod.name} (${prod.default_unit}) [${prod.category}] : ${x.price} FCFA - ${x.location} (${x.record_date})`);
  });
  console.log('Total suspects:', suspicious.length);
  process.exit(0);
}
check();
