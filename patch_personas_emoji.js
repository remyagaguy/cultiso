const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'lib', 'personas.ts');
let content = fs.readFileSync(tsPath, 'utf8');

content = content.replace(
  '4. MONNAIE ET DONNÉES DE PRIX (FCFA / BOLS)',
  '4. AUCUN EMOJI : Interdiction stricte et absolue d\'utiliser le moindre emoji dans toutes tes réponses, y compris dans le JSON et les messages texte.\n5. MONNAIE ET DONNÉES DE PRIX (FCFA / BOLS)'
);

content = content.replace(
  '- Une question à la fois, toujours via le widget JSON `questionnaire`, jamais en texte brut.',
  '- AUCUN EMOJI : Interdiction stricte et absolue d\'utiliser le moindre emoji dans tes réponses.\n- Une question à la fois, toujours via le widget JSON `questionnaire`, jamais en texte brut.'
);

fs.writeFileSync(tsPath, content);
console.log('Added strict emoji rule to personas.ts');
