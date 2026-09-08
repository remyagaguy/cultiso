import os

file_path = 'src/app/cultima/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'TransformationDashboard' not in content:
    content = content.replace(
        'import AnimalDashboard from "@/components/cultima/animal/AnimalDashboard";',
        'import AnimalDashboard from "@/components/cultima/animal/AnimalDashboard";\nimport TransformationDashboard from "@/components/cultima/transformation/TransformationDashboard";\nimport ServiceDashboard from "@/components/cultima/service/ServiceDashboard";\nimport NegoceDashboard from "@/components/cultima/negoce/NegoceDashboard";'
    )

# Add state type
content = content.replace(
    'useState<"vegetal" | "animal" | "mixte" | null>',
    'useState<"vegetal" | "animal" | "mixte" | "transformation" | "service" | "negoce" | null>'
)

# Add buttons
old_buttons = '<button onClick={() => setConfig("mixte")} className="p-3 bg-[#0B5345] text-white border border-transparent rounded-xl hover:bg-[#072F27] transition-all text-sm font-medium shadow-md">Charger le profil Mixte (Recommandé)</button>'
new_buttons = old_buttons + '\n                <div className="w-full h-[1px] bg-[#DFE4DA] my-2"></div>\n                <button onClick={() => setConfig("transformation")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Transformation Agroalimentaire</button>\n                <button onClick={() => setConfig("service")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Services Agricoles</button>\n                <button onClick={() => setConfig("negoce")} className="p-3 bg-white border border-[#DFE4DA] rounded-xl hover:border-[#0B5345] hover:shadow-sm transition-all text-sm font-medium">Agro-Commerce & Négoce</button>'

if 'Transformation Agroalimentaire' not in content:
    content = content.replace(old_buttons, new_buttons)

# Add conditions
old_mixte = '                  </div>\n                </div>\n              )}'
new_dashboards = '\n              {config === "transformation" && <TransformationDashboard />}\n              {config === "service" && <ServiceDashboard />}\n              {config === "negoce" && <NegoceDashboard />}'

if '<TransformationDashboard />' not in content:
    content = content.replace(old_mixte, old_mixte + new_dashboards)

# Fix SharedChat dummy callback
old_callback = 'if (data && (data === "vegetal" || data === "animal" || data === "mixte")) {'
new_callback = 'if (data && (data === "vegetal" || data === "animal" || data === "mixte" || data === "transformation" || data === "service" || data === "negoce")) {'
content = content.replace(old_callback, new_callback)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated Cultima page')
