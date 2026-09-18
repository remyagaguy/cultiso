const fs = require('fs');
let code = fs.readFileSync('src/components/cultisia/SharedChat.tsx', 'utf8');
if (!code.includes('Drawer')) {
    code = code.replace(/import \{ Dropdown, message as antMessage \} from "antd";/, 'import { Dropdown, message as antMessage, Drawer } from "antd";');
    fs.writeFileSync('src/components/cultisia/SharedChat.tsx', code);
    console.log("Imported Drawer");
} else {
    console.log("Drawer already imported or string not found");
}
