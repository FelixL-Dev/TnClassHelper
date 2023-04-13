import { languages, ExtensionContext, CompletionItemProvider,
         TextDocument, Position, ProviderResult,
         CompletionItem, CompletionList, CompletionItemKind, workspace }  from 'vscode'
import { classNames } from './TnClassName'
import * as fs from 'fs'
import * as path from 'path'

export function activate(context: ExtensionContext) {
  const rootPath = workspace.workspaceFolders ? workspace.workspaceFolders[0].uri.fsPath : ''
  const dependencyPath = path.join(rootPath, 'node_modules', '@tuniao', 'tn-style')

  fs.access(dependencyPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log('The @tuniao/tn-style dependency is not installed.')
      return
    }
    const htmlCompletionProvider = languages.registerCompletionItemProvider([{
          language: 'pug', scheme: 'file'
      }, {
          language: 'jade', scheme: 'file'
      }, {
        language: 'vue', scheme: 'file',
      }, {
          language: 'html', scheme: 'file'}], 
      new ClassNameCompletionProvider(),
      '', ' ', ':', '<', '"', "'", '='
    )
    context.subscriptions.push(htmlCompletionProvider)
  })
}

class ClassNameCompletionProvider implements CompletionItemProvider {

  private isCursorInsideClassAttribute(document: TextDocument, position: Position): boolean {
    const line = document.lineAt(position)
    const lineText = line.text.substring(0, position.character)
    const regex = /(?:\s|^)class\s*=\s*["'][^"']*$/i
    return regex.test(lineText)
  }
  provideCompletionItems(
    document: TextDocument,
    position: Position
  ): ProviderResult<CompletionItem[] | CompletionList> {
    if (!this.isCursorInsideClassAttribute(document, position)) {
      return undefined
    }
    const completionItems: CompletionItem[] = classNames.map(
      className => new CompletionItem(className, CompletionItemKind.Snippet)
    )
    return completionItems
  }
}
