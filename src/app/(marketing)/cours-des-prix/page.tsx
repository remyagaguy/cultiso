import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import PriceDashboard from '@/components/cours-des-prix/PriceDashboard';
import MarketTicker from '@/components/cours-des-prix/MarketTicker';
import { Product, PriceRecord } from '@/types/prices';

// Configuration serveur Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Cache la page (ISR) pendant 60 secondes au lieu de forcer le rendu dynamique à chaque visite
export const revalidate = 60;

export const metadata = {
  title: 'Cours des prix | Cultiso',
  description: 'Suivez les cours des prix des céréales et intrants sur les marchés agricoles.',
};

export default async function CoursDesPrixPage() {
  let products: Product[] = [];
  let locations: string[] = [];
  let initialData: PriceRecord[] = [];

  try {
    // Exécution en parallèle des requêtes pour diviser le temps de chargement par 3
    const [productsRes, locationsRes, recordsRes] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('price_records').select('location').not('location', 'is', null).limit(2000), // Limite pour la RAM
      supabase.from('price_records').select(`
        id,
        price,
        location,
        record_date,
        product_id,
        product:products (
          id,
          name,
          category,
          default_unit
        )
      `).order('record_date', { ascending: false }).limit(100)
    ]);

    if (productsRes.data) {
      products = productsRes.data as Product[];
    }

    if (locationsRes.data) {
      const locationsSet = new Set<string>();
      locationsRes.data.forEach(item => {
        if (item.location) locationsSet.add(item.location);
      });
      locations = Array.from(locationsSet).sort();
    }

    if (recordsRes.data) {
      const hiddenCategories = ['SERVICE AGRICOLE', 'CHARGE FIXE', 'INTRANT', 'SEMENCE'];
      const filtered = (recordsRes.data as unknown as PriceRecord[]).filter(
        r => r.product && !hiddenCategories.includes(r.product.category)
      );
      initialData = filtered;
    }
  } catch (err) {
    console.error('Erreur inattendue dans CoursDesPrixPage:', err);
  }

  return (
    <div className="flex-grow flex flex-col bg-gray-50 min-h-[calc(100vh-80px)]">
      <MarketTicker data={initialData} />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-unbounded">
            Cours des prix agricoles
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Consultez les derniers relevés de prix sur les marchés pour mieux piloter la rentabilité de votre exploitation.
          </p>
        </div>

        <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-500">Chargement des données du marché...</div>}>
          <PriceDashboard 
            initialProducts={products}
            initialLocations={locations}
            initialData={initialData}
          />
        </Suspense>
      </div>
    </div>
  );
}
