/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.classNames = void 0;
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const vscode_1 = __webpack_require__(1);
const rootPath = vscode_1.workspace.workspaceFolders ? vscode_1.workspace.workspaceFolders[0].uri.fsPath : '';
const cssFilePath = path.join(rootPath, 'node_modules', '@tuniao', 'tn-style', 'dist', 'index.css');
let classNames = [];
exports.classNames = classNames;
fs.readFile(cssFilePath, 'utf-8', (err, data) => {
    if (!data) {
        return;
    }
    const cssContent = data;
    const classNameRegex = /\.([\w-]+)\s*\{/g;
    let match;
    while ((match = classNameRegex.exec(cssContent)) !== null) {
        classNames.push(match[1]);
    }
});


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const TnClassName_1 = __webpack_require__(2);
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
function activate(context) {
    const rootPath = vscode_1.workspace.workspaceFolders ? vscode_1.workspace.workspaceFolders[0].uri.fsPath : '';
    const dependencyPath = path.join(rootPath, 'node_modules', '@tuniao', 'tn-style');
    fs.access(dependencyPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('The @tuniao/tn-style dependency is not installed.');
            return;
        }
        const htmlCompletionProvider = vscode_1.languages.registerCompletionItemProvider([{
                language: 'pug', scheme: 'file'
            }, {
                language: 'jade', scheme: 'file'
            }, {
                language: 'vue', scheme: 'file',
            }, {
                language: 'html', scheme: 'file'
            }], new ClassNameCompletionProvider(), '', ' ', ':', '<', '"', "'", '=');
        context.subscriptions.push(htmlCompletionProvider);
    });
}
exports.activate = activate;
class ClassNameCompletionProvider {
    isCursorInsideClassAttribute(document, position) {
        const line = document.lineAt(position);
        const lineText = line.text.substring(0, position.character);
        const regex = /(?:\s|^)class\s*=\s*["'][^"']*$/i;
        return regex.test(lineText);
    }
    provideCompletionItems(document, position) {
        if (!this.isCursorInsideClassAttribute(document, position)) {
            return undefined;
        }
        const completionItems = TnClassName_1.classNames.map(className => new vscode_1.CompletionItem(className, vscode_1.CompletionItemKind.Snippet));
        return completionItems;
    }
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map