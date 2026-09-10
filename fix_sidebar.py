import re

filepath = 'src/app/(app)/layout.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('w-72 bg-[#052821]', 'w-72 shrink-0 bg-[#052821]')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
