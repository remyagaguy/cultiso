import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
import hashlib
import shutil
import fitz  # PyMuPDF
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client
from dotenv import load_dotenv

# 1. Configuration
load_dotenv('.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Erreur : Cles Supabase manquantes dans .env.local")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialisation du modle d'embedding (il sera tlcharg au premier lancement)
print("Chargement du modle IA local (sentence-transformers)...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Modle charg !")

SOURCE_DIR = os.path.join("Cloud", "Cultisia")
DEST_DIR = os.path.join("Cloud", "RAG_Cultiso")
os.makedirs(DEST_DIR, exist_ok=True)

# Limite de fichiers par lot
LIMIT = None

def get_file_hash(filepath):
    """Calcule le hash MD5 d'un fichier pour dtecter les doublons exacts."""
    hash_md5 = hashlib.md5()
    try:
        with open(filepath, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    except Exception as e:
        print(f"Erreur lors du hashage (fichier introuvable ou bloque): {e}")
        return None

def chunk_text(text, chunk_size=1000, overlap=100):
    """Dcoupe un texte long en petits morceaux (chunks) avec chevauchement."""
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

def process_pdf(filepath):
    """Extrait le texte d'un PDF."""
    text = ""
    try:
        with fitz.open(filepath) as doc:
            for page in doc:
                text += page.get_text()
        return text.replace('\x00', '')
    except Exception as e:
        print(f" Erreur de lecture sur {filepath}: {e}")
        return None

def main():
    processed_count = 0
    
    # Rcuprer tous les PDF du dossier
    all_files = []
    for root, _, files in os.walk(SOURCE_DIR):
        for f in files:
            if f.lower().endswith('.pdf'):
                all_files.append(os.path.join(root, f))
                
    print(f" {len(all_files)} fichiers PDF trouvs dans {SOURCE_DIR}")
    
    for filepath in all_files:
        if LIMIT is not None and processed_count >= LIMIT:
            print(f"\n Limite de {LIMIT} fichiers atteinte pour cette vague.")
            break
            
        filename = os.path.basename(filepath)
        print(f"\n Traitement de : {filename}")
        
        # 1. Ddoublonnage
        file_hash = get_file_hash(filepath)
        if not file_hash:
            continue
        
        # Vrifier si le hash existe dj dans Supabase
        response = supabase.table("cultisia_knowledge").select("id").eq("file_hash", file_hash).limit(1).execute()
        if len(response.data) > 0:
            print(f" Doublon dtect (dj en base). Dplacement vers {DEST_DIR}")
            shutil.move(filepath, os.path.join(DEST_DIR, filename))
            continue
            
        # 2. Extraction
        text = process_pdf(filepath)
        if not text or len(text.strip()) < 50:
            print(" PDF vide ou illisible, ignor.")
            continue
            
        # 3. Dcoupage (Chunking)
        chunks = chunk_text(text)
        print(f" Dcoup en {len(chunks)} morceaux.")
        
        # 4. Vectorisation et Insertion
        for idx, chunk in enumerate(chunks):
            # Gnrer le vecteur (384 dimensions)
            embedding = model.encode(chunk).tolist()
            
            data = {
                "file_name": filename,
                "file_hash": file_hash,
                "chunk_index": idx,
                "content": chunk,
                "embedding": embedding,
                "metadata": {"source_folder": os.path.dirname(filepath)}
            }
            
            # Envoyer  Supabase
            try:
                supabase.table("cultisia_knowledge").insert(data).execute()
            except Exception as e:
                print(f" Erreur d'insertion chunk {idx}: {e}")
                
        print(f" Fichier vectoris et sauvegard !")
        
        # 5. Dplacement du fichier trait
        dest_path = os.path.join(DEST_DIR, filename)
        # Grer le cas o un fichier du mme nom existe dj dans le dossier de destination
        if os.path.exists(dest_path):
            dest_path = os.path.join(DEST_DIR, f"{file_hash[:8]}_{filename}")
        shutil.move(filepath, dest_path)
        
        processed_count += 1

    print("\n Fin du traitement test.")

if __name__ == "__main__":
    main()
