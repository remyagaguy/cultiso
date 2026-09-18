const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, 'src', 'components', 'cultisia', 'SharedChat.tsx');
let content = fs.readFileSync(tsPath, 'utf8');

content = content.replace(/interface SharedChatProps \{[\s\S]*?\}/, `interface SharedChatProps {
  toolContext: "cultisia" | "cultiplan" | "cultiseil" | "cultima";
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  isEmbedded?: boolean;
  hideSidebar?: boolean;
  onSimulationComplete?: (data: any) => void;
  onConfigComplete?: (data: any) => void;
  onTransactionDraft?: (data: any) => void;
  onNewDiscussion?: () => void;
}`);

fs.writeFileSync(tsPath, content);
console.log('Fixed typings again');
