import { 
  BatchItem, 
  GrowthDataPoint, 
  LayingDataPoint, 
  FeedIntakeDataPoint, 
  FinancialBreakdownPoint, 
  SiloItem, 
  VeterinaryRecord, 
  WaterQualityRecord, 
  ZootechKPIs 
} from '../types';

export const mockKPIs: Record<string, ZootechKPIs> = {
  all: {
    totalHeads: 54320,
    totalHeadsChangePercent: 3.4,
    mortalityRate: 0.78,
    mortalityBenchmark: 1.5,
    mortalityStatus: 'optimal',
    feedConversionRatio: 1.62,
    fcrBenchmark: 1.70,
    fcrStatus: 'optimal',
    gmq: 68.5,
    dailyProduction: {
      eggs: 38450,
      layingRate: 94.2,
      milk: 4820,
      meatGainKg: 2450,
      fishBiomassGainKg: 420,
    },
    treasury: {
      cashBalance: 148500,
      revenueMonth: 78900,
      feedCostMonth: 38200,
      vetCostMonth: 4100,
      marginOverFeedRate: 51.6,
      breakEvenFcr: 1.88,
    },
    feedStock: {
      totalTons: 46.8,
      autonomyDays: 9.2,
      consumptionTodayKg: 5080,
    }
  },
  poultry: {
    totalHeads: 42500,
    totalHeadsChangePercent: 4.1,
    mortalityRate: 0.65,
    mortalityBenchmark: 1.2,
    mortalityStatus: 'optimal',
    feedConversionRatio: 1.56,
    fcrBenchmark: 1.65,
    fcrStatus: 'optimal',
    gmq: 64.2,
    dailyProduction: {
      eggs: 38450,
      layingRate: 94.2,
      milk: 0,
      meatGainKg: 1650,
      fishBiomassGainKg: 0,
    },
    treasury: {
      cashBalance: 82400,
      revenueMonth: 44200,
      feedCostMonth: 21800,
      vetCostMonth: 2100,
      marginOverFeedRate: 50.7,
      breakEvenFcr: 1.82,
    },
    feedStock: {
      totalTons: 26.5,
      autonomyDays: 8.5,
      consumptionTodayKg: 3120,
    }
  },
  cattle: {
    totalHeads: 380,
    totalHeadsChangePercent: 0.8,
    mortalityRate: 0.22,
    mortalityBenchmark: 0.8,
    mortalityStatus: 'optimal',
    feedConversionRatio: 6.8,
    fcrBenchmark: 7.2,
    fcrStatus: 'optimal',
    gmq: 1120,
    dailyProduction: {
      eggs: 0,
      layingRate: 0,
      milk: 4820,
      meatGainKg: 380,
      fishBiomassGainKg: 0,
    },
    treasury: {
      cashBalance: 36200,
      revenueMonth: 21500,
      feedCostMonth: 9400,
      vetCostMonth: 1200,
      marginOverFeedRate: 56.3,
      breakEvenFcr: 7.8,
    },
    feedStock: {
      totalTons: 11.2,
      autonomyDays: 12.0,
      consumptionTodayKg: 930,
    }
  },
  swine: {
    totalHeads: 1640,
    totalHeadsChangePercent: 2.5,
    mortalityRate: 1.15,
    mortalityBenchmark: 2.0,
    mortalityStatus: 'optimal',
    feedConversionRatio: 2.62,
    fcrBenchmark: 2.75,
    fcrStatus: 'optimal',
    gmq: 810,
    dailyProduction: {
      eggs: 0,
      layingRate: 0,
      milk: 0,
      meatGainKg: 420,
      fishBiomassGainKg: 0,
    },
    treasury: {
      cashBalance: 19800,
      revenueMonth: 9800,
      feedCostMonth: 5300,
      vetCostMonth: 650,
      marginOverFeedRate: 45.9,
      breakEvenFcr: 2.95,
    },
    feedStock: {
      totalTons: 5.8,
      autonomyDays: 7.2,
      consumptionTodayKg: 805,
    }
  },
  aquaculture: {
    totalHeads: 9800,
    totalHeadsChangePercent: 5.0,
    mortalityRate: 0.85,
    mortalityBenchmark: 1.8,
    mortalityStatus: 'optimal',
    feedConversionRatio: 1.22,
    fcrBenchmark: 1.35,
    fcrStatus: 'optimal',
    gmq: 4.8,
    dailyProduction: {
      eggs: 0,
      layingRate: 0,
      milk: 0,
      meatGainKg: 0,
      fishBiomassGainKg: 420,
    },
    treasury: {
      cashBalance: 10100,
      revenueMonth: 3400,
      feedCostMonth: 1700,
      vetCostMonth: 150,
      marginOverFeedRate: 50.0,
      breakEvenFcr: 1.45,
    },
    feedStock: {
      totalTons: 3.3,
      autonomyDays: 14.5,
      consumptionTodayKg: 225,
    }
  }
};

