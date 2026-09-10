import re

filepath = 'src/app/(app)/dashboard/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(r'className={\mt-0.5 \}', r"className={mt-0.5 }")
text = text.replace(r'className={\text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full \}', r"className={	ext-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full }")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
