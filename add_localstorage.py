import os

# 1. Update SharedChat.tsx
chat_file = 'src/components/cultisia/SharedChat.tsx'
with open(chat_file, 'r', encoding='utf-8') as f:
    chat_content = f.read()

chat_content = chat_content.replace(
    "window.location.href = '/cultiplan';",
    "localStorage.setItem('cultiplan_latest', JSON.stringify(simulationData.payload));\n                                      window.location.href = '/cultiplan';"
)

with open(chat_file, 'w', encoding='utf-8') as f:
    f.write(chat_content)

# 2. Update CultiplanPage
cultiplan_file = 'src/app/cultiplan/page.tsx'
with open(cultiplan_file, 'r', encoding='utf-8') as f:
    cultiplan_content = f.read()

if 'useEffect(() => {' not in cultiplan_content:
    cultiplan_content = cultiplan_content.replace(
        'const [simulationData, setSimulationData] = useState<any>(null);',
        'const [simulationData, setSimulationData] = useState<any>(null);\n  useEffect(() => {\n    const saved = localStorage.getItem("cultiplan_latest");\n    if (saved) {\n      try {\n        setSimulationData(JSON.parse(saved));\n      } catch(e) {}\n    }\n  }, []);'
    )
    
    if 'import { useState, useRef }' in cultiplan_content:
        cultiplan_content = cultiplan_content.replace(
            'import { useState, useRef }',
            'import { useState, useRef, useEffect }'
        )
    elif 'import { useState }' in cultiplan_content:
        cultiplan_content = cultiplan_content.replace(
            'import { useState }',
            'import { useState, useEffect }'
        )

cultiplan_content = cultiplan_content.replace(
    'onSimulationComplete={(data) => setSimulationData(data)}',
    'onSimulationComplete={(data) => { setSimulationData(data); localStorage.setItem("cultiplan_latest", JSON.stringify(data)); }}'
)

with open(cultiplan_file, 'w', encoding='utf-8') as f:
    f.write(cultiplan_content)

print('LocalStorage integration done')
