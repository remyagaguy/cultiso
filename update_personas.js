const fs = require('fs');

const claudePrompt = fs.readFileSync('Cloud/Cultiplan/cultisia_cultiplan_system_prompt.md', 'utf-8')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');

let content = fs.readFileSync('src/lib/personas.ts', 'utf-8');

const regex = /else if \(toolContext === "cultiplan"\) \{[\s\S]*?\}\s*return systemPrompt;/;

const newBlock = `else if (toolContext === "cultiplan") {
    systemPrompt = \`${claudePrompt}

CONTEXTE INTERNE (RAG / PRIX DU MARCHÉ) :
\${ragContext}
\${priceContext}\`;
  }

  return systemPrompt;`;

content = content.replace(regex, newBlock);
fs.writeFileSync('src/lib/personas.ts', content);
