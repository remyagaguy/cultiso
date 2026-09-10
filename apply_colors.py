import sys

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent', 'text-[#0B5345]')
text = text.replace('- Cultiso vous donne', '— <span className="text-[#D35400]">Cultiso</span> vous donne')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
