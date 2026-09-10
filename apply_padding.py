import sys

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('className="relative w-full px-6 pt-20 pb-16 md:pt-[100px] lg:pt-[100px] lg:pb-24 flex items-center bg-[#052821] overflow-hidden"', 'className="relative w-full px-6 pt-[64px] pb-16 md:pt-[64px] lg:pt-[64px] lg:pb-24 flex items-center bg-[#052821] overflow-hidden"')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
