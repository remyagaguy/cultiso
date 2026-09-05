import React from 'react';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  unit?: string;
}

export function NumberInput({ label, description, unit, className = '', ...props }: NumberInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-white text-sm font-semibold tracking-wide">
        {label}
      </label>
      {description && <span className="text-[#6B857E] text-xs">{description}</span>}
      <div className="relative">
        <input
          type="number"
          {...props}
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-unbounded text-lg placeholder-white/40 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all hover:bg-white/10 ${unit ? 'pr-16' : ''}`}
        />
        {unit && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-medium uppercase tracking-widest text-xs">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
