"use client";
import React, { useEffect, useState } from 'react';
import { useSimulator } from '@/lib/simulator/SimulatorContext';
import { TextInput, NumberInput, SelectInput } from '../ui';
import { fetchCrops, fetchSoils, searchLocation, fetchSoilData, CropProfile, SoilProfile } from '@/lib/simulator/api';

export function ProjectStep() {
  const { state, updateProject, updateAgronomicParams } = useSimulator();
  const [crops, setCrops] = useState<CropProfile[]>([]);
  const [soils, setSoils] = useState<SoilProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [locationSearch, setLocationSearch] = useState('');
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [detectedSoil, setDetectedSoil] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [cropsData, soilsData] = await Promise.all([fetchCrops(), fetchSoils()]);
      setCrops(cropsData);
      setSoils(soilsData);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cropId = e.target.value;
    updateProject({ cropId, type: 'cultures_vivrieres' });
    
    const selectedCrop = crops.find(c => c.id === cropId);
    if (selectedCrop) {
      updateAgronomicParams({
        baseTemp: selectedCrop.base_temperature_c,
        harvestIndex: selectedCrop.reference_harvest_index_pct,
        waterProductivity: selectedCrop.water_productivity_normalized,
        cropCycleDays: selectedCrop.default_cycle_days || 120,
      });
    }
  };

  const handleLocationSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocationSearch(val);
    if (val.length >= 3) {
      const results = await searchLocation(val);
      setLocationResults(results);
    } else {
      setLocationResults([]);
    }
  };

  const selectLocation = async (loc: any) => {
    setLocationSearch(loc.name);
    setLocationResults([]);
    
    // Call SoilGrids
    setDetectedSoil('Analyse satellite en cours...');
    const soilData = await fetchSoilData(loc.lat, loc.lon);
    
    if (soilData) {
      setDetectedSoil("Sol détecté : ");
      // Map back to our soils in state
      const selectedSoil = soils.find(s => s.id === soilData.mappedSoilId) || soils[0];
      if (selectedSoil) {
        updateProject({ soilId: selectedSoil.id });
        updateAgronomicParams({
          soilFieldCapacity: selectedSoil.field_capacity_vol_pct,
        });
      }
    } else {
      setDetectedSoil('Erreur lors de l\\'analyse spatiale.');
    }
  };

  const cropOptions = crops.map(c => ({ value: c.id, label: c.name }));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-unbounded text-2xl text-white font-bold mb-2">Définition du projet</h2>
        <p className="text-[#6B857E] text-sm">Localisez votre ferme pour une déduction automatique du sol.</p>
      </div>

      <TextInput
        label="Nom du projet"
        placeholder="Ex: Ferme Espoir..."
        value={state.project.name}
        onChange={e => updateProject({ name: e.target.value })}
      />

      <div className="relative flex flex-col gap-2">
        <label className="text-white font-medium">Localisation</label>
        <input 
          type="text"
          value={locationSearch}
          onChange={handleLocationSearch}
          placeholder="Ex: Kpalimé..."
          className="w-full bg-[#0A1A14] border border-[#1A3329] text-white rounded-lg p-3 outline-none focus:border-[#D35400] transition-colors"
        />
        {locationResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A3329] border border-[#2D4A3E] rounded-lg z-10 max-h-48 overflow-y-auto">
            {locationResults.map((loc, i) => (
              <div 
                key={i} 
                className="p-3 text-sm text-white hover:bg-[#0A1A14] cursor-pointer"
                onClick={() => selectLocation(loc)}
              >
                {loc.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {detectedSoil && (
        <div className="p-3 rounded-lg bg-[#0D211A] border border-[#D35400] text-[#D35400] text-sm font-medium">
          {detectedSoil}
        </div>
      )}

      {isLoading ? (
        <div className="text-[#6B857E]">Chargement...</div>
      ) : (
        <SelectInput
          label="Culture"
          description="Modèles issus d'AquaCrop (FAO)"
          value={state.project.cropId || ''}
          options={cropOptions}
          onChange={handleCropChange}
        />
      )}

      <NumberInput
        label="Superficie"
        description="En hectares"
        unit="Hectares"
        value={state.project.areaSize || ''}
        onChange={e => updateProject({ areaSize: parseFloat(e.target.value) || 0 })}
      />
    </div>
  );
}
