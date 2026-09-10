import re

with open('src/components/layout/Header.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    '!bg-[#1A1A1A] hover:!bg-[#333333]',
    '!bg-[#0B5345] hover:!bg-[#073A30]'
)

with open('src/components/layout/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
