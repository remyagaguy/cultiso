import { SimulatorState } from './types';

export function calculateAgronomicYield(state: SimulatorState): number {
  const { agronomicParams, project } = state;
  
  // Si on n'a pas les paramètres de base, on garde la valeur saisie (fallback)
  if (!agronomicParams.waterProductivity || !agronomicParams.harvestIndex) {
    return state.sales.expectedYield || 0; 
  }

  const wp = agronomicParams.waterProductivity; // g/m2
  const hi = agronomicParams.harvestIndex / 100;
  const cycleDays = agronomicParams.cropCycleDays || 120;
  const fc = agronomicParams.soilFieldCapacity || 30; // %
  
  // Formule simplifiée (Heuristique MVP)
  // Water availability = Field Capacity / Reference max (45%)
  const waterAvailabilityFactor = Math.min(fc / 45, 1); 
  
  // Estimation de l'eau transpirée sur le cycle (mm)
  const estimatedTranspiration = cycleDays * 4 * waterAvailabilityFactor; 
  
  // Rendement (kg/ha) = WP * Transpiration * HI (facteur de conversion simplifié)
  let yieldKgPerHa = (wp * 10) * (estimatedTranspiration / 100) * hi * 10; 
  
  const yieldTonnesPerHa = yieldKgPerHa / 1000;
  
  return parseFloat((yieldTonnesPerHa * project.areaSize).toFixed(2));
}
