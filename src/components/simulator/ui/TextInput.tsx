import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function TextInput({ label, description, className = '', ...props }: TextInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-white text-sm font-semibold tracking-wide">
        {label}
      </label>
      {description && <span className="text-[#6B857E] text-xs">{description}</span>}
      <input
        {...props}
        className={`bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all hover:bg-white/10`}
      />
    </div>
  );
}
