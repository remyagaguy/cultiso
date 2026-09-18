const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'Cloud', 'Cultiplan', 'cultisia_cultiplan_system_prompt_v2.md');
const tsPath = path.join(__dirname, 'src', 'lib', 'personas.ts');

const newPrompt = fs.readFileSync(mdPath, 'utf8');
const tsContent = fs.readFileSync(tsPath, 'utf8');

const startMarker = '} else if (toolContext === "cultiplan") {\n    systemPrompt = `';
const startIdx = tsContent.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find start marker");
  process.exit(1);
}

const contentStart = startIdx + startMarker.length;
const endMarker = '`;\n  }';
const contentEnd = tsContent.indexOf(endMarker, contentStart);

if (contentEnd === -1) {
  console.error("Could not find end marker");
  process.exit(1);
}

const escapedPrompt = newPrompt.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const newTsContent = tsContent.substring(0, contentStart) + escapedPrompt + tsContent.substring(contentEnd);

fs.writeFileSync(tsPath, newTsContent);
console.log('Successfully updated personas.ts with v2 prompt.');
