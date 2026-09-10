import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'\s*<svg className="w-4 h-4 text-\[#052821\]/50 ml-0\.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\.5\} d="M9 5l7 7-7 7" /></svg>'

text = re.sub(pattern, '', text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
