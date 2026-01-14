---
title: "挑战0元创造AI伴侣，我能成功吗？"
date: "2026-01-16"
description: "手把手教你如何不花钱打造一个AI伴侣"
tags: ["AI伴侣"]
---

![img](/img/0yuan/0.jpeg)

# 引言
如果说，你想要一个AI伴侣，但是又不想花费一分钱，那么这篇文章就是为你准备的。在这里，我将向你展示如何不花钱打造一个AI伴侣，让你在虚拟世界中找到陪伴。

# 第一步：下载免费的super agent party！

首先，你需要下载一个免费的super agent party！这是一个开源的AI伴侣软件。你可以从[GitHub](https://github.com/heshengtao/super-agent-party)看到他的源码。

如果你是中国用户，你可以在[魔搭社区](https://modelscope.cn/models/ailm32442/super-agent-party-portable/files)下载。选择对应版本号的文件夹，然后选择符合你的操作系统的版本，点击下载即可！

![img](/img/0yuan/1.jpeg)

如果你是海外用户，你可以在[GitHub](https://github.com/heshengtao/super-agent-party/releases)下载。选择适合你的操作系统的版本，点击下载即可！

![img](/img/0yuan/2.jpeg)

如果你是一个爱折腾的极客，你也可以选择docker版本，在[GitHub](https://github.com/heshengtao/super-agent-party#docker-deployment-this-version-of-the-table-pet-can-only-be-viewed-through-the-browser)查看使用方法。

# 第二步：让你的AI伴侣能思考

你需要一个大语言模型，我们一般称为LLM。LLM是AI伴侣的“大脑”，它决定了AI伴侣的智能程度。市面上有非常多的免费的LLM算力，这里我推荐一个我常用的，ollama的云模型，至少在我写下这篇博客时，ollama的云模型还是免费的。

## 去ollama官网下载ollama

ollama官网：https://ollama.com/

你可以在网页的右上角看到一个“下载”按钮，点击它，选择适合你的操作系统的版本，点击下载即可！

![img](/img/0yuan/3.jpeg)

## 免费的ollama的云模型

1. 你需要在ollama官网注册一个账号，注册后在ollama应用中登录你的账号，你就可以使用ollama的云模型了。

2. 你可以在ollama官网的“模型”页面点击`cloud`标签，这些标签下的模型都是免费且不占用你的本地算力的。

![img](/img/0yuan/4.jpeg)

3. 你可以选择一个你喜欢的模型，点击它，然后复制CLI命令，比如`ollama run deepseek-v3.1:671b-cloud`，粘贴到你的终端，然后回车，你就可以使用ollama的云模型了。注意！一定要有`cloud`后缀的模型。

![img](/img/0yuan/5.jpeg)

## 在super agent party中使用ollama的云模型

1. 打开super agent party，点击`模型`页面，然后在`模型供应商`子页面，选择`添加供应商`

![img](/img/0yuan/6.jpeg)

2. 在模态框中,选择`ollama`，然后点击`确认添加`按钮

![img](/img/0yuan/7.jpeg)

3. 点击卡片上的放大镜按钮，就可以获取你的ollama内的所有模型列表，如果获取失败，可能是你忘记打开ollama应用了

![img](/img/0yuan/8.jpeg)

4. 在模型列表中，选择你刚刚复制的模型，比如`deepseek-v3.1:671b-cloud`

![img](/img/0yuan/9.jpeg)

5. 这时候你回到对话界面，就可以愉快地免费和你的AI聊天了！

![img](/img/0yuan/10.jpeg)

# 第三步：让你的AI伴侣能听见

你需要一个语音识别模型，我们一般称为ASR。ASR是AI伴侣的“耳朵”，它决定了AI伴侣能否听懂你说的话。

这里有两个免费的方法：

## 免费的本地小模型

super agent party内置了一个免费的语音识别模型，你只需要在`模型`页面，选择`语音识别模型`，然后选择`Sherpa ONNX`，就可以使用内置的语音识别模型了。这个模型不吃GPU，只占用CPU和内存，所以普通的笔记本电脑也可以跑，不需要花钱去买好设备。

1. 打开super agent party，点击`模型`页面，然后在`语音识别模型`子页面，选择`Sherpa ONNX`
2. 点击下方的Sherpa ONNX Sense Voice卡片里的下载按钮，国内用户选择魔搭社区下载，海外用户选择huggingface下载
3. 下载完成后，就可以开启语音识别，使用语音和你的AI聊天了

![img](/img/0yuan/11.jpeg)

## 免费的浏览器内置语音识别API

你可以使用浏览器中内置的免费语音识别API，Web Speech API。你需要开启一个浏览器作为你的AI伴侣的“耳朵”，然后使用Web Speech API来识别语音。这个方法不需要花钱，但是需要联网。

1. 打开super agent party，点击`模型`页面，然后在`语音识别模型`子页面，选择`Web Speech API`
2. 开启语音识别，super agent party会自动开启一个浏览器，现在你就可以在浏览器中使用Web Speech API来识别语音了

![img](/img/0yuan/12.jpeg)

# 第四步：让你的AI伴侣能说话

你需要一个语音合成模型，我们一般称为TTS。TTS是AI伴侣的“嘴巴”，它决定了AI伴侣能否用声音和你交流。

这里有两个免费的方法：

## 免费的系统TTS

windows系统和macOS系统都内置了语音合成模型，语音效果很一般，但是速度非常的快。用来快速测试非常合适。macOS请选择有【Siri/Premium】标识的语音，比如`【Siri/Premium】Meijia`，就是你经常听到的siri语音啦！

1. 打开super agent party，点击`模型`页面，然后在`语音合成模型`子页面，选择`系统TTS`
2. 选择你的系统TTS，比如`【Siri/Premium】Meijia`
3. 开启语音合成即可

![img](/img/0yuan/13.jpeg)

## 免费的EdgeTTS

EdgeTTS是微软提供的一个免费的TTS接口，语音效果比较好，但是需要联网。这里额外声明一下，对于小规模或个人课堂使用，微软持默许态度，但是如果你要商业化和盈利，微软是不允许的。微软官网可以找到[相关解释](https://learn.microsoft.com/zh-cn/answers/questions/5640180/edge-tts)。如果你需要商业使用，请使用Azure TTS。

![img](/img/0yuan/14.jpeg)

1. 打开super agent party，点击`模型`页面，然后在`语音合成模型`子页面，选择`EdgeTTS`
2. 选择对应语言的音色，比如：`xiaoxiao`
3. 开启语音合成即可

![img](/img/0yuan/15.jpeg)

# 第五步：让你的AI伴侣能被看见

为了让你的AI伴侣以3D形象出现在你的桌面上，你需要开启VRM桌宠机器人。

## 免费的VRM模型

如果你想要更多的免费3D形象，可以去[vroidhub](https://hub.vroid.com/en)下载，或者去[模之屋](https://www.aplaybox.com/search?value=VRM)下载。

1. 打开super agent party，点击`机器人`页面，然后在`VRM桌宠机器人`子页面点击启动即可！
2. 鼠标左键旋转，滚轮缩放，右键平移，右上角第一个按钮拖拽整体窗口
3. 如果你希望录制透明背景的数字人口播视频或者在直播时录制桌宠，请在录制软件的浏览器源中添加`http://127.0.0.1:3456/vrm.html`作为视频源

![img](/img/0yuan/16.jpeg)

如果你还想让你的AI伴侣以2D形象出现，那么你需要安装live2D扩展，我将在扩展篇中仔细介绍，欢迎继续关注和收藏本博客专栏。

# 结语

终于！我们没有花费一分钱就完成了一个AI伴侣！如果你有任何问题，欢迎加入：

- QQ群：`931057213`
- Discord:[Discord link](https://discord.gg/f2dsAKKr2V)
 
> © 2026 heshengtao，采用 CC BY 4.0 国际协议授权  
> 可自由转载、演绎、商用，须署名并给出原链接。