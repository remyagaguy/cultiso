import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update padding
text = re.sub(
    r'px-6 pt-12 pb-16 md:pt-20 lg:pt-16 lg:pb-24',
    r'px-6 pt-20 pb-16 md:pt-28 lg:pt-24 lg:pb-24',
    text
)

# 2. Update the wrapper and specific margins
pattern = r'<div className="max-w-\[850px\] space-y-6 lg:space-y-7">\s*<Link href="#processus" className="inline-flex (.*?)"'
replacement = r'<div className="max-w-[850px] flex flex-col items-start">\n              <Link href="#processus" className="mb-5 md:mb-6 inline-flex \1"'
text = re.sub(pattern, replacement, text)

# 3. Update H1 margin
text = re.sub(
    r'<h1 className="text-\[clamp\(36px,6vw,68px\)\]',
    r'<h1 className="mb-4 md:mb-5 text-[clamp(36px,6vw,68px)]',
    text
)

# 4. Update paragraph margin
text = re.sub(
    r'<p className="text-\[16px\] md:text-\[19px\] text-white/90',
    r'<p className="mb-8 md:mb-10 text-[16px] md:text-[19px] text-white/90',
    text
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Adjustments applied")