export const mockBatches: BatchItem[] = [
  {
    id: 'b-01',
    code: 'VOL-CH-2603',
    name: 'Bande Poulets Chair #03',
    species: 'poultry',
    subType: 'chair',
    breed: 'Cobb 500 Standard',
    building: 'Hangar A1 (Atmosphère Contrôlée)',
    startDate: '2026-08-02',
    ageDays: 37,
    initialCount: 22000,
    currentCount: 21815,
    mortalityCount: 185,
    mortalityPercent: 0.84,
    currentWeightAvg: 2380, // grams
    targetWeightAvg: 2340,
    fcrCurrent: 1.57,
    fcrTarget: 1.62,
    gmqActual: 64.3,
    gmqTarget: 63.2,
    feedCumulativeKg: 51200,
    feedDailyKg: 2850,
    phase: 'Finition',
    status: 'harvest_ready',
    epef: 388, // European Production Efficiency Factor
    nextAction: {
      type: 'harvest',
      description: 'Enlèvement abattage prévu dans 48h (jeûne hydrique à planifier)',
      dueDate: '2026-09-10',
    }
  },
  {
    id: 'b-02',
    code: 'VOL-PO-2512',
    name: 'Lot Pondeuses Plein Vol',
    species: 'poultry',
    subType: 'pondeuse',
    breed: 'ISA Brown Élite',
    building: 'Bâtiment B2 (Système Volière)',
    startDate: '2026-02-10',
    ageDays: 210,
    ageWeeks: 30,
    initialCount: 20500,
    currentCount: 20280,
    mortalityCount: 220,
    mortalityPercent: 1.07,
    currentWeightAvg: 1910,
    targetWeightAvg: 1920,
    fcrCurrent: 2.12, // kg feed / dozen eggs
    fcrTarget: 2.15,
    gmqActual: 1.2,
    gmqTarget: 1.0,
    feedCumulativeKg: 142000,
    feedDailyKg: 2350,
    phase: 'Ponte Pic',
    status: 'active',
    nextAction: {
      type: 'weighing',
      description: 'Pesée échantillonnage 100 poules & vérification calibrage œufs',
      dueDate: '2026-09-11',
    }
  },
  {
    id: 'b-03',
    code: 'BOV-LA-2401',
    name: 'Troupeau Bovin Laitier Haute Génétique',
    species: 'cattle',
    subType: 'laitier',
    breed: 'Prim\'Holstein x Montbéliarde',
    building: 'Stabulation Libre Étable Sud',
    startDate: '2024-03-15',
    ageDays: 908,
    initialCount: 190,
    currentCount: 188,
    mortalityCount: 2,
    mortalityPercent: 1.05,
    currentWeightAvg: 640, // kg
    targetWeightAvg: 650,
    fcrCurrent: 6.75,
    fcrTarget: 7.10,
    gmqActual: 420,
    gmqTarget: 400,
    feedCumulativeKg: 285000,
    feedDailyKg: 910,
    phase: 'Production Lait',
    status: 'active',
    nextAction: {
      type: 'water_check',
      description: 'Contrôle Taux Butyrique (TB) et comptage leucocytaire du tank',
      dueDate: '2026-09-09',
    }
  },
  {
    id: 'b-04',
    code: 'POR-EN-2601',
    name: 'Lot Porcs Charcutiers Lot C',
    species: 'swine',
    subType: 'engraisseur',
    breed: 'Large White x Piétrain NN',
    building: 'Porcherie Engraissement P3',
    startDate: '2026-06-18',
    ageDays: 82,
    initialCount: 850,
    currentCount: 838,
    mortalityCount: 12,
    mortalityPercent: 1.41,
    currentWeightAvg: 78.5, // kg
    targetWeightAvg: 76.0,
    fcrCurrent: 2.61,
    fcrTarget: 2.70,
    gmqActual: 825,
    gmqTarget: 800,
    feedCumulativeKg: 68400,
    feedDailyKg: 820,
    phase: 'Croissance',
    status: 'active',
    nextAction: {
      type: 'feed_change',
      description: 'Transition provende Croissance 2 vers Aliment Finition à 85 kg',
      dueDate: '2026-09-14',
    }
  },
  {
    id: 'b-05',
    code: 'PIS-TI-2602',
    name: 'Bassin Aquacole Tilapia Du Nil',
    species: 'aquaculture',
    subType: 'tilapia',
    breed: 'Oreochromis niloticus (Souche GIFT)',
    building: 'Bassin Bétonné Raccourci B-04',
    startDate: '2026-05-10',
    ageDays: 121,
    initialCount: 10000,
    currentCount: 9750,
    mortalityCount: 250,
    mortalityPercent: 2.50,
    currentWeightAvg: 410, // grams
    targetWeightAvg: 400,
    fcrCurrent: 1.21,
    fcrTarget: 1.30,
    gmqActual: 4.8,
    gmqTarget: 4.5,
    feedCumulativeKg: 4800,
    feedDailyKg: 220,
    phase: 'Grossissement',
    status: 'active',
    nextAction: {
      type: 'water_check',
      description: 'Mesure oxygène dissous à l\'aube (cible > 5.5 mg/L) et nitrite',
      dueDate: '2026-09-09',
    }
  }
];

