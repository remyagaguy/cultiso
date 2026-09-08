'use server';

import { createClient } from '@supabase/supabase-js';
import { PriceRecord } from '@/types/prices';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getFilteredPrices(filters: { productId?: string; location?: string; category?: string }) {
  try {
    let query = supabase
      .from('price_records')
      .select(`
        id,
        price,
        location,
        country,
        record_date,
        product_id,
        created_at,
        product:products!inner (
          id,
          name,
          category,
          default_unit
        )
      `)
      .order('record_date', { ascending: false });

    if (filters.productId) {
      query = query.eq('product_id', filters.productId);
    }
    
    if (filters.location) {
      query = query.eq('location', filters.location);
    }
    
    if (filters.category) {
      query = query.eq('product.category', filters.category);
    }

    const { data: records, error } = await query.limit(500);

    if (error) {
      console.error('Erreur Supabase dans Server Action:', error);
      return { error: error.message };
    }

    const hiddenCategories = ['SERVICE AGRICOLE', 'CHARGE FIXE', 'INTRANT', 'SEMENCE'];

    let finalData = (records || []) as unknown as PriceRecord[];

    // Filtrer les catégories qui n'ont rien à faire dans le dashboard des prix du marché
    finalData = finalData.filter(r => r.product && !hiddenCategories.includes(r.product.category));

    if (filters.category) {
      finalData = finalData.filter(r => r.product && r.product.category === filters.category);
    }

    return { data: finalData };
  } catch (err: any) {
    console.error('Erreur inattendue dans Server Action:', err);
    return { error: err.message || 'Erreur inattendue' };
  }
}
