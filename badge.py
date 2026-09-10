import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<div className="max-w-\[850px\] space-y-6 lg:space-y-7">\s*<h1'

replacement = '''<div className="max-w-[850px] space-y-6 lg:space-y-7">
              <Link href="#processus" className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-[13px] md:text-[14px] font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-fit">
                <span className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D35400] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D35400]"></span>
                  </span>
                  Le premier écosystème intelligent pour l'agriculture
                </span>
                <svg className="w-4 h-4 text-white/60 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </Link>
              
              <h1'''

new_text = re.sub(pattern, replacement, text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Badge added")
