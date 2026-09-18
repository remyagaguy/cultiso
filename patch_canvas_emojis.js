const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'CultiPlanCanvas.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

// Replace specific emojis found in CultiPlanCanvas with icons or nothing
content = content.replace(/⏱️/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>');
content = content.replace(/👤/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>');
content = content.replace(/💡/g, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.55.59 2.79 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>');

fs.writeFileSync(tsPath, content);
console.log('Removed emojis from CultiPlanCanvas.tsx');
