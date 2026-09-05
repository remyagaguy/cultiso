import { useMemo } from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import { PriceRecord } from '@/types/prices';

export default function MarketPulseStrip({ data }: { data: PriceRecord[] }) {
  const pulseData = useMemo(() => {
    // Calculer les variations pour les derniers produits ajoutés.
    // data est trié par date DESC (le plus récent en premier)
    // On va regrouper par produit+localisation et prendre les 2 prix les plus récents
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
      .slice(0, 6); // Prendre les 6 premiers "phares"

    return pulses;
  }, [data]);

  if (!pulseData.length) return null;

  return (
    <div className="w-full overflow-x-auto flex gap-4 pb-4 scrollbar-hide">
      {pulseData.map(pulse => {
        const isUp = pulse.diff > 0;
        const isDown = pulse.diff < 0;
        const color = isUp ? '#22c55e' : isDown ? '#D35400' : '#607166';
        
        return (
          <Card key={pulse.id} size="small" className="min-w-[220px] flex-shrink-0 shadow-sm border border-gray-200 bg-white rounded-[9px]" styles={{ body: { padding: '12px' }}}>
            <div className="text-xs text-gray-500 mb-1 truncate font-medium">{pulse.productName} • {pulse.location || 'Global'}</div>
            <div className="font-mono-numbers">
              <Statistic
                value={pulse.price}
                precision={0}
                valueStyle={{ color: color, fontSize: '1.25rem', fontWeight: 600 }}
              prefix={isUp ? <ArrowUpOutlined className="relative -top-[1px]" /> : isDown ? <ArrowDownOutlined className="relative -top-[1px]" /> : <MinusOutlined className="relative -top-[1px]" />}
              suffix={<span className="text-[11px] text-gray-400 font-normal ml-1">F/{pulse.unit}</span>}
              />
            </div>
            {pulse.diff !== 0 && (
              <div className="text-[11px] mt-1 font-mono-numbers" style={{ color: color, fontWeight: 500 }}>
                {isUp ? '+' : ''}{pulse.percent.toFixed(1)}% vs précédent
              </div>
            )}
            {pulse.diff === 0 && (
              <div className="text-[11px] mt-1 text-gray-400 font-mono-numbers">
                Prix stable
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
