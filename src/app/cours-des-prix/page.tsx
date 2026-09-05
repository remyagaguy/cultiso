import { createClient } from '@supabase/supabase-js';
import PriceDashboard from '@/components/cours-des-prix/PriceDashboard';
import MarketTicker from '@/components/cours-des-prix/MarketTicker';
import { Product, PriceRecord } from '@/types/prices';

// Configuration serveur Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Empêche Next.js de mettre en cache cette page statiquement (car les prix évoluent)
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cours des prix | Cultiso',
  description: 'Suivez les cours des prix des céréales et intrants sur les marchés agricoles.',
};

export default async function CoursDesPrixPage() {
  let products: Product[] = [];
  let locations: string[] = [];
  let initialData: PriceRecord[] = [];

  try {
    // 1. Récupération des produits pour les filtres
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (productsError) {
      console.error('Erreur récupération produits:', productsError);
    } else {
      products = (productsData || []) as Product[];
    }

    // 2. Récupération des localisations uniques pour les filtres
    const { data: locationsData, error: locationsError } = await supabase
      .from('price_records')
      .select('location')
      .not('location', 'is', null);

    if (locationsError) {
      console.error('Erreur récupération localisations:', locationsError);
    } else if (locationsData) {
      const locationsSet = new Set<string>();
      locationsData.forEach(item => {
        if (item.location) locationsSet.add(item.location);
      });
      locations = Array.from(locationsSet).sort();
    }

    // 3. Récupération des relevés initiaux (les 100 derniers)
    const { data: initialRecords, error: recordsError } = await supabase
      .from('price_records')
      .select(`
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
      `)
      .order('record_date', { ascending: false })
      .limit(100);

    if (recordsError) {
      console.error('Erreur récupération relevés:', recordsError);
    } else if (initialRecords) {
      const hiddenCategories = ['SERVICE AGRICOLE', 'CHARGE FIXE', 'INTRANT', 'SEMENCE'];
      const filtered = (initialRecords as unknown as PriceRecord[]).filter(
        r => r.product && !hiddenCategories.includes(r.product.category)
      );
      initialData = filtered;
    }

    console.log('--- SERVER PAGE FETCH ---');
    console.log('URL:', supabaseUrl ? 'OK' : 'MISSING');
    console.log('KEY:', supabaseKey ? 'OK' : 'MISSING');
    console.log('Products fetched:', products.length);
    console.log('Locations fetched:', locations.length);
    console.log('Records fetched:', initialData.length);
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

        <PriceDashboard 
          initialProducts={products}
          initialLocations={locations}
          initialData={initialData}
        />
      </div>
    </div>
  );
}
