const fs = require('fs');
const tsPath = 'src/components/cultisia/SharedChat.tsx';
let content = fs.readFileSync(tsPath, 'utf8');

content = content.replace(
  'questions: { question: string; options: string[] }[];',
  'questions: { question: string; options: string[]; allow_multiple?: boolean }[];'
);

fs.writeFileSync(tsPath, content);
console.log('Fixed interface');
