import { languages, ExtensionContext, CompletionItemProvider,
         TextDocument, Position, ProviderResult,
         CompletionItem, CompletionList, CompletionItemKind }  from 'vscode';
import { classNames } from './TnClassName';

export function activate(context: ExtensionContext) {
  // 注册补全项提供器
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
  );
  context.subscriptions.push(htmlCompletionProvider);
}
// 构造补全项提供器
class ClassNameCompletionProvider implements CompletionItemProvider {

  private isCursorInsideClassAttribute(document: TextDocument, position: Position): boolean {
    const line = document.lineAt(position);
    const lineText = line.text.substring(0, position.character);
    const regex = /(?:\s|^)class\s*=\s*["'][^"']*$/i;
    return regex.test(lineText);
  }
  provideCompletionItems(
    document: TextDocument,
    position: Position
  ): ProviderResult<CompletionItem[] | CompletionList> {
    if (!this.isCursorInsideClassAttribute(document, position)) {
      return undefined;
    }
    const completionItems: CompletionItem[] = classNames.map(
      className => new CompletionItem(className, CompletionItemKind.Snippet)
    );
    return completionItems;
  }
}
