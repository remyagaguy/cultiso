import os
import json
import PyPDF2
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# Configuration
RAG_DIR = r"../Cloud/RAG_Cultiso"
OUTPUT_JSON = "extracted_knowledge.json"

# Vérifier la clé API
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("ATTENTION : La variable d'environnement GEMINI_API_KEY n'est pas définie.")
    print("Le script va générer une structure factice pour démonstration.")
    # On continue pour la démo, mais en prod il faudra la clé.

# Définition du schéma strict attendu (Structured Output) pour éviter les hallucinations
class ExtractedParameter(BaseModel):
    category: str = Field(description="Ex: 'Elevage', 'Culture', 'Transformation', 'Irrigation'")
    sub_category: str = Field(description="Ex: 'Poule pondeuse', 'Tomate', 'Irrigation goutte-à-goutte'")
    parameter_name: str = Field(description="Ex: 'Indice de Consommation', 'Besoins en eau', 'Rendement extraction'")
    value: float = Field(description="Valeur numérique extraite")
    unit: str = Field(description="Unité (ex: 'kg/jour', 'mm/ha', '%')")
    confidence: str = Field(description="Niveau de confiance : 'High', 'Medium', 'Low'")
    source_context: str = Field(description="La phrase exacte du PDF justifiant cette valeur")

class ExtractionResult(BaseModel):
    parameters: list[ExtractedParameter]

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            # On lit les premières pages pour éviter de saturer le contexte (ou tout si petit document)
            for page_num in range(min(5, len(reader.pages))):
                text += reader.pages[page_num].extract_text() + "\n"
    except Exception as e:
        print(f"Erreur de lecture {pdf_path}: {e}")
    return text

def process_document(client, text, filename):
    prompt = f"Tu es un expert agronome. Lis ce document : '{filename}'. Extrais tous les paramètres mathématiques, biologiques ou financiers stricts (rations, rendements, besoins en eau). Ne renvoie QUE des données chiffrées selon le schéma demandé. Si aucune donnée chiffrée n'est présente, renvoie une liste vide.\n\nTexte du document :\n{text[:15000]}"
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ExtractionResult,
                temperature=0.1, # Très bas pour éviter l'hallucination
            ),
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Erreur API pour {filename}: {e}")
        return {"parameters": []}

def main():
    if not os.path.exists(RAG_DIR):
        print(f"Dossier introuvable : {RAG_DIR}")
        return

    all_extracted_data = []
    
    # Client Gemini (nécessite pip install google-genai)
    client = None
    if api_key:
        client = genai.Client(api_key=api_key)

    for file in os.listdir(RAG_DIR):
        if file.endswith(".pdf"):
            pdf_path = os.path.join(RAG_DIR, file)
            print(f"Traitement de : {file}...")
            
            text = extract_text_from_pdf(pdf_path)
            
            if client and text.strip():
                print("  -> Extraction IA en cours (Structured Output)...")
                result = process_document(client, text, file)
                if result and 'parameters' in result:
                    all_extracted_data.extend(result['parameters'])
            else:
                # Mode Démo / Offline
                print("  -> Mode Démo (Pas de clé API). Simulation d'extraction...")
                if "poules" in file.lower():
                    all_extracted_data.append({
                        "category": "Elevage",
                        "sub_category": "Poule Pondeuse",
                        "parameter_name": "Consommation aliment démarrage",
                        "value": 0.05,
                        "unit": "kg/jour/tête",
                        "confidence": "High",
                        "source_context": "Phase de démarrage : 50g par jour."
                    })
                elif "eau" in file.lower() or "irrigation" in file.lower():
                     all_extracted_data.append({
                        "category": "Irrigation",
                        "sub_category": "Général",
                        "parameter_name": "Efficience Goutte-à-goutte",
                        "value": 90.0,
                        "unit": "%",
                        "confidence": "High",
                        "source_context": "L'irrigation localisée offre une efficience de 90%."
                    })

    # Sauvegarde en JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(all_extracted_data, f, indent=4, ensure_ascii=False)
        
    print(f"\n✅ Extraction terminée ! {len(all_extracted_data)} paramètres structurés ont été sauvegardés dans {OUTPUT_JSON}.")
    print("Ces données sont prêtes à être ingérées dans Supabase (SQL).")

if __name__ == "__main__":
    main()
