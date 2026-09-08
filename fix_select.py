import os
file_path = 'src/components/cultisia/SharedChat.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('.select("id")', '.select("id, title")')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
