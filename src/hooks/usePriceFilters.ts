import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface PriceFilters {
  productId?: string;
  location?: string;
  category?: string;
}

export function usePriceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<PriceFilters>(() => {
    return {
      productId: searchParams.get('product') || undefined,
      location: searchParams.get('location') || undefined,
      category: searchParams.get('category') || undefined,
    };
  }, [searchParams]);

  const setFilter = useCallback(
    (key: keyof PriceFilters, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set(key === 'productId' ? 'product' : key, value);
      } else {
        params.delete(key === 'productId' ? 'product' : key);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    filters,
    setFilter,
    resetFilters,
  };
}
