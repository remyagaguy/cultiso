const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

// Fix interface
content = content.replace(
  'onTransactionDraft?: (data: any) => void;\n}',
  'onTransactionDraft?: (data: any) => void;\n  onNewDiscussion?: () => void;\n}'
);
// In case the above didn't match, let's try a regex
content = content.replace(/onTransactionDraft\?: \(data: any\) => void;\n}/g, 'onTransactionDraft?: (data: any) => void;\n  onNewDiscussion?: () => void;\n}');

// Fix msgs implicitly any
content = content.replace(
  'const extractSimulationData = (msgs) => {',
  'const extractSimulationData = (msgs: ChatMessage[]) => {'
);

fs.writeFileSync(tsPath, content);
console.log('Fixed typings');
