![image](img/cover.png)

<div align="center">
  <a href="./README_ZH.md">👉 简体中文</a> |
  <a href="./README.md">👉 English</a>
</div>

## Add Your Plugin  

You can add new plugins in the [Plugin List File](/plugins.json) with the following format:  

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

## Add Your SKILLS

You can add new SKILLS in the [plugin list file](/skills.json) with the following format:

```json
  {
    "name": "Word Document Processor",
    "description": "Create, edit, and analyze Word documents",
    "description_zh": "创建、编辑和分析 Word 文档",
    "author": "anthropics",
    "category": "Office",
    "repository": "https://github.com/anthropics/skills/tree/main/skills/docx"
  }
```

## Add Your MCP

You can add new MCP in the [plugin list file](/mcp.json) with the following format:

```json
  {
    "name": "1MCP - One MCP Server for All",
    "type": "streamablehttp",
    "description": "Unified MCP server that aggregates multiple MCP servers into a single HTTP endpoint",
    "description_zh": "统一的 MCP 服务器，将多个 MCP 服务聚合为单一 HTTP 入口",
    "category": "Cloud",
    "repository": "https://github.com/1mcp-app/agent",
    "mcpConfig": {
      "url": "http://127.0.0.1:3050/mcp"
    }
  }
```

## Using Plugins  

In the [super-agent-party](https://github.com/heshengtao/super-agent-party) project, you can use plugins in the following way:  

1. Click on 【Developer】 in the sidebar.  
2. Click on 【Extension】 in the secondary navigation bar.  
3. Click on 【Add New Extension】.  
4. Copy the plugin's GitHub URL (e.g., https://github.com/heshengtao/sap-example) into the pop-up input box and click 【Add】.  
5. If the network is unstable and the plugin fails to install, you can directly download the plugin's ZIP package from GitHub and upload it in the pop-up input box.  
6. Wait for the plugin to load, and you will see the newly added plugin in the sidebar.

## Existing Plugins

| Name                  | Author            | Description                                                        | Repository URL                                   |
|-----------------------|-------------------|--------------------------------------------------------------------|--------------------------------------------------|
| Super Agent Party Example | heshengtao        | Example plugin for Super Agent Party, demonstrating plugin architecture and capabilities. | https://github.com/heshengtao/sap-example        |
| Super Agent Party Example With NodeJS | heshengtao        | This is a chat frontend example with nodeJS environment | https://github.com/heshengtao/sap-example-with-node        |
| Web Preview           | heshengtao        | A plugin enabling web previewing functionality for Super Agent Party. | https://github.com/heshengtao/sap-web-preview    |
| Story Adventure       | heshengtao | An interactive story adventure plugin that generates story content and options using AI. | https://github.com/heshengtao/sap-story-adventure |
| Live 2D      | heshengtao  | This is a Live 2D extension                   | https://github.com/heshengtao/sap-live2d  |
| AI Editor      | heshengtao  | This is an AI Editor       | https://github.com/heshengtao/sap-aieditor  |
| AI galgame      | heshengtao  | This is an AI galgame extension     | https://github.com/heshengtao/sap-aigalgame  |
| AI tarot reader      | heshengtao  | This is an AI tarot reader extension      | https://github.com/heshengtao/sap-tarot  |
| AI sheet      | heshengtao  | This is an AI Sheet extension                | https://github.com/heshengtao/sap-ai-sheet  |
| AI drawio      | heshengtao  | This is an AI drawio extension                 | https://github.com/heshengtao/sap-ai-drawio  |
| AI mermaid      | heshengtao  | This is an AI mermaid editor extension                  | https://github.com/heshengtao/sap-ai-mermaid  |
| AI RSS reader      | heshengtao  | This is an AI RSS reader extension for the Super Agent Party      | https://github.com/heshengtao/sap-rss  |
| Remote      | heshengtao  | One-click expose Super Agent Party to the public internet             | https://github.com/heshengtao/sap-remote  |
| Code Server      | heshengtao  | IDE extension for Super Agent Party          | https://github.com/heshengtao/sap-code-server  |
| CLI      | heshengtao  | Agent Party CLI tool (sap)          | https://github.com/heshengtao/sap-cli  |
| LX-music      | heshengtao  | Connect the super agent party extension to the LX Music API,Let AI companion control music playback!           | https://github.com/heshengtao/sap-lx-music  |
| AI PPT      | heshengtao  | AI PPT extension for Super Agent Party           | https://github.com/heshengtao/sap-ai-ppt  |