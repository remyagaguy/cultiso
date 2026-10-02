import os
import re

def parse_cro_file(filepath):
    data = {}
    with open(filepath, 'r', encoding='latin-1') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        line = line.strip()
        if not line or ':' not in line:
            if i == 0:
                data['name'] = line
            continue
        
        parts = line.split(':', 1)
        if len(parts) == 2:
            val_str = parts[0].strip()
            desc = parts[1].strip()
            try:
                if '.' in val_str:
                    val = float(val_str)
                else:
                    val = int(val_str)
                data[desc] = val
            except ValueError:
                pass
    return data

if __name__ == '__main__':
    maize_path = r'c:\Users\PC\OneDrive\Documents\Cultiso\Cloud\LOGICIEL\GUI_AC7.1\GUI_AC71\AquaCropV71No13102023\DATA\Maize.CRO'
    tomato_path = r'c:\Users\PC\OneDrive\Documents\Cultiso\Cloud\LOGICIEL\GUI_AC7.1\GUI_AC71\AquaCropV71No13102023\DATA\Tomato.CRO'
    
    maize_data = parse_cro_file(maize_path)
    print("Maize Name:", maize_data.get('name'))
    # Print some key parameters
    keys_to_show = [
        'Base temperature (C) below which crop development does not progress',
        'Upper temperature (C) above which crop development no longer increases with an increase in temperature',
        'Crop yield (kg/ha)', # AquaCrop might use Harvest Index
        'Reference Harvest Index (HIo) (%)',
        'Maximum root extraction depth (m)',
        'Crop water productivity normalized for ETo and CO2 (g/m2)'
    ]
    for k, v in maize_data.items():
        if 'temperature' in k.lower() or 'harvest index' in k.lower() or 'water productivity' in k.lower():
            print(f"- {k}: {v}")
