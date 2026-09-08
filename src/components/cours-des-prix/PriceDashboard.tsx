'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, PriceRecord } from '@/types/prices';
import { usePriceFilters } from '@/hooks/usePriceFilters';
import MarketFilters from './MarketFilters';
import PriceDataTable from './PriceDataTable';
import MarketPulseStrip from './MarketPulseStrip';
import TrendChart from './TrendChart';
import { getFilteredPrices } from '@/app/actions/priceActions';
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
      const { data: records, error } = await getFilteredPrices({
        productId: filters.productId,
        location: filters.location,
        category: filters.category
      });

      if (error) {
        console.error('Erreur Action:', error);
        return;
      }

      if (records) {
        setData(records);
      }
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