export const mockGrowthCurve: GrowthDataPoint[] = [
  { day: 0, actualWeight: 42, standardWeight: 42, minTolerance: 40, maxTolerance: 44, gmq: 0 },
  { day: 7, actualWeight: 195, standardWeight: 190, minTolerance: 180, maxTolerance: 200, gmq: 21.8 },
  { day: 14, actualWeight: 480, standardWeight: 460, minTolerance: 435, maxTolerance: 485, gmq: 40.7 },
  { day: 21, actualWeight: 960, standardWeight: 920, minTolerance: 870, maxTolerance: 970, gmq: 68.5 },
  { day: 28, actualWeight: 1580, standardWeight: 1520, minTolerance: 1440, maxTolerance: 1600, gmq: 88.5 },
  { day: 35, actualWeight: 2240, standardWeight: 2180, minTolerance: 2070, maxTolerance: 2290, gmq: 94.2 },
  { day: 38, actualWeight: 2480, standardWeight: 2410, minTolerance: 2290, maxTolerance: 2530, gmq: 80.0 },
];

export const mockLayingCurve: LayingDataPoint[] = [
  { week: 18, actualRate: 5.2, standardRate: 5.0, eggsPerHen: 0.4, eggWeightAvg: 48.5, crackedEggsPercent: 0.3 },
  { week: 20, actualRate: 38.4, standardRate: 40.0, eggsPerHen: 2.7, eggWeightAvg: 53.2, crackedEggsPercent: 0.5 },
  { week: 22, actualRate: 85.1, standardRate: 83.0, eggsPerHen: 6.0, eggWeightAvg: 58.1, crackedEggsPercent: 0.7 },
  { week: 25, actualRate: 95.8, standardRate: 94.5, eggsPerHen: 6.7, eggWeightAvg: 61.4, crackedEggsPercent: 0.6 },
  { week: 28, actualRate: 94.9, standardRate: 94.0, eggsPerHen: 6.6, eggWeightAvg: 62.8, crackedEggsPercent: 0.8 },
  { week: 32, actualRate: 93.6, standardRate: 92.5, eggsPerHen: 6.5, eggWeightAvg: 63.5, crackedEggsPercent: 0.9 },
  { week: 36, actualRate: 91.8, standardRate: 90.5, eggsPerHen: 6.4, eggWeightAvg: 64.2, crackedEggsPercent: 1.1 },
  { week: 40, actualRate: 89.4, standardRate: 88.0, eggsPerHen: 6.2, eggWeightAvg: 64.8, crackedEggsPercent: 1.2 },
];

