import * as fs from 'fs'
import * as path from 'path'
import { workspace } from 'vscode'

const rootPath = workspace.workspaceFolders ? workspace.workspaceFolders[0].uri.fsPath : ''

const cssFilePath = path.join(
  rootPath,
  'node_modules',
  '@tuniao',
  'tn-style',
  'dist',
  'index.css'
)
let classNames: string[] = []

fs.readFile(cssFilePath, 'utf-8', (err,data) => {
  if(!data) {
    return
  }
  const cssContent = data
  const classNameRegex = /\.([\w-]+)\s*\{/g
  let match
  while ((match = classNameRegex.exec(cssContent)) !== null) {
    classNames.push(match[1])
  }
})
export { classNames }

