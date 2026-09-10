import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the extra div
pattern = r'</div>\s*</div>\s*</div>\s*</div>\s*</section>'
replacement = r'</div>\s*</div>\s*</section>'

# Let's be safer:
text = text.replace('</div>\n                </div>\n\n            </div>\n          </div>\n        </section>', '</div>\n\n            </div>\n          </div>\n        </section>')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
