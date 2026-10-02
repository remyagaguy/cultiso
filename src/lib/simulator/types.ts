// src/lib/simulator/types.ts

export type CultivationType = 'cultures_vivrieres' | 'cultures_de_rente' | 'maraichage' | 'elevage' | 'agroalimentaire' | '';

export interface AgronomicParameters {
  baseTemp: number | null;
  waterProductivity: number | null;
  harvestIndex: number | null;
  soilFieldCapacity: number | null;
  cropCycleDays: number | null;
}

export interface ProjectInfo {
  name: string;
  type: CultivationType;
  cropId: string; // From Supabase cultiplan_crops
  soilId: string; // From Supabase cultiplan_soils
  areaSize: number; // en hectares ou m2 selon le type
  areaUnit: 'ha' | 'm2' | 'tetes';
}

export interface Capex { // Capital Expenditures (Investissements)
  infrastructure: number; // ex: b?timents, irrigation
  equipment: number; // ex: tracteurs, outils
}

export interface Opex { // Operational Expenditures (Charges)
  inputs: number; // intrants: semences, engrais, alimentation animale
  labor: number; // main d'œuvre
}

export interface Sales { // Ventes
  expectedYield: number; // rendement espéré total (now calculated)
  unitPrice: number; // prix de vente unitaire
}

export interface SimulatorState {
  project: ProjectInfo;
  capex: Capex;
  opex: Opex;
  sales: Sales;
  agronomicParams: AgronomicParameters; // New state for offline calc
}

export const INITIAL_SIMULATOR_STATE: SimulatorState = {
  project: {
    name: '',
    type: '',
    cropId: '',
    soilId: '',
    areaSize: 1,
    areaUnit: 'ha',
  },
  capex: {
    infrastructure: 0,
    equipment: 0,
  },
  opex: {
    inputs: 0,
    labor: 0,
  },
  sales: {
    expectedYield: 0,
    unitPrice: 0,
  },
  agronomicParams: {
    baseTemp: null,
    waterProductivity: null,
    harvestIndex: null,
    soilFieldCapacity: null,
    cropCycleDays: 120, // default
  }
};
