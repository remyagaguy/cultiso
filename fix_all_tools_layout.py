import re
import glob

files = glob.glob('src/app/(app)/**/page.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove 'fixed inset-0 z-[9999]' to let it flow inside the app shell
    text = text.replace('className="fixed inset-0 z-[9999] flex', 'className="flex-1 flex h-[calc(100vh-80px)]')
    
    # Hide the old slim sidebars (they start with <aside className="hidden md:flex w-[72px])
    text = text.replace('className="hidden md:flex w-[72px]', 'className="hidden"')
    text = text.replace('className="flex w-[72px]', 'className="hidden"') # in case it's not hidden on mobile

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)
