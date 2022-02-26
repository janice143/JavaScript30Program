---
title: 【原生javascript项目】Speech Detetion 20
date: 2022-02-22 20:56:50
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第20天的“语音检测”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/20%20speechDetection/index.html

## 项目描述

本项目是一个语音识别系统，网页首先会向用户请求麦克风权限，允许后可识别出用户的speech（语言为每个英语`en-US'`)，并显示在网页中。

本项目用到的语音识别系统是`Web Speech API`，只能在 Chrome浏览器上使用，而且功能也一直在完善中，因此，本项目只是提供一种语音识别系统的解决思路，以便参考。

#### 项目重点

- `Web Speech API`
  - [`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) 接口
    - `SpeechRecognition.interimResults`
    - `SpeechRecognition.lang`
    - `SpeechRecognition.start()`
    - `new SpeechRecognition()`
- `result`事件
  - `e.results`
  - `result.transcript`
  - `e.results[0].isFinal`

- `p.textContent `
- `end`事件

## 项目过程

#### HTML部分

只有一个`div`元素，可编辑`contenteditable`

```html
<div class="words" contenteditable></div>
```

#### JS部分

JS的大致思路是：

1. 添加Chrome support
2. 定义语音识别实例
3. 开启语音识别功能
4. 监听`result`事件，实时获取捕获到的speech，并通过创建元素的方法显示到网页中
5. 监听`end`事件，当语音捕获结束后，重新开启语音识别功能

- Chrome support

  [`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) 接口只能在 Chrome浏览器上使用，，因此需要适配Chrome浏览器的对象以及未来其他浏览器也能使用的一些修正

  ```javascript
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  ```

- 定义语音识别实例

  ```javascript
  const recognition = new SpeechRecognition();
  ```

- 创建一个`p`元素，后面可以讲识别到的语音放进去

  ```javascript
  const p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);
  ```

- 打开语音识别功能，监听`result`事件，实时获取捕获到的speech，并显示到网页中

  ```javascript
  recognition.addEventListener('result',e => {
      const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      p.textContent = transcript;
      // console.log(e.results[0].transcript)
      if (e.results[0].isFinal) {
          p = document.createElement('p');
          words.appendChild(p);
      }
  });
  
  recognition.start(); // 打开语音功能
  ```

- 监听`end`事件，当语音捕获结束后，重新开启语音识别功能

  ```javascript
  recognition.addEventListener('end', recognition.start);
  ```

## 项目补充

#### [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) 语音识别和语音输出

主要的语音识别接口是[`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) 接口，只能在 Chrome浏览器上使用

[`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) 接口的一些属性：

- [`SpeechRecognition.interimResults`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults)：设置语音识别系统是否返回中间结果，还是最终结果

- [`SpeechRecognition.lang`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang): 设置语音识别系统的语言

#### innerText、textContent和innerHTML三者的区别

`innerText`、`textContent`和`innerHTML`可以设置标签中的文本内容。

**不同点**

`innerHTML`可以将内容中的标签为标签，而其他两个则不行，只是纯文本

`innerText`，`textContent`获取的是该标签和该标签下子标签中的文本内容

```html
<div id="mylinks">
  This is my <b>link collection</b>:
  <ul>
    <li><a href="www.borland.com">Bye bye <b>Borland</b> </a></li>
    <li><a href="www.microfocus.com">Welcome to <b>Micro Focus</b></a></li>
  </ul>
</div>
<script type="text/javascript">
    const dv = document.getElementById("mylinks");
    console.log(dv.textContent);        
    // This is my link collection:

    // Bye bye Borland 
    // Welcome to Micro Focus
    console.log(dv.innerText);
    // This is my link collection:
    // Bye bye Borland
    // Welcome to Micro Focus
    console.log(dv.innerHTML);
    // This is my <b>link collection</b>:
    // <ul>
    // <li><a href="www.borland.com">Bye bye <b>Borland</b> </a></li>
    // <li><a href="www.microfocus.com">Welcome to <b>Micro Focus</b></a></li>
    // </ul>       
</script>
```

#### let var const区别

var 声明会变量提升

let 块级作用域，声明不会变量提升

const 块级作用域声明的变量为常量，值不可修改

**更多内容见参考博客[2-4]**

#### CSS position

| 值       |                                                              |
| -------- | ------------------------------------------------------------ |
| relative | 相对自己原来（正常文档流）的位置                             |
| absolute | 脱离文档流，相对于最近的已定位父元素                         |
| fixed    | 脱离文档流，相对于浏览器窗口是固定位置                       |
| sticky   | 基于用户的滚动位置来定位。行为就像 relative，而当页面滚动超出目标区域时，它的表现就像 fixed，固定在目标位置。 |
| static   | HTML 元素的默认值，即没有定位，遵循正常的文档流对象。        |

## 参考博客

1. [innerText、textContent和innerHTML三者的区别](https://juejin.cn/post/6844903684317380616)
2. [一看就懂的var、let、const三者区别](https://juejin.cn/post/6925641096152399880)
3. [var、let和const的区别详解](https://www.cnblogs.com/JobsOfferings/p/varLetConst.html)
4. [块作用域](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/compilation/blocks-as-scopes)

> JS30的第20个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

