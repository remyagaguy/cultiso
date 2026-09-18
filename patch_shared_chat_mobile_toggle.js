const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

// Remove duplicate mobile toggle
content = content.replace(/\{\/\* Mobile menu toggle[\s\S]*?<\/button>\s*\}/, '');

fs.writeFileSync(tsPath, content);
console.log('Removed duplicate mobile menu toggle');
