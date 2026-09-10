import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Badge text single line
text = text.replace(
    '<span className="text-[13px] md:text-[14px] text-white/90 font-medium tracking-wide">Le premier écosystème intelligent pour l\'agriculture</span>',
    '<span className="text-[11px] sm:text-[13px] md:text-[14px] text-white/90 font-medium tracking-wide whitespace-nowrap">Le premier écosystème intelligent pour l\'agriculture</span>'
)
text = text.replace(
    'inline-flex items-center gap-3 pr-5 pl-1.5 py-1.5 rounded-full',
    'inline-flex items-center gap-2 sm:gap-3 pr-3 sm:pr-5 pl-1.5 py-1.5 rounded-full'
)

# 2. Spacing H1, P, CTA
text = text.replace(
    '<h1 className="mb-6 md:mb-5 text-[clamp(36px,6vw,68px)] font-unbounded font-bold text-white leading-[1.05] tracking-[-0.03em]">',
    '<h1 className="mb-6 md:mb-6 text-[clamp(36px,6vw,68px)] font-unbounded font-bold text-white leading-[1.05] tracking-[-0.03em]">'
)
text = text.replace(
    '<p className="mb-10 md:mb-10 text-[17px] md:text-[19px] leading-[1.5] text-white/95 font-manrope font-semibold">',
    '<p className="mb-6 md:mb-8 text-[17px] md:text-[19px] leading-[1.5] text-white/95 font-manrope font-semibold">'
)
text = text.replace(
    '<div className="pt-10 md:pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">',
    '<div className="pt-0 md:pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">'
)

# 3. Social Proof visibility and text
text = text.replace(
    '<div className="hidden sm:flex items-center gap-3">',
    '<div className="flex items-center gap-3 mt-1 sm:mt-0">'
)
text = text.replace(
    'Déjà +500 pionniers inscrits',
    'Déjà +50 agripreneurs inscrits'
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
