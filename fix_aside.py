import glob

files = glob.glob('src/app/(app)/**/page.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # We need to fix the broken aside class
    # It currently looks like: className="hidden" bg-white border-r border-gray-200 flex-col items-center py-6 gap-8 flex-shrink-0 z-20">
    # Let's just fix it by replacing the whole broken string with className="hidden"
    text = text.replace('className="hidden" bg-white border-r border-gray-200 flex-col items-center py-6 gap-8 flex-shrink-0 z-20">', 'className="hidden">')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
