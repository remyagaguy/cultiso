import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'<div className="text-center max-w-\[1000px\] mx-auto mb-16 md:mb-20">.*?</div>'

replacement = '''<div className="text-center max-w-[1000px] mx-auto mb-16 md:mb-20">
              <h2 className="text-[clamp(30px,4vw,48px)] font-unbounded font-bold text-[#052821] mb-6 tracking-[-0.02em] leading-[1.1]">
                L'improvisation ruine vos investissements <br className="hidden md:block" /> 
                <span className="bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">— Cultiso vous donne les outils pour les rentabiliser.</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-gray-500 font-manrope max-w-3xl mx-auto leading-relaxed">
                Des outils intelligents pour gérer et sécuriser chaque aspect de votre agrobusiness, de l'idée jusqu'à la vente de vos produits.
              </p>
            </div>'''

new_text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Update applied")
