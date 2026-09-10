import re

filepath = 'src/app/(app)/cultiplan/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Remplacer 'fixed inset-0 z-[9999]' par 'flex-1 h-[calc(100vh-80px)]'
# 80px is the height of the topbar, so the tool takes exactly the remaining height without scrolling the whole page if possible.
text = text.replace('className="fixed inset-0 z-[9999] flex', 'className="flex-1 flex h-[calc(100vh-80px)]')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)
