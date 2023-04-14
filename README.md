# TnClassHelper

TnClassHelper是一款Visual Studio Code样式补全插件 为帮助使用Tuniao-ui 用户提供自动完成、语法突出显示功能来增强开发体验。

## [图鸟UI](https://ext.dcloud.net.cn/plugin?id=7088)

是基于uni-app进行开发的UI框架，提供丰富的组件进行快速开发，已经支持APP、H5、微信小程序，包含常用表单组件、信息展示组件等，并提供丰富的酷炫页面模板。（[Gitee](https://gitee.com/TSpecific/tuniao-ui)）

## 触发问题

默认情况下，VS Code 在编辑“字符串”内容时不会触发补全，例如在 JSX 属性值中。更新 editor.quickSuggestions 设置

```tsx
"editor.quickSuggestions": {
  "strings": true
}
```

1.寻找Vscode 设置选项选,搜索editor.quickSuggestions,在strings选项选择为on

![image-20230414181247216](/Users/lx/Library/Application Support/typora-user-images/image-20230414181247216.png)
