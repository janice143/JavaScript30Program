---
title: 【原生javascript项目】Speech Synthesis 23
date: 2022-02-25 20:59:39
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第23天的“语音合成”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/23%20speechSynthesis/index.html

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_speechSynthesis.png?raw=true)

## 项目描述

利用`SpeechSynthesisUtterance`接口等实现的语音合成项目，其中设有`rate`和`pitch`滑块可改变朗读速度和音高，`stop`和`speech`按钮用来控制朗读的开始和暂停。朗读的文本内容可以在文本框中自行输入。

#### 项目重点

- `SpeechSynthesisUtterance`接口
  - `speechSynthesisUtterance.lang`
  - `SpeechSynthesisUtterance.pitch`
  - `SpeechSynthesisUtterance.rate`
  - `SpeechSynthesisUtterance.text`
  - ``SpeechSynthesisUtterance.name`
- `SpeechSynthesis`接口
  - `voiceschanged`事件
  - `SpeechSynthesis.getVoices()`
  - `speechSynthesis.cancel()`
  - `SpeechSynthesis.speak()`

## 项目过程

#### HTML部分

- `h1`标签

- `select`多选菜单

  ```html
  <select name="voice" id="voices">
      <option value="">Select A Voice</option>
  </select>
  ```

- 两个范围`input`控件，用来调控`rate`和`speed`

  ```html
  <label for="rate">Rate:</label>
  <input name="rate" type="range" min = 0 max = "3" value="1" step="0.1">
  <label for="pitch">Rate:</label>
  <input name="pitch" type="range" min="0" max="2" step="0.1">
  ```

- 输入文本框，朗读内容

  ```html
  <textarea name="text">Hey, my name is Iaine, nice to meet you</textarea>
  ```

- 两个按钮，用来暂停朗读和开始朗读

  ```html
  <button id="stop">Stop</button>
  <button id="speak">Speak</button>
  ```

#### JS部分

JS的大致思路是：

1. 使用相应WebAPI接口获得浏览器支持的语言种类列表，填充至下拉菜单中；

2. 在文本域中输入对应语言的文字，点击`speak`按钮后浏览器会阅读输入的文字；

3. 在浏览器阅读时，点击`stop`按钮，浏览器会停止阅读；

4. 拖动`rate`和`pitch`滑块可改变阅读速度和音高。

   

- 取得`speechSynthesis`对象，获取浏览器支持朗读语言，将所有选项动态添加至下拉列表

  ```javascript
  const speechSynthesis = window.speechSynthesis;
  let voices=[];
  function populateVoices(){
      voices = this.getVoices();
      voicesDropdown.innerHTML = voices
          .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
          .join('');
      console.log(voices)
  }
  
   speechSynthesis.addEventListener('voiceschanged', populateVoices);
  ```

- 设置下拉列表当前显示的语言，选择好语言后触发朗读

  ```javascript
  const voicesDropdown = document.querySelector('[name = "voice"]');
  function setVoice(){
      msg.voice = voices.find(voice => voice.name === this.value);
      toggle();
  }
  //   发出语音
  function toggle(startOver = true) {
      speechSynthesis.cancel();
      if (startOver) {
          speechSynthesis.speak(msg);
      }
  }
  voicesDropdown.addEventListener('change', setVoice);
  ```

- 点击`speech`按钮朗读，`stop`按钮停止

  ```javascript
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
  ```

- 构建`SpeechSynthesisUtterance`实例，添加`pitch`,`text`, `speed`,`name`属性

  ```javascript
  const msg = new SpeechSynthesisUtterance();
  msg.text = document.querySelector('[name="text"]').value;
  const options = document.querySelectorAll('[type="range"],[type = "text"]');
  function setOption(){
      msg[this.name] = this.value;
      toggle();
  }
  options.forEach(option => option.addEventListener('change', setOption));
  function updateText(){
      msg.text = document.querySelector('[name="text"]').value;
  }
  document.querySelector('[name="text"]').addEventListener('change', updateText);
  ```

## 项目补充

#### [SpeechSynthesisUtterance](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesisUtterance)接口

属于 [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) 的一个接口，可以发出speech请求。

##### 构造器

```javascript
SpeechSynthesisUtterance.SpeechSynthesisUtterance()
```

返回一个新的 `SpeechSynthesisUtterance` 实例对象。

##### 属性

- `SpeechSynthesisUtterance.lang` (en-US)

  获取或设置朗读的语言

- `SpeechSynthesisUtterance.pitch` (en-US)

  获取或设置朗读的音调

- `SpeechSynthesisUtterance.rate` (en-US)

  获取或设置朗读的速率

- `SpeechSynthesisUtterance.text` (en-US)

  获取或设置朗读的文本内容

- `SpeechSynthesisUtterance.voice`

  获取或设置朗读的voice

- `SpeechSynthesisUtterance.volume` (en-US)

  获取或设置朗读的音量

#### [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) 接口

属于 [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) 的一个**控制**speech服务的接口，可以返回设备合成声音的信息，开始或者暂停speech等。

##### 只读属性

[`SpeechSynthesis.paused`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/paused) ：SpeechSynthesis对象是否暂停状态

[`SpeechSynthesis.pending`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pending) ： utterance queue 是都还有没有余留没有读的 utterance。

[`SpeechSynthesis.speaking`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speaking)：一个utterance是否在被读的阶段

##### 方法

- [`SpeechSynthesis.cancel()`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel)

  移除utterance queue队列中所有的utterances

- [`SpeechSynthesis.getVoices()`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)

  返回现有设备所有可用的voices的 [`SpeechSynthesisVoice`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) 对象

- [`SpeechSynthesis.pause()`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)

  把 `SpeechSynthesis` 对象放在暂停状态

- [`SpeechSynthesis.resume()`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/resume)

  把 `SpeechSynthesis` 对象放在重新打开状态

- [`SpeechSynthesis.speak()`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)

  在utterance queue队列中增加一个[`utterance`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) 

##### 事件

[`voiceschanged`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)

在`SpeechSynthesis.getVoices()`方法返回的[`SpeechSynthesisVoice`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) 对象变化的时候触发



<u>**注意**：`SpeechSynthesisUtterance`接口和`SpeechSynthesis`接口的关系</u>

1. 二者都属于Web Speech API 接口
2. 前者是设置朗读的配置参数，包括语言，速度，语调，内容等
3. 后者是控制朗读的行为，包括获取浏览器支持的朗读语言，文本朗读，暂停，停止等

#### CSS知识补充

- ##### :nth-of-type()

  伪类选择器，匹配相同类型（也就是相同标签）的元素

  和`:nth-child`区别在于后者不是同类。

- `calc()`方法 允许计算

> JS30的第23个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

