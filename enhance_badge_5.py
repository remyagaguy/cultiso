import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-3 px-5 py-2\.5 rounded-full bg-white text-\[#052821\] shadow-\[0_8px_20px_rgba\(0,0,0,0\.15\)\] hover:shadow-\[0_12px_25px_rgba\(0,0,0,0\.2\)\] hover:-translate-y-0\.5 transition-all duration-300 w-fit">.*?Le premier écosystème intelligent pour l\'agriculture.*?</span>\s*</Link>'

new_badge = '''<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-fit">
                  <span className="bg-[#D35400] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(211,84,0,0.3)]">Vision</span>
                  <span className="text-[13px] md:text-[14px] text-white/90 font-medium tracking-wide">Le premier écosystème intelligent pour l'agriculture</span>
                </Link>'''

text = re.sub(pattern, new_badge, text, flags=re.DOTALL)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
