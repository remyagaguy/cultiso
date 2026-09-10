import sys

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('— Cultiso vous donne', '— <span className="text-[#D35400]">Cultiso</span> vous donne')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
