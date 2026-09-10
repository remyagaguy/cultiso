import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<div className="pt-6 flex flex-row items-center gap-5">.*?<span>Sans carte bancaire\.</span>\s*</div>\s*</div>'

new_cta = '''<div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <Link href="/cultiplan" className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D35400] to-[#F39C12] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <button className="relative px-6 sm:px-8 h-[54px] text-[15.5px] font-bold bg-[#D35400] hover:bg-[#E67E22] text-white rounded-xl shadow-[0_8px_20px_rgba(211,84,0,0.3)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5">
                      <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      Simuler mon business
                      <svg className="w-4 h-4 ml-0.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </Link>
                  
                  <div className="hidden sm:flex flex-col gap-1.5 text-white/75 text-[12.5px] font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500/20 text-green-400">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>100% gratuit, accès immédiat.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-white/60">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <span>Aucune carte bancaire requise.</span>
                    </div>
                  </div>
                </div>'''

text = re.sub(pattern, new_cta, text, flags=re.DOTALL)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
