---
title: "Challenge: Create an AI Companion for $0, Can I Succeed?"
date: "2026-01-16"
description: "A step-by-step guide on how to build an AI companion without spending any money"
tags: ["AI Companion"]
---

![img](/img/0yuan/0.jpeg)

# Introduction
If you want an AI companion but don't want to spend a single cent, then this article is for you. Here, I will show you how to create an AI companion for free, allowing you to find companionship in the virtual world.

# Step 1: Download the free Super Agent Party!

First, you need to download the free Super Agent Party! This is an open-source AI companion software. You can view its source code on [GitHub](https://github.com/heshengtao/super-agent-party).

If you are a user in China, you can download it from the [ModelScope Community](https://modelscope.cn/models/ailm32442/super-agent-party-portable/files). Select the folder corresponding to the version number, then choose the version that matches your operating system, and click download!

![img](/img/0yuan/1.jpeg)

If you are an overseas user, you can download it from [GitHub](https://github.com/heshengtao/super-agent-party/releases). Select the version suitable for your operating system and click download!

![img](/img/0yuan/2.jpeg)

If you are a tinkering geek, you can also choose the Docker version. Check the usage instructions on [GitHub](https://github.com/heshengtao/super-agent-party#docker-deployment-this-version-of-the-table-pet-can-only-be-viewed-through-the-browser).

# Step 2: Enable Your AI Companion to Think

You need a large language model, commonly referred to as an LLM. The LLM serves as the "brain" of your AI companion, determining its level of intelligence. There are many free LLM computing resources available on the market. Here, I recommend one that I frequently use: Ollama's cloud models. At least at the time I wrote this blog post, Ollama's cloud models are still free.

## Download Ollama from the Official Website

Ollama official website: https://ollama.com/

In the top-right corner of the webpage, you'll see a "Download" button. Click it, select the version suitable for your operating system, and click download!

![img](/img/0yuan/3.jpeg)

## Free Ollama Cloud Models

1. You need to register an account on the Ollama website. After registering, log into your account within the Ollama application, and you'll be able to use Ollama's cloud models.

2. On the "Models" page of the Ollama website, click the `cloud` tab. The models under this tab are free and do not consume your local computing resources.

![img](/img/0yuan/4.jpeg)

3. You can choose a model you like, click on it, and copy the CLI command, for example, `ollama run deepseek-v3.1:671b-cloud`. Paste it into your terminal and press Enter to start using Ollama's cloud model. Important! Make sure the model has the `cloud` suffix.

![img](/img/0yuan/5.jpeg)

## Using Ollama Cloud Models in Super Agent Party

1. Open Super Agent Party, go to the `Models` page, and under the `Model Providers` subpage, select `Add Provider`.

![img](/img/0yuan/6.jpeg)

2. In the modal window, select `ollama`, then click the `Confirm Add` button.

![img](/img/0yuan/7.jpeg)

3. Click the magnifying glass button on the card to retrieve a list of all models within your Ollama. If the retrieval fails, you might have forgotten to open the Ollama application.

![img](/img/0yuan/8.jpeg)

4. From the model list, select the model you just copied, for example, `deepseek-v3.1:671b-cloud`.

![img](/img/0yuan/9.jpeg)

5. Now, return to the chat interface, and you can happily chat with your AI for free!

![img](/img/0yuan/10.jpeg)

# Step 3: Enable Your AI Companion to Hear

You need a speech recognition model, commonly referred to as ASR. ASR serves as the "ears" of your AI companion, determining whether it can understand what you say.

Here are two free methods:

## Free Local Small Model

Super Agent Party comes with a built-in free speech recognition model. Simply go to the `Models` page, select `Speech Recognition Model`, and then choose `Sherpa ONNX` to use the built-in speech recognition model. This model does not require GPU resources; it only uses CPU and memory, so it can run on an ordinary laptop without the need to invest in expensive hardware.

1. Open Super Agent Party, click on the `Models` page, then in the `Speech Recognition Model` subpage, select `Sherpa ONNX`.
2. Click the download button in the Sherpa ONNX Sense Voice card below. Users in China can choose to download from ModelScope, while overseas users can download from Hugging Face.
3. Once the download is complete, you can enable speech recognition and start chatting with your AI using voice.

![img](/img/0yuan/11.jpeg)

## Free Browser Built-in Speech Recognition API

You can use the free speech recognition API built into browsers, known as the Web Speech API. You need to open a browser to serve as the "ears" of your AI companion and use the Web Speech API for speech recognition. This method is free but requires an internet connection.

1. Open Super Agent Party, click on the `Models` page, then in the `Speech Recognition Model` subpage, select `Web Speech API`.
2. Enable speech recognition. Super Agent Party will automatically open a browser, and now you can use the Web Speech API in the browser for speech recognition.

![img](/img/0yuan/12.jpeg)

# Step 4: Enable Your AI Companion to Speak

You need a speech synthesis model, commonly referred to as TTS. TTS serves as the "mouth" of your AI companion, determining whether it can communicate with you using voice.

Here are two free methods:

## Free System TTS

Both Windows and macOS systems come with built-in speech synthesis models. The voice quality is average, but the speed is very fast, making it suitable for quick testing. For macOS, choose voices labeled with 【Siri/Premium】, such as `【Siri/Premium】Meijia`, which is the familiar Siri voice!

1. Open Super Agent Party, click on the `Models` page, then in the `Speech Synthesis Model` subpage, select `System TTS`.
2. Choose your system TTS, such as `【Siri/Premium】Meijia`.
3. Enable speech synthesis.

![img](/img/0yuan/13.jpeg)

## Free EdgeTTS

EdgeTTS is a free TTS interface provided by Microsoft, offering better voice quality but requiring an internet connection. It is important to note that Microsoft permits small-scale or personal classroom use, but commercial and profit-driven use is not allowed. You can find [relevant explanations](https://learn.microsoft.com/zh-cn/answers/questions/5640180/edge-tts) on Microsoft's official website. For commercial use, please use Azure TTS.

![img](/img/0yuan/14.jpeg)

1. Open Super Agent Party, click on the `Models` page, then in the `Speech Synthesis Model` subpage, select `EdgeTTS`.
2. Choose a voice for the corresponding language, such as `xiaoxiao`.
3. Enable speech synthesis.

![img](/img/0yuan/15.jpeg)

# Step 5: Enable Your AI Companion to Be Seen

To make your AI companion appear as a 3D character on your desktop, you need to enable the VRM Desktop Pet Robot.

## Free VRM Models

 If you want more free 3D models, you can download them from [vroidhub](https://hub.vroid.com/en) or [模之屋](https://www.aplaybox.com/search?value=VRM).

1. Open Super Agent Party, click on the `Robots` page, then in the `VRM Desktop Pet Robot` subpage, click to start!
2. Use the left mouse button to rotate, the scroll wheel to zoom, the right mouse button to pan, and the first button in the upper right corner to drag the entire window.
3. If you want to record a digital human video with a transparent background or capture the desktop pet during a live stream, add `http://127.0.0.1:3456/vrm.html` as a video source in the browser source of your recording software.

![img](/img/0yuan/16.jpeg)

If you also want your AI companion to appear as a 2D character, you will need to install the Live2D extension. I will cover this in detail in the extensions section. Stay tuned and bookmark this blog series.

# Conclusion

Finally! We've completed an AI companion without spending a single penny! If you have any questions, feel free to join:

- QQ Group: `931057213`
- Discord: [Discord link](https://discord.gg/f2dsAKKr2V)

> © 2026 heshengtao, licensed under CC BY 4.0 International  
> Free to share, adapt, and use commercially, with attribution and a link to the original.