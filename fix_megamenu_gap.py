import os

files = [
    'src/components/layout/MegaMenuProducts.tsx',
    'src/components/layout/MegaMenuSolutions.tsx',
    'src/components/layout/MegaMenuResources.tsx'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Replace top-[calc(100%+10px)] with a version that includes the invisible bridge
    content = content.replace(
        'top-[calc(100%+10px)] left-1/2', 
        'top-[calc(100%+10px)] left-1/2 before:absolute before:-top-5 before:left-0 before:w-full before:h-5 before:bg-transparent before:content-[\'\']'
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Fixed gap in {f}")
