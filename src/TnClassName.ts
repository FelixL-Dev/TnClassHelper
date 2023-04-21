import * as fs from 'fs';
import * as path from 'path';
import { workspace } from 'vscode';

const rootPath = workspace.workspaceFolders ? workspace.workspaceFolders[0].uri.fsPath : '';

const cssFilePath = path.join(
  rootPath,
  'node_modules',
  '@tuniao',
  'tn-style',
  'dist',
  'index.css'
);

const classNamesWithDetails: any = [];

fs.readFile(cssFilePath, 'utf-8', (err, data) => {
  if (!data) {
    return;
  }
  const cssContent = data;
  const classNameWithDetailsRegex = /\.([\w-]+)\s*\{([^}]+)}/g;
  let match;
  while ((match = classNameWithDetailsRegex.exec(cssContent)) !== null) {
    classNamesWithDetails.push({
      name: match[1],
      documentation: match[2].trim()
    });
  }
});

export { classNamesWithDetails };
