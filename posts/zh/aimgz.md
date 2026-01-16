---
title: "一本读不完的AI杂志！让AI伴侣带你感受世界的变化！"
date: "2026-01-19"
description: "通过RSS订阅+AI伴侣，高效获取消息！"
tags: ["AI杂志", "AI播客", "RSS"]
---

![img](/img/aimgz/0.jpeg)

# 引言

面对着信息爆炸的时代，传统的阅读方式往往耗时耗力。因此，我给AI伴侣软件——[Super Agent party](https://github.com/heshengtao/super-agent-party)，增加了一个新的扩展：[sap-rss](https://github.com/heshengtao/sap-rss)，它可以帮助我们通过RSS订阅获取消息，然后自动整理成一本每日都可以会更新的AI杂志，最后让你的AI伴侣念给你听。我们一起来看一下是怎么实现的吧！

# 第一步：下载super agent party！

首先，你需要下载一个免费的super agent party！这是一个开源的AI伴侣软件。你可以从[GitHub](https://github.com/heshengtao/super-agent-party)看到他的源码。

如果你是中国用户，你可以在[魔搭社区](https://modelscope.cn/models/ailm32442/super-agent-party-portable/files)下载。选择对应版本号的文件夹，然后选择符合你的操作系统的版本，点击下载即可！

![img](/img/0yuan/1.jpeg)

如果你是海外用户，你可以在[GitHub](https://github.com/heshengtao/super-agent-party/releases)下载。选择适合你的操作系统的版本，点击下载即可！

![img](/img/0yuan/2.jpeg)

如果你是一个爱折腾的极客，你也可以选择docker版本，在[GitHub](https://github.com/heshengtao/super-agent-party#docker-deployment-this-version-of-the-table-pet-can-only-be-viewed-through-the-browser)查看使用方法。

# 第二步：安装RSS扩展

打开super agent party，你可以在【开发者】-> 【扩展】子页面中看到已经安装的扩展，你可以点击【安装新扩展】按钮，然后选择【sap-rss】进行安装。

![img](/img/aimgz/1.jpeg)

扩展有三种方式可以打开，分别是：

1. 侧边栏方式打开：点击侧边栏界面中的的【sap-rss】就可以打开扩展。

![img](/img/aimgz/2.jpeg)

![img](/img/aimgz/3.jpeg)

打开之后，你就可以看到RSS扩展的界面了。你可以点击+号来添加新的RSS订阅。

![img](/img/aimgz/4.jpeg)

2. 独立窗口方式打开：点击侧边栏界面中的【sap-rss】右上角的独立窗口小按钮。

![img](/img/aimgz/5.jpeg)

打开之后，RSS扩展的界面会以独立窗口的形式打开。

![img](/img/aimgz/6.jpeg)

3. 浏览器窗口方式打开：点击侧边栏界面中的【sap-rss】右上角的浏览器窗口小按钮。

![img](/img/aimgz/7.jpeg)

打开之后，RSS扩展的界面会以浏览器窗口的形式打开。

![img](/img/aimgz/8.jpeg)

# 第三步：添加RSS订阅

在RSS扩展的界面中，你可以点击+号来添加新的RSS订阅。你可以输入RSS的URL，然后点击【添加】按钮。

![img](/img/aimgz/9.jpeg)

你可以点击+号左边的网络按钮添加我们已经整理好的一些RSS订阅。

![img](/img/aimgz/10.jpeg)

# 第四步：生成AI翻译、AI总结、AI播客、AI杂志

点击界面上的以下按钮，可以实现对RSS订阅的翻译、总结、播客、杂志的生成。Super Agent party不会通过提供AI功能而要求你付费使用，所有的AI算力可以通过你自己配置的AI模型来实现。因此你需要提前配置好对应的LLM和TTS模型。关于如何使用免费的算力，在上一期博客中已经介绍过了，你可以点击[这里](https://www.agentparty.top/article.html?lang=zh&slug=0yuan)查看。

![img](/img/aimgz/11.jpeg)

![img](/img/aimgz/12.jpeg)

你可以点击AI杂志上的目录跳转到你想要看的章节。

![img](/img/aimgz/13.jpeg)

# 第五步：让AI伴侣念给你听

点击VRM桌宠按钮，然后点击AI杂志上的【播放】按钮，就可以让AI伴侣念给你听了。

![img](/img/aimgz/14.jpeg)

![img](/img/aimgz/0.jpeg)

# 更多RSS订阅去哪里找？

RSS 协议虽然历史悠久，但它依然是当今互联网上信息获取最自由、最高效的方式。虽然现在很多网站不再把 RSS 图标挂在显眼位置，但它们其实一直都在。为了让你的 **Super Agent Party** 生成的 AI 杂志内容丰富多彩，这里为你整理了一套从入门到精通的“订阅源挖掘指南”，涵盖全球主流平台。

## 1. 必备神器：浏览器探测插件 (RSSHub Radar)

这是最简单、最推荐给所有用户的方法。你不需要懂代码，只需要给浏览器装一个“雷达”。

*   **RSSHub Radar**: 这是一个开源的浏览器扩展（支持 Chrome/Edge/Firefox）。当你访问一个网站时，如果该网站自带 RSS，或者支持通过 RSSHub 生成 RSS，它的图标就会亮起并显示数字。
    *   **适用场景**：几乎所有网页。
    *   **获取方式**：在 GitHub 搜索 `RSSHub Radar` 或在 Chrome 应用商店直接下载。
    *   **全球通用**：不仅能探测国内的 Bilibili、微博，也能探测国外的 YouTube Channel、Reddit 板块等。

## 2. 万物皆可 RSS：拥抱开源项目 RSSHub

如果你发现某个喜欢的网站（例如 Twitter/X、Instagram、知乎、抖音等）官方完全不支持 RSS，怎么办？这时候就需要请出 RSS 界的“瑞士军刀”—— **RSSHub**。

*   **什么是 RSSHub**：它是一个开源社区驱动的项目，可以通过特定的规则将几乎任何网页内容转换成 RSS 订阅源。
*   **如何使用**：
    *   **官方/公共实例**：RSSHub 官方提供了一个公共域名，你只需要按照文档拼接 URL 即可（例如 `https://rsshub.app/twitter/user/elonmusk`）。
    *   **自建服务（推荐给极客）**：为了更稳定的体验和访问某些特定区域的内容，强烈建议像部署 Super Agent Party 一样，使用 Docker 在本地或服务器上自部署一个 RSSHub。
    *   **Docker 部署**：只需一行命令 `docker pull diygod/rsshub`，配合我们的 `sap-rss` 扩展，体验简直起飞。

## 3. 全球主流平台的原生/技巧性获取

很多国际主流平台其实自带 RSS 接口，只是藏得比较深。掌握这些技巧，你可以轻松订阅全球资讯：

*   **YouTube (视频/播客)**：
    *   不需要第三方工具。打开任意频道页面，查看源代码搜索 `channel_id`，然后拼接：`https://www.youtube.com/feeds/videos.xml?channel_id=你的ID`。
    *   配合 AI 伴侣的总结功能，你甚至不用看视频就能知道博主讲了什么。
*   **Reddit (社区讨论)**：
    *   非常良心，只需在 URL 后加 `.rss`。例如：`https://www.reddit.com/r/technology/.rss`。
*   **Medium (技术/写作)**：
    *   在个人主页 URL 后加 `/feed`。例如：`medium.com/feed/@username`。
*   **Substack (Newsletter)**：
    *   在这个 Newsletter 盛行的时代，几乎所有的 Substack 页面只需在域名后加 `/feed` 即可获得全文 RSS。

## 4. 聚合平台与搜索引擎 (Aggregators)

如果你不知道看什么，可以去这些专门收集 RSS 的“黄页”网站逛逛，它们通常按话题分类，方便你批量导入：

*   **Feedly / Inoreader**: 这两个是全球最大的 RSS 阅读器服务商。虽然它们主要是阅读器，但它们的“搜索框”是非常强大的 RSS 搜索引擎。输入关键词（如 "AI News" 或 "SpaceX"），它们会列出全网最热门的相关 RSS 源。
*   **Follow.is**: 新一代的订阅浏览器，界面非常现代化。它的发现页（Discover）有很多用户创建的高质量订阅列表（Lists），涵盖了科技、设计、编程等前沿领域。
*   **Feedspot**: 一个包含全球数十万个 RSS Feed 的数据库，按行业和国家分类，非常适合寻找特定领域的专业资讯。

## 5. GitHub 上的 Awesome 列表

对于开发者和极客用户，GitHub 本身就是一个巨大的资源库。你可以搜索以下关键词找到由社区精心维护的源列表（OPML文件）：

*   `ALL-about-RSS`
*   `awesome-rss-feeds`
*   `chinese-independent-blogs` (中文独立博客列表)
*   `engineering-blogs` (全球各大科技公司的技术博客)

**小贴士**：获取到 RSS 链接后，别忘了先在浏览器里打开测试一下，只要看到满屏的代码（XML 格式）或者下载提示，就说明这是一个有效的链接，直接复制进 **Super Agent Party** 的 `sap-rss` 扩展即可！

# 结语

通过RSS订阅+AI伴侣，我们可以高效获取消息，然后自动整理成一本每日都可以会更新的AI杂志，最后让你的AI伴侣念给你听。这样，我们就可以在忙碌的生活中，随时随地的获取到最新的消息，并且让AI伴侣来帮助我们整理和阅读这些消息。如果你有任何问题，欢迎加入：

- QQ群：`931057213`
- Discord:[Discord link](https://discord.gg/f2dsAKKr2V)
 
> © 2026 heshengtao，采用 CC BY 4.0 国际协议授权  
> 可自由转载、演绎、商用，须署名并给出原链接。