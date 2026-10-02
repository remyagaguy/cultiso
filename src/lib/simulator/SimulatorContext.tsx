"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SimulatorState, INITIAL_SIMULATOR_STATE, ProjectInfo, Capex, Opex, Sales, AgronomicParameters } from './types';
import { loadSimulatorState, saveSimulatorState } from './storage';

interface SimulatorContextProps {
  state: SimulatorState;
  updateProject: (data: Partial<ProjectInfo>) => void;
  updateCapex: (data: Partial<Capex>) => void;
  updateOpex: (data: Partial<Opex>) => void;
  updateSales: (data: Partial<Sales>) => void;
  updateAgronomicParams: (data: Partial<AgronomicParameters>) => void;
  resetState: () => void;
}

const SimulatorContext = createContext<SimulatorContextProps | undefined>(undefined);

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SimulatorState>(INITIAL_SIMULATOR_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(loadSimulatorState());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveSimulatorState(state);
    }
  }, [state, isLoaded]);

  const updateProject = (data: Partial<ProjectInfo>) => {
    setState(prev => ({ ...prev, project: { ...prev.project, ...data } }));
  };

  const updateCapex = (data: Partial<Capex>) => {
    setState(prev => ({ ...prev, capex: { ...prev.capex, ...data } }));
  };

  const updateOpex = (data: Partial<Opex>) => {
    setState(prev => ({ ...prev, opex: { ...prev.opex, ...data } }));
  };

  const updateSales = (data: Partial<Sales>) => {
    setState(prev => ({ ...prev, sales: { ...prev.sales, ...data } }));
  };

  const updateAgronomicParams = (data: Partial<AgronomicParameters>) => {
    setState(prev => ({ ...prev, agronomicParams: { ...prev.agronomicParams, ...data } }));
  };

  const resetState = () => {
    setState(INITIAL_SIMULATOR_STATE);
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#061510]"></div>;

  return (
    <SimulatorContext.Provider value={{ state, updateProject, updateCapex, updateOpex, updateSales, updateAgronomicParams, resetState }}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const context = useContext(SimulatorContext);
  if (context === undefined) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
}
