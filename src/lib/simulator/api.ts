import { createClient } from '../supabase/client';
const supabase = createClient();

export interface CropProfile {
  id: string;
  slug: string;
  name: string;
  base_temperature_c: number | null;
  upper_temperature_c: number | null;
  reference_harvest_index_pct: number | null;
  water_productivity_normalized: number | null;
  default_cycle_days: number | null;
}

export interface SoilProfile {
  id: string;
  slug: string;
  name: string;
  curve_number: number | null;
  saturation_vol_pct: number | null;
  field_capacity_vol_pct: number | null;
  wilting_point_vol_pct: number | null;
  ksat_mm_day: number | null;
}

export async function fetchCrops(): Promise<CropProfile[]> {
  const { data, error } = await supabase.from('cultiplan_crops').select('*').order('name');
  if (error) {
    console.error('Error fetching crops:', error);
    return [];
  }
  return data || [];
}

export async function fetchSoils(): Promise<SoilProfile[]> {
  const { data, error } = await supabase.from('cultiplan_soils').select('*').order('name');
  if (error) {
    console.error('Error fetching soils:', error);
    return [];
  }
  return data || [];
}

// Geocoding with OpenStreetMap Nominatim
export async function searchLocation(query: string) {
  if (query.length < 3) return [];
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Togo')}&limit=5`);
    const data = await res.json();
    return data.map((item: any) => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon)
    }));
  } catch (error) {
    console.error('Error fetching location:', error);
    return [];
  }
}

// SoilGrids ISRIC API
export async function fetchSoilData(lat: number, lon: number) {
  try {
    const res = await fetch(`https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${lon}&lat=${lat}&number_classes=1`);
    const data = await res.json();
    const soilClass = data?.wrb_class_name || 'Inconnu';
    
    // Mapping arbitraire simple pour l'heuristique du MVP
    let soilIdFallback = '1'; // default
    if (soilClass.toLowerCase().includes('ferral')) soilIdFallback = '3'; // argileux
    if (soilClass.toLowerCase().includes('aren')) soilIdFallback = '2'; // sableux
    
    return {
      soilClass,
      mappedSoilId: soilIdFallback
    };
  } catch (error) {
    console.error('Error fetching SoilGrids:', error);
    return null;
  }
}
