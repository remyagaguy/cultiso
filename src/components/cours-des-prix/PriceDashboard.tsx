'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, PriceRecord } from '@/types/prices';
import { usePriceFilters } from '@/hooks/usePriceFilters';
import MarketFilters from './MarketFilters';
import PriceDataTable from './PriceDataTable';
import MarketPulseStrip from './MarketPulseStrip';
import TrendChart from './TrendChart';
import { createClient } from '@supabase/supabase-js';

// Configuration locale temporaire ou via vars d'env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

import { ConfigProvider } from 'antd';

interface PriceDashboardProps {
  initialProducts: Product[];
  initialLocations: string[];
  initialData: PriceRecord[];
}

export default function PriceDashboard({
  initialProducts,
  initialLocations,
  initialData
}: PriceDashboardProps) {
  const { filters, setFilter, resetFilters } = usePriceFilters();
  const [data, setData] = useState<PriceRecord[]>(initialData);
  const [loading, setLoading] = useState(false);

  const fetchFilteredData = useCallback(async () => {
    setLoading(true);
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
        console.error('Erreur Supabase:', error);
        return;
      }

      const hiddenCategories = ['SERVICE AGRICOLE', 'CHARGE FIXE', 'INTRANT', 'SEMENCE'];

      let finalData = (records || []) as unknown as PriceRecord[];

      // Filtrer les catégories qui n'ont rien à faire dans le dashboard des prix du marché
      finalData = finalData.filter(r => r.product && !hiddenCategories.includes(r.product.category));

      if (filters.category) {
        finalData = finalData.filter(r => r.product && r.product.category === filters.category);
      }

      setData(finalData);
    } catch (err) {
      console.error('Erreur inattendue:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const hasActiveFilters = filters.productId || filters.location || filters.category;
    if (hasActiveFilters) {
      fetchFilteredData();
    } else {
      setData(initialData);
    }
  }, [filters, initialData, fetchFilteredData]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#D35400',
          borderRadius: 8,
          fontFamily: 'var(--font-manrope)',
        },
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        {/* Sidebar (Filtres) */}
        <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0 lg:sticky lg:top-24">
          <MarketFilters
            products={initialProducts}
            locations={initialLocations}
            filters={filters}
            onFilterChange={setFilter}
            onReset={resetFilters}
          />
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 w-full flex flex-col gap-6 min-w-0">
          <MarketPulseStrip data={data} />
          
          {filters.productId && (
            <TrendChart data={data.filter(r => r.product_id === filters.productId)} />
          )}

          <PriceDataTable 
            data={data}
            loading={loading}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
