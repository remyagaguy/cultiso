import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<span className="bg-\[#D35400\] text-white text-\[10px\] md:text-\[11px\] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-\[0_0_10px_rgba\(211,84,0,0\.3\)\]">Vision</span>'

new_badge = '''<span className="bg-[#22c55e] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]">Nouveau</span>'''

text = re.sub(pattern, new_badge, text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