export const mockFeedCurve: FeedIntakeDataPoint[] = [
  { dayOrWeek: 'Sem 1', intakeKg: 1200, cumulativeKg: 1200, fcrPoint: 1.12, feedCostUnit: 0.46 },
  { dayOrWeek: 'Sem 2', intakeKg: 3400, cumulativeKg: 4600, fcrPoint: 1.28, feedCostUnit: 0.45 },
  { dayOrWeek: 'Sem 3', intakeKg: 7800, cumulativeKg: 12400, fcrPoint: 1.42, feedCostUnit: 0.44 },
  { dayOrWeek: 'Sem 4', intakeKg: 14200, cumulativeKg: 26600, fcrPoint: 1.51, feedCostUnit: 0.42 },
  { dayOrWeek: 'Sem 5', intakeKg: 19800, cumulativeKg: 46400, fcrPoint: 1.58, feedCostUnit: 0.41 },
];

export const mockFinancials: FinancialBreakdownPoint[] = [
  { month: 'Avr', revenue: 62400, feedOpex: 31200, vetOpex: 3800, laborOpex: 8500, grossMarginFeed: 31200 },
  { month: 'Mai', revenue: 68100, feedOpex: 33400, vetOpex: 4200, laborOpex: 8500, grossMarginFeed: 34700 },
  { month: 'Juin', revenue: 71500, feedOpex: 34800, vetOpex: 3100, laborOpex: 8900, grossMarginFeed: 36700 },
  { month: 'Juil', revenue: 74200, feedOpex: 36200, vetOpex: 3900, laborOpex: 9100, grossMarginFeed: 38000 },
  { month: 'Août', revenue: 76800, feedOpex: 37100, vetOpex: 4300, laborOpex: 9100, grossMarginFeed: 39700 },
  { month: 'Sept', revenue: 78900, feedOpex: 38200, vetOpex: 4100, laborOpex: 9200, grossMarginFeed: 40700 },
];

export const mockSilos: SiloItem[] = [
  {
    id: 'sil-1',
    name: 'Silo N°1 — Finition Volaille',
    feedType: 'Provende Granulée 20% PB',
    speciesTarget: 'Volaille Chair',
    capacityTons: 25,
    currentTons: 18.2,
    fillPercentage: 72.8,
    dailyConsumptionTons: 2.85,
    daysRemaining: 6.4,
    supplier: 'Provenderie Centrale Ouest',
    lastDelivery: '2026-09-04',
    status: 'optimal'
  },
  {
    id: 'sil-2',
    name: 'Silo N°2 — Pondeuse Pic',
    feedType: 'Farine Ponte 17.5% PB + 3.8% Ca',
    speciesTarget: 'Pondeuses ISA',
    capacityTons: 20,
    currentTons: 8.3,
    fillPercentage: 41.5,
    dailyConsumptionTons: 2.35,
    daysRemaining: 3.5,
    supplier: 'Provenderie Centrale Ouest',
    lastDelivery: '2026-08-28',
    status: 'warning'
  },
  {
    id: 'sil-3',
    name: 'Silo N°3 — Ration Mixte Bovine',
    feedType: 'Tourteau Soja/Maïs + Ensilage',
    speciesTarget: 'Bovins Laitiers',
    capacityTons: 30,
    currentTons: 14.8,
    fillPercentage: 49.3,
    dailyConsumptionTons: 0.93,
    daysRemaining: 15.9,
    supplier: 'Agri-Nutrition Vallée',
    lastDelivery: '2026-08-22',
    status: 'optimal'
  },
  {
    id: 'sil-4',
    name: 'Silo N°4 — Flottant Aquacole 3mm',
    feedType: 'Extrudé Haute Protéine 32% PB',
    speciesTarget: 'Tilapia du Nil',
    capacityTons: 6,
    currentTons: 3.3,
    fillPercentage: 55.0,
    dailyConsumptionTons: 0.22,
    daysRemaining: 15.0,
    supplier: 'AquaFeeds Int.',
    lastDelivery: '2026-08-15',
    status: 'optimal'
  },
  {
    id: 'sil-5',
    name: 'Silo N°5 — Porcelet 2ème Âge',
    feedType: 'Granulé Pré-starter Acidifié',
    speciesTarget: 'Porcins',
    capacityTons: 10,
    currentTons: 2.2,
    fillPercentage: 22.0,
    dailyConsumptionTons: 0.81,
    daysRemaining: 2.7,
    supplier: 'PorcNutrition SA',
    lastDelivery: '2026-08-25',
    status: 'critical'
  }
];

