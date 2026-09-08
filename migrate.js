const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Fix types import
      content = content.replace(/\.\.\/types/g, './types');
      content = content.replace(/\.\.\/\.\.\/types/g, '../../types'); // charts need this? No, charts are in `animal/charts/`, types is in `animal/`. So charts need `../types`.
      
      if (fullPath.includes('charts')) {
        content = content.replace(/\.\/types/g, '../types');
      }

      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  }
}

processDir('src/components/cultima/animal');
console.log('Done');
