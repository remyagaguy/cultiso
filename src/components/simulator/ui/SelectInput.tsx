import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  description?: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export function SelectInput({ label, description, value, options, onChange, disabled }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label className="text-white font-medium">{label}</label>
        {description && <span className="text-sm text-[#6B857E]">{description}</span>}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-[#0A1A14] border border-[#1A3329] text-white rounded-lg p-3 outline-none focus:border-[#D35400] transition-colors appearance-none"
        >
          <option value="" disabled>Sélectionnez une option</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
}
