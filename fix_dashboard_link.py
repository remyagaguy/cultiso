import re

with open('src/app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('href: "/simulateur"', 'href: "/cultiplan"')

with open('src/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
