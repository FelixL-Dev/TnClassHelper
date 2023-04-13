import * as fs from 'fs';
import * as path from 'path';

const cssFilePath = path.join(__dirname, '../src/TnClassName.css');
const cssContent = fs.readFileSync(cssFilePath, 'utf8');
const classNameRegex = /\.([\w-]+)\s*\{/g;
let classNames: string[] = [];
let match;
while ((match = classNameRegex.exec(cssContent)) !== null) {
  classNames.push(match[1]);
}

export { classNames };

