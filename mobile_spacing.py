import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Spacing for Hero Title (mb-4 -> mb-6)
text = text.replace(
    '<h1 className="mb-4 md:mb-5 text-[clamp(36px,6vw,68px)] font-unbounded font-bold text-white leading-[1.05] tracking-[-0.03em]">',
    '<h1 className="mb-6 md:mb-5 text-[clamp(36px,6vw,68px)] font-unbounded font-bold text-white leading-[1.05] tracking-[-0.03em]">'
)

# 2. Spacing for Hero Subtitle (mb-8 -> mb-10)
text = text.replace(
    '<p className="mb-8 md:mb-10 text-[17px] md:text-[19px] leading-[1.5] text-white/95 font-manrope font-semibold">',
    '<p className="mb-10 md:mb-10 text-[17px] md:text-[19px] leading-[1.5] text-white/95 font-manrope font-semibold">'
)

# 3. Spacing for CTA wrapper (pt-8 -> pt-10)
text = text.replace(
    '<div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">',
    '<div className="pt-10 md:pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">'
)

# 4. Reduce Section 2 title size on mobile
old_h2 = '<h2 className="text-[clamp(24px,3.5vw,36px)] font-unbounded font-bold text-[#052821] mb-6 tracking-[-0.02em] leading-[1.2]">'
new_h2 = '<h2 className="text-[20px] md:text-[clamp(28px,3.5vw,36px)] font-unbounded font-bold text-[#052821] mb-6 tracking-[-0.02em] leading-[1.2]">'

text = text.replace(old_h2, new_h2)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
