const fs = require('fs');

const promptPath = 'Cloud/Cultiplan/cultisia-system-prompt-v1.2.md';
const modelPath = 'Cloud/Cultiplan/modele_cultiso.md';
const schemaPath = 'Cloud/Cultiplan/cultiplan-business-plan.schema.json';
const personasPath = 'src/lib/personas.ts';

const promptContent = fs.readFileSync(promptPath, 'utf8');
const modelContent = fs.readFileSync(modelPath, 'utf8');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');

const fullCultiplanPrompt = promptContent + "\n\n---\nVOICI LE MODÈLE CULTISO DE RÉFÉRENCE :\n" + modelContent + "\n\n---\nVOICI LE SCHÉMA JSON REQUIS POUR LA SORTIE FINALE (cultiplan-business-plan.schema.json) :\n```json\n" + schemaContent + "\n```\n";

let personasContent = fs.readFileSync(personasPath, 'utf8');

// 1. Remove the override block at the bottom
const overrideStart = personasContent.indexOf('  } else if (toolContext === "cultiplan") {');
if (overrideStart !== -1) {
  // Find the end of the block (which is the closing brace before `return systemPrompt;`)
  const overrideEnd = personasContent.indexOf('  return systemPrompt;', overrideStart);
  personasContent = personasContent.substring(0, overrideStart) + "  }\n\n" + personasContent.substring(overrideEnd);
}

// 2. Replace the roleContext for cultiplan
const caseCultiplanStart = personasContent.indexOf('case "cultiplan":');
const roleContextStart = personasContent.indexOf('roleContext = `', caseCultiplanStart);
const roleContextEnd = personasContent.indexOf('`;\n      break;', roleContextStart);

if (caseCultiplanStart !== -1 && roleContextStart !== -1 && roleContextEnd !== -1) {
  const before = personasContent.substring(0, roleContextStart);
  const after = personasContent.substring(roleContextEnd);
  
  const newRoleContext = 'roleContext = `' + fullCultiplanPrompt.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`';
  
  personasContent = before + newRoleContext + after;
  fs.writeFileSync(personasPath, personasContent, 'utf8');
  console.log('Successfully updated personas.ts');
} else {
  console.log('Failed to find case "cultiplan"');
}
