import React from 'react';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioCardsProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioCards({ label, options, value, onChange, className = '' }: RadioCardsProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-white text-sm font-semibold tracking-wide mb-1">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                isSelected 
                  ? 'bg-[#22c55e]/10 border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {option.icon && (
                <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isSelected ? 'border-[#22c55e]/30 text-[#22c55e] bg-[#22c55e]/10' : 'border-white/10 text-white/40 bg-white/5'
                }`}>
                  {option.icon}
                </div>
              )}
              <div className="flex-1">
                <div className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-white/50 text-xs mt-1 leading-relaxed">
                    {option.description}
                  </div>
                )}
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isSelected ? 'border-[#22c55e]' : 'border-white/20'
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
