export type SpeciesCategory = 'all' | 'poultry' | 'cattle' | 'swine' | 'aquaculture';

export type SubType = 
  | 'chair' | 'pondeuse' // Poultry
  | 'laitier' | 'embouche' // Cattle
  | 'naisseur' | 'engraisseur' // Swine
  | 'tilapia' | 'silure'; // Aquaculture

export interface ZootechKPIs {
  totalHeads: number;
  totalHeadsChangePercent: number;
  mortalityRate: number; // in %
  mortalityBenchmark: number; // in %
  mortalityStatus: 'optimal' | 'warning' | 'critical';
  feedConversionRatio: number; // IC / FCR (kg feed / kg gain or dozen eggs)
  fcrBenchmark: number;
  fcrStatus: 'optimal' | 'warning' | 'critical';
  gmq: number; // Gain Moyen Quotidien in g/day
  dailyProduction: {
    eggs: number; // units
    layingRate: number; // %
    milk: number; // Liters
    meatGainKg: number; // kg
    fishBiomassGainKg: number; // kg
  };
  treasury: {
    cashBalance: number; // € or FCFA
    revenueMonth: number;
    feedCostMonth: number;
    vetCostMonth: number;
    marginOverFeedRate: number; // MCAS % (Marge sur Coût Alimentaire)
    breakEvenFcr: number;
  };
  feedStock: {
    totalTons: number;
    autonomyDays: number;
    consumptionTodayKg: number;
  };
}

export interface BatchItem {
  id: string;
  code: string;
  name: string;
  species: SpeciesCategory;
  subType: string;
  breed: string; // e.g. "Cobb 500", "ISA Brown", "Prim'Holstein", "Large White x Piétrain", "Oreochromis niloticus"
  building: string; // "Bâtiment A3", "Hangar 2", "Bassin B-04"
  startDate: string;
  ageDays: number;
  ageWeeks?: number;
  initialCount: number;
  currentCount: number;
  mortalityCount: number;
  mortalityPercent: number;
  currentWeightAvg: number; // in g or kg
  targetWeightAvg: number;
  fcrCurrent: number; // IC en cours
  fcrTarget: number;
  gmqActual: number; // g/day
  gmqTarget: number; // g/day
  feedCumulativeKg: number;
  feedDailyKg: number;
  phase: 'Démarrage' | 'Croissance' | 'Finition' | 'Ponte Pic' | 'Production Lait' | 'Alevinage' | 'Grossissement';
  status: 'active' | 'harvest_ready' | 'quarantine' | 'completed';
  nextAction: {
    type: 'vaccine' | 'weighing' | 'feed_change' | 'harvest' | 'water_check';
    description: string;
    dueDate: string;
  };
  epef?: number; // European Production Efficiency Factor (for broilers)
}

export interface GrowthDataPoint {
  day: number;
  actualWeight: number; // g
  standardWeight: number; // g (Genetic Guide standard)
  minTolerance: number;
  maxTolerance: number;
  gmq: number; // g/j
}

export interface LayingDataPoint {
  week: number;
  actualRate: number; // %
  standardRate: number; // %
  eggsPerHen: number;
  eggWeightAvg: number; // grams
  crackedEggsPercent: number; // %
}

export interface FeedIntakeDataPoint {
  dayOrWeek: string;
  intakeKg: number;
  cumulativeKg: number;
  fcrPoint: number;
  feedCostUnit: number;
}

export interface FinancialBreakdownPoint {
  month: string;
  revenue: number;
  feedOpex: number;
  vetOpex: number;
  laborOpex: number;
  grossMarginFeed: number; // MCAS
}

export interface SiloItem {
  id: string;
  name: string;
  feedType: string;
  speciesTarget: string;
  capacityTons: number;
  currentTons: number;
  fillPercentage: number;
  dailyConsumptionTons: number;
  daysRemaining: number;
  supplier: string;
  lastDelivery: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface VeterinaryRecord {
  id: string;
  date: string;
  batchCode: string;
  species: string;
  treatmentName: string;
  indication: string;
  administeredBy: string;
  dosage: string;
  withdrawalPeriodDays: number; // Délai d'attente (viande/lait/œufs)
  withdrawalEndDate: string;
  isWithdrawalActive: boolean;
  status: 'completed' | 'scheduled' | 'monitoring';
  biosecurityLevel: 'Vert' | 'Vigilance' | 'Alerte';
}

export interface WaterQualityRecord {
  bassinId: string;
  temperatureC: number;
  dissolvedOxygenMgL: number;
  ph: number;
  ammoniaMgL: number;
  nitritesMgL: number;
  status: 'optimal' | 'warning';
}
