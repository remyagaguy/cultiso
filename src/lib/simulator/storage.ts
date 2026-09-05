// src/lib/simulator/storage.ts
import { SimulatorState, INITIAL_SIMULATOR_STATE } from './types';

const STORAGE_KEY = 'cultiplan_simulator_state';

export function loadSimulatorState(): SimulatorState {
  if (typeof window === 'undefined') return INITIAL_SIMULATOR_STATE;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Fusionne l'état sauvegardé avec l'état initial pour éviter des clés manquantes
      // si la structure de données évolue.
      return { ...INITIAL_SIMULATOR_STATE, ...JSON.parse(saved) } as SimulatorState;
    }
  } catch (error) {
    console.error("Failed to load simulator state:", error);
  }
  return INITIAL_SIMULATOR_STATE;
}

export function saveSimulatorState(state: SimulatorState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save simulator state:", error);
  }
}

export function clearSimulatorState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
