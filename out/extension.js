"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    const htmlCompletionProvider = vscode.languages.registerCompletionItemProvider('html', new ClassNameCompletionProvider(), '"' // Trigger character
    );
    context.subscriptions.push(htmlCompletionProvider);
}
exports.activate = activate;
class ClassNameCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const completionItems = [
            new vscode.CompletionItem('test-icon', vscode.CompletionItemKind.Property),
            new vscode.CompletionItem('test-title', vscode.CompletionItemKind.Property),
            new vscode.CompletionItem('test-label', vscode.CompletionItemKind.Property),
            // Add more class names here
        ];
        return completionItems;
    }
}
//# sourceMappingURL=extension.js.map