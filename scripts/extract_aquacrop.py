import os
import re
import json

DATA_DIR = r'c:\Users\PC\OneDrive\Documents\Cultiso\Cloud\LOGICIEL\GUI_AC7.1\GUI_AC71\AquaCropV71No13102023\DATA'
OUT_DIR = r'c:\Users\PC\OneDrive\Documents\Cultiso\src\data'

def parse_cro(filepath):
    data = {}
    with open(filepath, 'r', encoding='latin-1') as f:
        lines = f.readlines()
    
    data['name'] = lines[0].strip()
    for line in lines[1:]:
        line = line.strip()
        if ':' in line:
            parts = line.split(':', 1)
            try:
                val = float(parts[0].strip())
                desc = parts[1].strip()
                data[desc] = val
            except ValueError:
                pass
    return data

def extract_crops():
    crop_files = ['Maize.CRO', 'Tomato.CRO', 'cassava.CRO', 'Soybean.CRO', 'Sorghum.CRO', 'Wheat.CRO']
    cultiplan_crops = []
    
    for cf in crop_files:
        path = os.path.join(DATA_DIR, cf)
        if os.path.exists(path):
            raw = parse_cro(path)
            
            crop = {
                "id": cf.split('.')[0].lower(),
                "name": raw.get('name', cf),
                "base_temperature_c": next((v for k, v in raw.items() if 'Base temperature' in k), None),
                "upper_temperature_c": next((v for k, v in raw.items() if 'Upper temperature' in k), None),
                "reference_harvest_index_pct": next((v for k, v in raw.items() if 'Reference Harvest Index' in k), None),
                "water_productivity_normalized": next((v for k, v in raw.items() if 'Water Productivity normalized' in k or 'Crop water productivity' in k), None),
                "crop_cycle_days": None
            }
            
            # Find cycle length
            for k, v in raw.items():
                if 'Total length of crop cycle' in k and v != -9:
                    crop['crop_cycle_days'] = v
                    
            # Fallback for crop cycle if it was -9 (meaning calendar days aren't used, but another line might specify it)
            if crop['crop_cycle_days'] is None:
                for k, v in raw.items():
                    if 'GDDays: total length of crop cycle' in k or 'from sowing to maturity' in k:
                        crop['crop_cycle_days'] = v

            cultiplan_crops.append(crop)
            
    with open(os.path.join(OUT_DIR, 'cultiplan_crops.json'), 'w', encoding='utf-8') as f:
        json.dump(cultiplan_crops, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(cultiplan_crops)} crops.")

def parse_sol(filepath):
    data = {}
    with open(filepath, 'r', encoding='latin-1') as f:
        lines = f.readlines()
        
    data['name'] = lines[0].strip()
    
    for line in lines[1:]:
        line = line.strip()
        if ':' in line:
            parts = line.split(':', 1)
            try:
                val = float(parts[0].strip())
                desc = parts[1].strip()
                if 'CN' in desc:
                    data['cn'] = val
            except: pass
            
    for i, line in enumerate(lines):
        if 'Thickness' in line and 'Sat' in line and 'FC' in line and 'WP' in line:
            try:
                data_line = lines[i+2].strip()
                parts = [p for p in data_line.split(' ') if p]
                if len(parts) >= 5:
                    data['sat_vol_pct'] = float(parts[1])
                    data['fc_vol_pct'] = float(parts[2])
                    data['wp_vol_pct'] = float(parts[3])
                    data['ksat_mm_day'] = float(parts[4])
            except Exception as e:
                print(f"Error parsing table in {filepath}: {e}")
            break
            
    return data

def extract_soils():
    soil_files = ['Clay.SOL', 'Sand.SOL', 'Loam.SOL', 'SiltLoam.SOL']
    cultiplan_soils = []
    
    for sf in soil_files:
        path = os.path.join(DATA_DIR, sf)
        if os.path.exists(path):
            raw = parse_sol(path)
            soil = {
                "id": sf.split('.')[0].lower(),
                "name": raw.get('name', sf),
                "curve_number": raw.get('cn', None),
                "saturation_vol_pct": raw.get('sat_vol_pct', None),
                "field_capacity_vol_pct": raw.get('fc_vol_pct', None),
                "wilting_point_vol_pct": raw.get('wp_vol_pct', None),
                "ksat_mm_day": raw.get('ksat_mm_day', None)
            }
            cultiplan_soils.append(soil)
            
    with open(os.path.join(OUT_DIR, 'cultiplan_soils.json'), 'w', encoding='utf-8') as f:
        json.dump(cultiplan_soils, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(cultiplan_soils)} soils.")

if __name__ == '__main__':
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
    extract_crops()
    extract_soils()
