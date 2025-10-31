![image](img/cover.png)

<div align="center">
  <a href="./README_ZH.md">👉 简体中文</a> |
  <a href="./README.md">👉 English</a>
</div>

## 添加你的插件

你可以在[插件列表文件](/plugins.json)添加新的插件，格式如下：

```json
  {
    "name": "Super Agent Party Example Plugin",
    "description": "This is the example plugin for Super Agent Party, demonstrating the plugin architecture and capabilities.",
    "author": "heshengtao",
    "version": "1.0.0",
    "category": "Example",
    "repository": "https://github.com/heshengtao/sap-example",
    "backupRepository": "https://gitee.com/heshengtao/sap-example",
  }
```

## 使用插件

在[super-agent-party](https://github.com/heshengtao/super-agent-party)项目中，你可以通过以下方式使用插件：

1. 点击侧边栏中的【开发者】
2. 点击二级导航栏中的【扩展】
3. 点击【添加新扩展】
4. 复制插件的github地址，例如：https://github.com/heshengtao/sap-example 到弹出的输入框中并点击【添加】
5. 如果网络不好，插件安装失败，可以直接从github上下载插件的zip包，并在弹出的输入框中上传zip包即可
6. 等待插件加载完成，即可在侧边栏中看到新添加的插件

## 已有插件

| 名称                  | 作者               | 描述                                                                 | 仓库地址                                             |
|-----------------------|--------------------|--------------------------------------------------------------------|----------------------------------------------------|
| Super Agent Party Example | heshengtao         | Super Agent Party 的示例插件，用于演示插件架构和能力。                | https://github.com/heshengtao/sap-example          |
| Web Preview           | heshengtao         | 为 Super Agent Party 提供网页预览功能的插件。                        | https://github.com/heshengtao/sap-web-preview      |
| Story Adventure       | heshengtao  | 一款利用 AI 生成故事内容和选项的交互式故事冒险插件。                   | https://github.com/heshengtao/sap-story-adventure  |
| Live 2D      | heshengtao  | 一款live2d前端插件。                   | https://github.com/heshengtao/sap-live2d  |
| AI Editor      | heshengtao  | 一款AI编辑器插件。                   | https://github.com/heshengtao/sap-aieditor  |
| AI galgame      | heshengtao  | 一款AI galgame 插件。                   | https://github.com/heshengtao/sap-aigalgame  |