import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-3 px-5 py-2\.5 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/0 backdrop-blur-md text-white shadow-lg shadow-black/20 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0\.5 hover:shadow-\[0_0_20px_rgba\(255,255,255,0\.15\)\] transition-all duration-300 w-fit">.*?Le premier écosystème intelligent pour l\'agriculture.*?<svg className="w-4 h-4 text-white/70 ml-0\.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\.5\} d="M9 5l7 7-7 7" /></svg>\s*</Link>'

new_badge = '''<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#D35400]/30 bg-[#D35400]/10 backdrop-blur-md text-white shadow-[0_0_20px_rgba(211,84,0,0.15)] hover:bg-[#D35400]/20 hover:border-[#D35400]/50 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(211,84,0,0.25)] transition-all duration-300 w-fit">
                  <span className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D35400] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D35400]"></span>
                    </span>
                    <span className="text-[13px] md:text-[14px] font-medium tracking-wide text-[#fff5f0]">Le premier écosystème intelligent pour l'agriculture</span>
                  </span>
                  <svg className="w-4 h-4 text-[#D35400] ml-0.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>'''

text = re.sub(pattern, new_badge, text, flags=re.DOTALL)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
