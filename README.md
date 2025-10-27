![image](img/agent_party.png)

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
    "repository": "https://github.com/heshengtao/sap-example"  
  }  
```  

## Using Plugins  

In the [super-agent-party](https://github.com/heshengtao/super-agent-party) project, you can use plugins in the following way:  

1. Click on 【API Access】 in the sidebar.  
2. Click on 【Extension】 in the secondary navigation bar.  
3. Click on 【Add New Extension】.  
4. Copy the plugin's GitHub URL (e.g., https://github.com/heshengtao/sap-example) into the pop-up input box and click 【Add】.  
5. If the network is unstable and the plugin fails to install, you can directly download the plugin's ZIP package from GitHub and upload it in the pop-up input box.  
6. Wait for the plugin to load, and you will see the newly added plugin in the sidebar.

## Existing Plugins

| Name                  | Author            | Description                                                        | Repository URL                                   |
|-----------------------|-------------------|--------------------------------------------------------------------|--------------------------------------------------|
| Super Agent Party Example | heshengtao        | Example plugin for Super Agent Party, demonstrating plugin architecture and capabilities. | https://github.com/heshengtao/sap-example        |
| Web Preview           | heshengtao        | A plugin enabling web previewing functionality for Super Agent Party. | https://github.com/heshengtao/sap-web-preview    |
| Story Adventure       | heshengtao | An interactive story adventure plugin that generates story content and options using AI. | https://github.com/heshengtao/sap-story-adventure |
| Live 2D      | heshengtao  | This is a Live 2D extension                   | https://github.com/heshengtao/sap-live2d  |