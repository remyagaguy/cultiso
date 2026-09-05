'use client';

import { useMemo } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import { PriceRecord } from '@/types/prices';

export default function MarketTicker({ data }: { data: PriceRecord[] }) {
  const tickerData = useMemo(() => {
    // Calculer les variations pour les derniers produits ajoutés.
    const productGroups = new Map<string, PriceRecord[]>();
    
    data.forEach(record => {
      if (!record.product) return;
      const hiddenCategories = ['SERVICE AGRICOLE', 'CHARGE FIXE', 'INTRANT', 'SEMENCE'];
      if (hiddenCategories.includes(record.product.category)) return;

      const key = `${record.product.id}-${record.location}`;
      if (!productGroups.has(key)) {
        productGroups.set(key, []);
      }
      productGroups.get(key)!.push(record);
    });

    const pulses = Array.from(productGroups.values())
      .map(records => {
        const current = records[0];
        const previous = records.length > 1 ? records[1] : null;
        
        let diff = 0;
        let percent = 0;
        if (previous) {
          diff = current.price - previous.price;
          percent = (diff / previous.price) * 100;
        }

        return {
          id: `${current.id}`,
          productName: current.product?.name,
          location: current.location,
          price: current.price,
          unit: current.product?.default_unit || 'unité',
          diff,
          percent
        };
      })
      .slice(0, 15); // Prendre plus d'éléments pour le ticker

    return pulses;
  }, [data]);

  if (!tickerData.length) return null;

  return (
    <div className="w-full bg-[#052821] text-white border-b border-[#0B5345] overflow-hidden flex items-center h-10 select-none">
      <div className="flex animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused]">
        {/* On double le contenu pour avoir un défilement infini fluide */}
        {[...tickerData, ...tickerData].map((pulse, index) => {
          const isUp = pulse.diff > 0;
          const isDown = pulse.diff < 0;
          const colorClass = isUp ? 'text-[#22c55e]' : isDown ? 'text-[#D35400]' : 'text-white/60';
          
          return (
            <div key={`${pulse.id}-${index}`} className="flex items-center mx-6 gap-2">
              <span className="font-semibold text-[13px] uppercase tracking-wider text-white/90">
                {pulse.productName}
              </span>
              <span className="text-white/50 text-[11px] uppercase">
                ({pulse.location || 'Global'})
              </span>
              <span className="font-mono-numbers font-medium text-[14px] ml-1">
                {pulse.price.toLocaleString('fr-FR')} F
              </span>
              <span className={`flex items-center text-[12px] font-mono-numbers font-medium ml-1 ${colorClass}`}>
                {isUp ? <ArrowUpOutlined className="text-[10px] mr-1" /> : isDown ? <ArrowDownOutlined className="text-[10px] mr-1" /> : <MinusOutlined className="text-[10px] mr-1" />}
                {pulse.diff !== 0 ? `${pulse.percent.toFixed(1)}%` : '---'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
