import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Change "Nouveau" to "CULTISO"
text = re.sub(
    r'<span className="bg-\[#22c55e\] text-white text-\[10px\] md:text-\[11px\] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-\[0_0_10px_rgba\(34,197,94,0\.3\)\]">Nouveau</span>',
    '''<span className="bg-[#22c55e] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]">Cultiso</span>''',
    text
)

# 2. Change the button from Orange to Green
pattern_cta = r'<div className="absolute -inset-1 bg-gradient-to-r from-\[#D35400\] to-\[#F39C12\] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>\s*<button className="relative px-6 sm:px-8 h-\[54px\] text-\[15\.5px\] font-bold bg-\[#D35400\] hover:bg-\[#E67E22\] text-white rounded-xl shadow-\[0_8px_20px_rgba\(211,84,0,0\.3\)\] transition-all duration-300 active:scale-\[0\.98\] flex items-center justify-center gap-2\.5">'

new_cta = '''<div className="absolute -inset-1 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <button className="relative px-6 sm:px-8 h-[54px] text-[15.5px] font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-[0_8px_20px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5">'''

text = re.sub(pattern_cta, new_cta, text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
