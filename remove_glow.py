import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern to match the Link and its contents, up to the end of the button opening tag
pattern = r'<Link href="/cultiplan" className="group relative">\s*<div className="absolute -inset-1 bg-gradient-to-r from-\[#22c55e\] to-\[#16a34a\] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>\s*<button className="relative px-6 sm:px-8 h-\[54px\] text-\[15\.5px\] font-bold bg-\[#22c55e\] hover:bg-\[#16a34a\] text-white rounded-xl shadow-\[0_8px_20px_rgba\(34,197,94,0\.3\)\] transition-all duration-300 active:scale-\[0\.98\] flex items-center justify-center gap-2\.5">'

new_tag = '''<Link href="/cultiplan" className="group">
                    <button className="px-6 sm:px-8 h-[54px] text-[15.5px] font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5">'''

text = re.sub(pattern, new_tag, text)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
