const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
const tmpPath = path.join(__dirname, 'QuestionnaireWidget.tsx.tmp');

const tsContent = fs.readFileSync(targetPath, 'utf8');
const newWidget = fs.readFileSync(tmpPath, 'utf8');

const startMarker = 'const QuestionnaireWidget = ({';
const startIdx = tsContent.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find start marker");
  process.exit(1);
}

const endMarker = 'interface SharedChatProps';
const endIdx = tsContent.indexOf(endMarker, startIdx);
if (endIdx === -1) {
  console.error("Could not find end marker");
  process.exit(1);
}

// Find the precise end of the widget block by looking for the last '};' before 'interface SharedChatProps'
const beforeEnd = tsContent.substring(startIdx, endIdx);
const lastBraceIdx = beforeEnd.lastIndexOf('};\n');
if (lastBraceIdx === -1) {
   console.error("Could not find last brace");
}

const newTsContent = tsContent.substring(0, startIdx) + newWidget + '\n\n' + tsContent.substring(endIdx);

fs.writeFileSync(targetPath, newTsContent);
console.log('Successfully updated SharedChat.tsx with new widget.');
