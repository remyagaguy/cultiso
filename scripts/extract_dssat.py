import os
import json
import glob

# Chemin par défaut d'installation de DSSAT sur Windows
DSSAT_PATH = r"C:\DSSAT48\Genotype"
OUTPUT_FILE = "dssat_cultivars.json"

if not os.path.exists(DSSAT_PATH):
    print(f"Erreur: Le dossier {DSSAT_PATH} n'existe pas.")
    print("Veuillez vérifier que DSSAT 4.8 est bien installé à cet emplacement.")
    exit(1)

cultivars_data = []

# Parcourir tous les fichiers .CUL (Cultivars)
for cul_file in glob.glob(os.path.join(DSSAT_PATH, "*.CUL")):
    crop_code = os.path.basename(cul_file)[:2] # ex: 'MZ' pour Maize
    
    with open(cul_file, 'r', encoding='latin-1') as f:
        lines = f.readlines()
        
    headers = []
    
    for line in lines:
        line = line.strip()
        if not line or line.startswith('!') or line.startswith('*'):
            continue
            
        if line.startswith('@'):
            headers = line[1:].split()
            continue
            
        # Si on a trouvé les en-têtes, on parse les données
        if headers:
            parts = line.split()
            # Le nom du cultivar peut contenir des espaces (ex: DEKALB XL 71)
            # En général dans DSSAT, l'ID est la partie 1, le nom est formaté avec des espaces.
            # C'est un parsing basique pour extraire un maximum de lignes.
            if len(parts) >= 3:
                var_id = parts[0]
                
                # Assemblage rudimentaire du nom (tout ce qui n'est pas un nombre flottant)
                name_parts = []
                data_params = {}
                
                for p in parts[1:]:
                    try:
                        val = float(p)
                        # Si c'est un nombre, c'est probablement un paramètre (P1, P2, etc.)
                        break
                    except ValueError:
                        if p != '.': # Ignore empty dots
                            name_parts.append(p)
                            
                var_name = " ".join(name_parts)
                
                cultivars_data.append({
                    "crop_code": crop_code,
                    "var_id": var_id,
                    "var_name": var_name,
                    "source_file": os.path.basename(cul_file)
                })

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(cultivars_data, f, indent=4, ensure_ascii=False)

print(f"Succès ! {len(cultivars_data)} cultivars extraits dans {OUTPUT_FILE}.")
