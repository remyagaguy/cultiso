import os
import shutil

base_cloud_dir = r"C:\Users\PC\OneDrive\Documents\Cultiso\cloud\cultima"

domains_mapping = {
    "Transformation": {
        "keyword": "Transformation",
        "target_dir": r"C:\Users\PC\OneDrive\Documents\Cultiso\src\components\cultima\transformation",
        "component_name": "TransformationDashboard"
    },
    "Service": {
        "keyword": "SERVICES",
        "target_dir": r"C:\Users\PC\OneDrive\Documents\Cultiso\src\components\cultima\service",
        "component_name": "ServiceDashboard"
    },
    "Negoce": {
        "keyword": "Commerce",
        "target_dir": r"C:\Users\PC\OneDrive\Documents\Cultiso\src\components\cultima\negoce",
        "component_name": "NegoceDashboard"
    }
}

def process_file_content(content, filename, is_app=False, component_name=""):
    if "use client" not in content and (filename.endswith(".tsx") or filename.endswith(".ts")):
        content = '"use client";\n' + content
        
    content = content.replace("./components/", "./")
    content = content.replace("../components/", "../")
    
    # We replace any occurrences of '../types' with './types' by default
    content = content.replace("../types", "./types")
    
    if is_app:
        content = content.replace("export default function App", f"export default function {component_name}")
        
    return content

for folder in os.listdir(base_cloud_dir):
    full_path = os.path.join(base_cloud_dir, folder, "src")
    if not os.path.isdir(full_path):
        continue
        
    matched_domain = None
    for key, config in domains_mapping.items():
        if config["keyword"] in folder:
            matched_domain = config
            break
            
    if not matched_domain:
        continue
        
    src = full_path
    tgt = matched_domain["target_dir"]
    comp_name = matched_domain["component_name"]
    
    os.makedirs(tgt, exist_ok=True)
    
    # 1. Process components folder
    src_components = os.path.join(src, "components")
    if os.path.exists(src_components):
        for root, dirs, files in os.walk(src_components):
            for file in files:
                if file.endswith((".tsx", ".ts")):
                    file_path = os.path.join(root, file)
                    
                    rel_path = os.path.relpath(root, src_components)
                    if rel_path == ".":
                        target_sub_dir = tgt
                    else:
                        target_sub_dir = os.path.join(tgt, rel_path)
                    os.makedirs(target_sub_dir, exist_ok=True)
                    
                    target_file_path = os.path.join(target_sub_dir, file)
                    
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        
                    content = process_file_content(content, file)
                    
                    if "charts" in rel_path.lower():
                        content = content.replace("./types", "../types")
                    
                    with open(target_file_path, "w", encoding="utf-8") as f:
                        f.write(content)

    # 2. Process data folder
    src_data = os.path.join(src, "data")
    if os.path.exists(src_data):
        target_data_dir = os.path.join(tgt, "data")
        os.makedirs(target_data_dir, exist_ok=True)
        for file in os.listdir(src_data):
            file_path = os.path.join(src_data, file)
            target_file_path = os.path.join(target_data_dir, file)
            if os.path.isfile(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                content = process_file_content(content, file)
                content = content.replace("./types", "../types")
                with open(target_file_path, "w", encoding="utf-8") as f:
                    f.write(content)

    # 3. Process types.ts
    src_types = os.path.join(src, "types.ts")
    if os.path.exists(src_types):
        target_types = os.path.join(tgt, "types.ts")
        with open(src_types, "r", encoding="utf-8") as f:
            content = f.read()
        with open(target_types, "w", encoding="utf-8") as f:
            f.write(content)

    # 4. Process App.tsx
    src_app = os.path.join(src, "App.tsx")
    if os.path.exists(src_app):
        target_app = os.path.join(tgt, f"{comp_name}.tsx")
        with open(src_app, "r", encoding="utf-8") as f:
            content = f.read()
        content = process_file_content(content, "App.tsx", is_app=True, component_name=comp_name)
        with open(target_app, "w", encoding="utf-8") as f:
            f.write(content)

    print(f"Successfully processed {comp_name}")

print("All extractions complete.")
