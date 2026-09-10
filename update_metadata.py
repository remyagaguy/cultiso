import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'export const metadata: Metadata = \{\n\s*title: "Cultiso - Intelligence Agrobusiness",\n\s*description: "Plateforme d\'Intelligence Agrobusiness",\n\s*\};'

new_meta = '''export const metadata: Metadata = {
  title: "Cultiso - Intelligence Agrobusiness",
  description: "Plateforme d'Intelligence Agrobusiness pour la conquête de la souveraineté alimentaire africaine.",
  openGraph: {
    images: ['/hero-bg.jpeg'],
  },
};'''

text = re.sub(pattern, new_meta, text)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
