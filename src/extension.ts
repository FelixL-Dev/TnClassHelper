import { languages, ExtensionContext, CompletionItemProvider,
         TextDocument, Position, ProviderResult,
         CompletionItem, CompletionList, CompletionItemKind, workspace,MarkdownString }  from 'vscode'
import { classNamesWithDetails } from './TnClassName'
import * as fs from 'fs'
import * as path from 'path'
interface ClassNameWithDetails {
  name: string
  documentation: string
}

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

  private getRandomEmoji(): string {
    const emojiLibrary: string[] = [
      "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
      "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🙃",
      "😇", "🥲", "😍", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄",
      "😏", "😣", "😥", "😮", "🥱", "😌", "😛", "😜", "😝", "🤤",
    ];

    const randomIndex = Math.floor(Math.random() * emojiLibrary.length);
    return emojiLibrary[randomIndex];
}


  private processDocumentation(documentation: string): string {
    const colorRegex = /(background-color|color):\s*([^;]+);/gi;
    return documentation.replace(colorRegex, (match, property, value) => {
      const emoji = this.getRandomEmoji();
      return `${property}: ${emoji} ${value};`;
    });
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position
  ): ProviderResult<CompletionItem[] | CompletionList> {
    if (!this.isCursorInsideClassAttribute(document, position)) {
      return undefined;
    }
  
    const completionItems: CompletionItem[] = classNamesWithDetails.map(({ name, documentation }: ClassNameWithDetails) => {
      const item = new CompletionItem(name, CompletionItemKind.Snippet);
      const processedDocumentation = this.processDocumentation(documentation);
      item.documentation = new MarkdownString(processedDocumentation);
      return item;
    });
  
    return completionItems;
  }
  
}
