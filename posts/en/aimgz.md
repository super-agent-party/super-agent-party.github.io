---
title: "An AI Magazine You Can Never Finish Reading! Let Your AI Companion Take You Through the Changes of the World!"
date: "2026-01-19"
description: "Efficiently get updates via RSS subscription + AI companion!"
tags: ["AI Magazine", "AI Podcast", "RSS"]
---

![img](/img/aimgz/0.jpeg)

# Introduction

In the era of information explosion, traditional reading methods often consume too much time and effort. Therefore, I added a new extension — [sap-rss](https://github.com/heshengtao/sap-rss) — to the AI companion software — [Super Agent Party](https://github.com/heshengtao/super-agent-party). This extension helps us obtain updates through RSS subscriptions, automatically organizes them into a daily-updated AI magazine, and finally lets your AI companion read it aloud to you. Let’s take a look at how this is achieved!

# Step One: Download Super Agent Party!

First, you need to download the free Super Agent Party! This is an open-source AI companion software. You can view its source code on [GitHub](https://github.com/heshengtao/super-agent-party).

If you are a Chinese user, you can download it from the [ModelScope Community](https://modelscope.cn/models/ailm32442/super-agent-party-portable/files). Select the folder corresponding to the version number, then choose the version compatible with your operating system and click to download!

![img](/img/0yuan/1.jpeg)

If you are an overseas user, you can download it from [GitHub](https://github.com/heshengtao/super-agent-party/releases). Select the version suitable for your operating system and click to download!

![img](/img/0yuan/2.jpeg)

If you are a tech-savvy geek, you can also choose the Docker version and check the usage instructions on [GitHub](https://github.com/heshengtao/super-agent-party#docker-deployment-this-version-of-the-table-pet-can-only-be-viewed-through-the-browser).

# Step Two: Install the RSS Extension

Open Super Agent Party, and you can see the installed extensions under the 【Developer】-> 【Extensions】subpage. Click the 【Install New Extension】button and select 【sap-rss】to install.

![img](/img/aimgz/1.jpeg)

There are three ways to open the extension:

1. Open via sidebar: Click 【sap-rss】in the sidebar interface to open the extension.

![img](/img/aimgz/2.jpeg)

![img](/img/aimgz/3.jpeg)

After opening, you will see the RSS extension interface. You can click the + button to add new RSS subscriptions.

![img](/img/aimgz/4.jpeg)

2. Open via independent window: Click the small independent window button at the top right of 【sap-rss】in the sidebar interface.

![img](/img/aimgz/5.jpeg)

After opening, the RSS extension interface will appear as an independent window.

![img](/img/aimgz/6.jpeg)

3. Open via browser window: Click the small browser window button at the top right of 【sap-rss】in the sidebar interface.

![img](/img/aimgz/7.jpeg)

After opening, the RSS extension interface will appear as a browser window.

![img](/img/aimgz/8.jpeg)

# Step Three: Add RSS Subscriptions

In the RSS extension interface, you can click the + button to add new RSS subscriptions. You can enter the RSS URL and click the 【Add】button.

![img](/img/aimgz/9.jpeg)

You can click the network button to the left of the + button to add some pre-organized RSS subscriptions we have prepared.

![img](/img/aimgz/10.jpeg)

# Step Four: Generate AI Translation, AI Summary, AI Podcast, AI Magazine

Click the buttons on the interface to generate AI translations, summaries, podcasts, and magazines based on your RSS subscriptions. Super Agent Party does not require you to pay for AI features; all AI computing power can be achieved through AI models you configure yourself. Therefore, you need to configure the corresponding LLM and TTS models in advance. How to use free computing power has already been introduced in the previous blog post — you can click [here](https://www.agentparty.top/article.html?lang=zh&slug=0yuan) to view.

![img](/img/aimgz/11.jpeg)

![img](/img/aimgz/12.jpeg)

You can click the table of contents on the AI magazine to jump to the chapter you want to read.

![img](/img/aimgz/13.jpeg)

# Step Five: Let Your AI Companion Read It to You

Click the VRM pet button, then click the 【Play】button on the AI magazine to let your AI companion read it aloud to you.

![img](/img/aimgz/14.jpeg)

![img](/img/aimgz/0.jpeg)

# Where to Find More RSS Subscriptions?

Although the RSS protocol is long-standing, it remains the most free and efficient way to access information on the internet today. Although many websites no longer prominently display the RSS icon, they are still available. To make your **Super Agent Party**-generated AI magazine content rich and diverse, here is a “Subscription Source Mining Guide” ranging from beginner to advanced, covering major global platforms.

## 1. Essential Tool: Browser Detection Plugin (RSSHub Radar)

This is the simplest and most recommended method for all users. You don’t need to know coding — just install a “radar” in your browser.

*   **RSSHub Radar**: This is an open-source browser extension (supports Chrome/Edge/Firefox). When you visit a website, if the site has RSS support or can generate RSS via RSSHub, its icon will light up and display a number.
    *   **Applicable Scenarios**: Almost all web pages.
    *   **Acquisition Method**: Search for `RSSHub Radar` on GitHub or directly download it from the Chrome Web Store.
    *   **Global Applicability**: Can detect not only domestic platforms like Bilibili and Weibo, but also international platforms like YouTube channels and Reddit subreddits.

## 2. Everything Can Be RSS: Embrace the Open-Source Project RSSHub

If you find that a website you like (e.g., Twitter/X, Instagram, Zhihu, Douyin, etc.) does not officially support RSS, what should you do? At this point, you need to bring out the “Swiss Army Knife” of the RSS world — **RSSHub**.

*   **What is RSSHub**: It is an open-source, community-driven project that can convert almost any web page content into an RSS subscription source through specific rules.
*   **How to Use**:
    *   **Official/Public Instances**: RSSHub provides a public domain name. You only need to construct the URL according to the documentation (e.g., `https://rsshub.app/twitter/user/elonmusk`).
    *   **Self-Hosted Service (Recommended for Geeks)**: To ensure a more stable experience and access specific regional content, it is strongly recommended to deploy an RSSHub locally or on a server using Docker, just like deploying Super Agent Party.
    *   **Docker Deployment**: Just one command `docker pull diygod/rsshub`, combined with our `sap-rss` extension, the experience is simply amazing.

## 3. Native or Skill-Based Access to Major Global Platforms

Many international mainstream platforms actually have native RSS interfaces, though they are hidden deep within. Mastering these techniques allows you to easily subscribe to global news:

*   **YouTube (Videos/Podcasts)**:
    *   No third-party tools needed. Open any channel page, view the source code to search for `channel_id`, then construct: `https://www.youtube.com/feeds/videos.xml?channel_id=yourID`.
    *   Combined with the AI companion’s summarization feature, you don’t even need to watch the video to know what the creator is talking about.
*   **Reddit (Community Discussions)**:
    *   Very user-friendly — simply add `.rss` to the URL. For example: `https://www.reddit.com/r/technology/.rss`.
*   **Medium (Technology/Writing)**:
    *   Add `/feed` to the end of the personal homepage URL. For example: `medium.com/feed/@username`.
*   **Substack (Newsletters)**:
    *   In this era of newsletter popularity, almost all Substack pages only require adding `/feed` after the domain to obtain the full RSS feed.

## 4. Aggregation Platforms and Search Engines (Aggregators)

If you don’t know what to read, you can browse these specialized RSS “yellow pages” websites, which usually categorize by topic, making it easy for you to import in bulk:

*   **Feedly / Inoreader**: These are the two largest RSS reader service providers globally. Although they are primarily readers, their “search bar” is a powerful RSS search engine. Enter keywords (e.g., "AI News" or "SpaceX"), and they will list the most popular relevant RSS sources across the web.
*   **Follow.is**: A next-generation subscription browser with a very modern interface. Its Discover page features many high-quality user-created subscription lists (Lists) covering cutting-edge fields such as technology, design, and programming.
*   **Feedspot**: A database containing tens of thousands of RSS Feeds worldwide, categorized by industry and country — ideal for finding professional information in specific fields.

## 5. Awesome Lists on GitHub

For developers and tech-savvy users, GitHub itself is a massive resource repository. You can search for the following keywords to find community-maintained source lists (OPML files):

*   `ALL-about-RSS`
*   `awesome-rss-feeds`
*   `chinese-independent-blogs` (Chinese independent blog list)
*   `engineering-blogs` (Technical blogs from major global tech companies)

**Tip**: After obtaining the RSS link, don’t forget to test it in your browser first. If you see a screen full of code (XML format) or a download prompt, it means the link is valid — simply copy it into the `sap-rss` extension in **Super Agent Party**!

# Conclusion

Through RSS subscriptions + AI companion, we can efficiently obtain updates, automatically organize them into a daily-updated AI magazine, and finally let your AI companion read it aloud to you. This way, we can access the latest news anytime and anywhere in our busy lives, while letting the AI companion help us organize and read these updates.If you have any questions, feel free to join:

- QQ Group: `931057213`
- Discord: [Discord link](https://discord.gg/f2dsAKKr2V)

> © 2026 heshengtao, licensed under CC BY 4.0 International  
> Free to share, adapt, and use commercially, with attribution and a link to the original.