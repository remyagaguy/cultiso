import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-2 sm:gap-3 pr-3 sm:pr-5 pl-1\.5 py-1\.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-fit">\s*<span className="bg-\[#22c55e\] text-white text-\[10px\] md:text-\[11px\] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-\[0_0_10px_rgba\(34,197,94,0\.3\)\]">Cultiso</span>\s*<span className="text-\[11px\] sm:text-\[13px\] md:text-\[14px\] text-white/90 font-medium tracking-wide whitespace-nowrap">Le premier écosystème intelligent pour l\'agriculture</span>\s*</Link>'

new_link = '''<Link href="#processus" className="group mb-5 md:mb-6 inline-flex items-center gap-1.5 sm:gap-3 pr-2.5 sm:pr-5 pl-1 sm:pl-1.5 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-fit max-w-full overflow-hidden">
                  <span className="bg-[#22c55e] text-white text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] shrink-0">Cultiso</span>
                  <span className="text-[9.5px] sm:text-[13px] md:text-[14px] text-white/90 font-medium tracking-wide whitespace-nowrap truncate">
                    <span className="sm:hidden">1er écosystème intelligent pour l'agriculture</span>
                    <span className="hidden sm:inline">Le premier écosystème intelligent pour l'agriculture</span>
                  </span>
                </Link>'''

text = re.sub(pattern, new_link, text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
