import sys

with open('src/app/(auth)/register/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re

text = re.sub(r"const \{ error \} = await supabase.from\('waitlist' as any\).insert\(\[\s*\{\s*email: email,\s*full_name: nom,\s*project_description: projet\s*\} as any\s*\]\);", 
"const { error } = await (supabase as any).from('waitlist').insert([\\n      { \\n        email: email, \\n        full_name: nom, \\n        project_description: projet \\n      }\\n    ]);", text)

with open('src/app/(auth)/register/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
