import os
files_to_check = [
    'src/app/(marketing)/page.tsx',
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/MegaMenuProducts.tsx',
    'src/components/layout/MegaMenuSolutions.tsx',
    'src/components/layout/MegaMenuResources.tsx'
]
for f in files_to_check:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        content = content.replace('href="/cultiplan"', 'href="/register"')
        content = content.replace('href="/cultima"', 'href="/register"')
        content = content.replace('href="/cultisia"', 'href="/register"')
        content = content.replace('href="/cultiseil"', 'href="/register"')
        content = content.replace('href="/cultishop"', 'href="/register"')
        content = content.replace('href="/dashboard"', 'href="/register"')
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Mise a jour de {f}')
