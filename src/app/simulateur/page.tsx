import React from 'react';
import { Wizard } from '@/components/simulator/Wizard';
import { SimulatorProvider } from '@/lib/simulator/SimulatorContext';
import Link from 'next/link';

export const metadata = {
  title: 'Cultiplan - Simulateur',
  description: 'Tunnel de création de business plan agricole.',
};

export default function SimulatorPage() {
  return (
    <SimulatorProvider>
      <div className="flex-grow flex flex-col relative bg-[#052821] overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#052821] via-[#052821]/95 to-[#052821]/80 z-10"></div>
          <img 
            src="/hero-bg.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-30" 
          />
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[100px] pointer-events-none z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#D35400]/10 rounded-full blur-[100px] pointer-events-none z-10"></div>

        {/* Wizard Container */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 lg:py-12 relative z-20">
          <Wizard />
        </div>
      </div>
    </SimulatorProvider>
  );
}
