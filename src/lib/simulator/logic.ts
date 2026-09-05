// src/lib/simulator/logic.ts
import { SimulatorState } from './types';

export function calculateTotalCapex(state: SimulatorState): number {
  return (state.capex.infrastructure || 0) + (state.capex.equipment || 0);
}

export function calculateTotalOpex(state: SimulatorState): number {
  return (state.opex.inputs || 0) + (state.opex.labor || 0);
}

export function calculateRevenue(state: SimulatorState): number {
  return (state.sales.expectedYield || 0) * (state.sales.unitPrice || 0);
}

export function calculateNetMargin(state: SimulatorState): number {
  const revenue = calculateRevenue(state);
  const opex = calculateTotalOpex(state);
  // Simplification MVP : Marge = Chiffre d'affaires - Charges d'exploitation
  return revenue - opex;
}

export function calculateROI(state: SimulatorState): number {
  const netMargin = calculateNetMargin(state);
  // Total engagé (Simplification MVP)
  const totalInvested = calculateTotalCapex(state) + calculateTotalOpex(state); 
  
  if (totalInvested === 0) return 0;
  return (netMargin / totalInvested) * 100;
}