export const mockVeterinaryRecords: VeterinaryRecord[] = [
  {
    id: 'vet-01',
    date: '2026-09-06',
    batchCode: 'VOL-PO-2512',
    species: 'Volaille Pondeuse',
    treatmentName: 'Vaccination Rappel Newcastle + BI',
    indication: 'Prophylaxie virale respiratoire obligatoire',
    administeredBy: 'Dr. Ousmane Diop (Vétérinaire Mandaté)',
    dosage: 'Nébulisation 1 dose / sujet',
    withdrawalPeriodDays: 0,
    withdrawalEndDate: '2026-09-06',
    isWithdrawalActive: false,
    status: 'completed',
    biosecurityLevel: 'Vert'
  },
  {
    id: 'vet-02',
    date: '2026-09-04',
    batchCode: 'BOV-LA-2401',
    species: 'Bovin Laitier',
    treatmentName: 'Céfalexine intramammaire (Vache #408)',
    indication: 'Mammite subclinique quartier arrière gauche',
    administeredBy: 'Dr. Anne Lambert',
    dosage: '1 injecteur après traite du soir',
    withdrawalPeriodDays: 4,
    withdrawalEndDate: '2026-09-08',
    isWithdrawalActive: true,
    status: 'monitoring',
    biosecurityLevel: 'Vigilance'
  },
  {
    id: 'vet-03',
    date: '2026-08-30',
    batchCode: 'POR-EN-2601',
    species: 'Porcin',
    treatmentName: 'Déparasitage Ivermectine 1%',
    indication: 'Éradication nématodes gastro-intestinaux',
    administeredBy: 'Dr. Ousmane Diop',
    dosage: '1 ml / 33 kg PV s/cutanée',
    withdrawalPeriodDays: 28,
    withdrawalEndDate: '2026-09-27',
    isWithdrawalActive: true,
    status: 'monitoring',
    biosecurityLevel: 'Vigilance'
  },
  {
    id: 'vet-04',
    date: '2026-09-02',
    batchCode: 'VOL-CH-2603',
    species: 'Volaille Chair',
    treatmentName: 'Cure d\'électrolytes + Vitamine C',
    indication: 'Prévention stress thermique (vague de chaleur 36°C)',
    administeredBy: 'Équipe Zootechnique Cultima',
    dosage: '1 g / L dans eau de boisson',
    withdrawalPeriodDays: 0,
    withdrawalEndDate: '2026-09-03',
    isWithdrawalActive: false,
    status: 'completed',
    biosecurityLevel: 'Vert'
  }
];

export const mockWaterQuality: WaterQualityRecord[] = [
  {
    bassinId: 'Bassin Bétonné B-04 (Tilapia)',
    temperatureC: 27.8,
    dissolvedOxygenMgL: 5.9,
    ph: 7.4,
    ammoniaMgL: 0.02,
    nitritesMgL: 0.01,
    status: 'optimal'
  },
  {
    bassinId: 'Étang Semi-Intensif E-01 (Silure)',
    temperatureC: 28.5,
    dissolvedOxygenMgL: 4.8,
    ph: 7.1,
    ammoniaMgL: 0.08,
    nitritesMgL: 0.04,
    status: 'warning'
  }
];
