"use client";

import React, { useState, useEffect } from 'react';
import { ProjectStep } from './steps/ProjectStep';
import { InvestStep } from './steps/InvestStep';
import { OpExStep } from './steps/OpExStep';
import { SalesStep } from './steps/SalesStep';
import { ResultsStep } from './steps/ResultsStep';

const STEPS = [
  { id: 'project', title: 'Le Projet', component: ProjectStep },
  { id: 'invest', title: 'Investissements', component: InvestStep },
  { id: 'opex', title: 'Charges', component: OpExStep },
  { id: 'sales', title: 'Ventes', component: SalesStep },
  { id: 'results', title: 'Bilan', component: ResultsStep },
];

export function Wizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(i => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentStepComponent = STEPS[currentStepIndex].component;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  if (!isClient) return null; // Avoid hydration issues

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full">
      {/* Stepper UI (Plain-inspired minimal stepper) */}
      <div className="mb-10 mt-4">
        <div className="flex justify-between items-center mb-4 gap-2">
          {STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.id} className="flex-1">
                <div className="text-[9px] uppercase tracking-widest font-semibold mb-2">
                  <span className={`${isActive || isCompleted ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/10 relative overflow-hidden">
                  {(isActive || isCompleted) && (
                    <div className={`absolute inset-0 bg-[#22c55e] ${isActive ? 'w-1/2 transition-all duration-500 shadow-[0_0_10px_#22c55e]' : 'w-full'}`}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10">
          <CurrentStepComponent />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button 
          onClick={goToPrev}
          disabled={isFirstStep}
          className={`px-6 py-3.5 font-semibold rounded-xl border transition-all ${
            isFirstStep 
              ? 'opacity-0 pointer-events-none' 
              : 'border-white/10 text-white hover:bg-white/5 hover:border-white/30'
          }`}
        >
          Retour
        </button>
        
        {!isLastStep && (
          <button 
            onClick={goToNext}
            className="px-8 py-3.5 font-semibold rounded-xl bg-[#22c55e] hover:bg-[#1fb254] text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-[0.98] flex items-center gap-2"
          >
            Continuer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
