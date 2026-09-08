import os

files = [
  {"path": "src/components/cultima/transformation/TransformationDashboard.tsx", "name": "TransformationDashboard"},
  {"path": "src/components/cultima/service/ServiceDashboard.tsx", "name": "ServiceDashboard"},
  {"path": "src/components/cultima/negoce/NegoceDashboard.tsx", "name": "NegoceDashboard"}
]

import re

for file in files:
    with open(file["path"], "r", encoding="utf-8") as f:
        content = f.read()
        
    if "use client" not in content:
        content = '"use client";\n' + content
        
    content = re.sub(r'export default function \w+\(\) \{', f'export default function {file["name"]}() {{', content)
    
    content = content.replace('@/lib/', './lib/')
    content = content.replace('@/components/', './components/')
    
    with open(file["path"], "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed")
