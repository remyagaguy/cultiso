import os
import glob

DATA_DIR = r'c:\Users\PC\OneDrive\Documents\Cultiso\Cloud\LOGICIEL\GUI_AC7.1\GUI_AC71\AquaCropV71No13102023\DATA'
OUT_FILE = r'c:\Users\PC\OneDrive\Documents\Cultiso\supabase\migrations\20260926_aquacrop_data.sql'

def parse_cro(filepath):
    data = {}
    try:
        with open(filepath, 'r', encoding='latin-1') as f:
            lines = f.readlines()
        data['name'] = lines[0].strip().replace("'", "''")
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
    except: pass
    return data

def parse_sol(filepath):
    data = {}
    try:
        with open(filepath, 'r', encoding='latin-1') as f:
            lines = f.readlines()
        data['name'] = lines[0].strip().replace("'", "''")
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
                except Exception as e: pass
                break
    except: pass
    return data

def generate_sql():
    sql = []
    
    # Table creations
    sql.append("-- ==========================================")
    sql.append("-- TABLES CREATION")
    sql.append("-- ==========================================\n")
    sql.append("CREATE TABLE IF NOT EXISTS public.cultiplan_crops (")
    sql.append("    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,")
    sql.append("    slug VARCHAR(100) UNIQUE NOT NULL,")
    sql.append("    name VARCHAR(255) NOT NULL,")
    sql.append("    base_temperature_c NUMERIC,")
    sql.append("    upper_temperature_c NUMERIC,")
    sql.append("    reference_harvest_index_pct NUMERIC,")
    sql.append("    water_productivity_normalized NUMERIC")
    sql.append(");\n")
    
    sql.append("CREATE TABLE IF NOT EXISTS public.cultiplan_soils (")
    sql.append("    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,")
    sql.append("    slug VARCHAR(100) UNIQUE NOT NULL,")
    sql.append("    name VARCHAR(255) NOT NULL,")
    sql.append("    curve_number NUMERIC,")
    sql.append("    saturation_vol_pct NUMERIC,")
    sql.append("    field_capacity_vol_pct NUMERIC,")
    sql.append("    wilting_point_vol_pct NUMERIC,")
    sql.append("    ksat_mm_day NUMERIC")
    sql.append(");\n")
    
    sql.append("-- ==========================================")
    sql.append("-- INSERT CROPS")
    sql.append("-- ==========================================\n")
    
    crop_files = glob.glob(os.path.join(DATA_DIR, '*.CRO'))
    for cf in crop_files:
        basename = os.path.basename(cf)
        slug = basename.split('.')[0].lower()
        raw = parse_cro(cf)
        
        name = raw.get('name', slug)
        t_base = next((v for k, v in raw.items() if 'Base temperature' in k), 'NULL')
        t_upper = next((v for k, v in raw.items() if 'Upper temperature' in k), 'NULL')
        hi = next((v for k, v in raw.items() if 'Reference Harvest Index' in k), 'NULL')
        wp = next((v for k, v in raw.items() if 'Water Productivity normalized' in k or 'Crop water productivity' in k), 'NULL')
        
        # Only insert if we have basic data
        if t_base != 'NULL' or hi != 'NULL':
            sql.append(f"INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)")
            sql.append(f"VALUES ('{slug}', '{name}', {t_base}, {t_upper}, {hi}, {wp})")
            sql.append(f"ON CONFLICT (slug) DO UPDATE SET")
            sql.append(f"    name = EXCLUDED.name,")
            sql.append(f"    base_temperature_c = EXCLUDED.base_temperature_c,")
            sql.append(f"    upper_temperature_c = EXCLUDED.upper_temperature_c,")
            sql.append(f"    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,")
            sql.append(f"    water_productivity_normalized = EXCLUDED.water_productivity_normalized;\n")

    sql.append("-- ==========================================")
    sql.append("-- INSERT SOILS")
    sql.append("-- ==========================================\n")
    
    soil_files = glob.glob(os.path.join(DATA_DIR, '*.SOL'))
    for sf in soil_files:
        basename = os.path.basename(sf)
        slug = basename.split('.')[0].lower()
        raw = parse_sol(sf)
        
        name = raw.get('name', slug)
        cn = raw.get('cn', 'NULL')
        sat = raw.get('sat_vol_pct', 'NULL')
        fc = raw.get('fc_vol_pct', 'NULL')
        wp = raw.get('wp_vol_pct', 'NULL')
        ksat = raw.get('ksat_mm_day', 'NULL')
        
        sql.append(f"INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)")
        sql.append(f"VALUES ('{slug}', '{name}', {cn}, {sat}, {fc}, {wp}, {ksat})")
        sql.append(f"ON CONFLICT (slug) DO UPDATE SET")
        sql.append(f"    name = EXCLUDED.name,")
        sql.append(f"    curve_number = EXCLUDED.curve_number,")
        sql.append(f"    saturation_vol_pct = EXCLUDED.saturation_vol_pct,")
        sql.append(f"    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,")
        sql.append(f"    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,")
        sql.append(f"    ksat_mm_day = EXCLUDED.ksat_mm_day;\n")
        
    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql))
    
    print(f"Generated SQL for {len(crop_files)} crops and {len(soil_files)} soils.")

if __name__ == '__main__':
    generate_sql()
