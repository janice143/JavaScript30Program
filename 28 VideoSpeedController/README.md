---
title: 【原生javascript项目】Video Speed Controller 28
date: 2022-03-11 21:06:44
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第27天的“视频播放速度控制器”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/28%20VideoSpeedController/index.htm



**本项目的笔记内容选自 [大史不说话](https://github.com/dashnowords)**，他本人是JS30社区里的知名参与者，他的全部笔记在[这里](https://github.com/soyaine/JavaScript30)。

本项目的笔记在[这里](https://github.com/soyaine/JavaScript30/tree/master/28%20-%20Video%20Speed%20Controller)。





## 挑战任务

初始文档`index-start.html`中提供了一个视频播放区域（使用的是H5原生的控制器）以及一个表示播放速度的滑块区域，本次的编程任务需要实现的效果是当鼠标拖动滑块时，实时改变视频播放的速度。

## 实现效果

[![结果展示](https://github.com/soyaine/JavaScript30/raw/master/28%20-%20Video%20Speed%20Controller/effect.png)](https://github.com/soyaine/JavaScript30/blob/master/28 - Video Speed Controller/effect.png)

## 编程思路

本次的编程任务难度系数较低，在右侧速度条上监听鼠标点击事件，调整滑块的高度来表示不同的填充百分比，即不同的播放速度，将速度赋值给video对象的`playbackRate`属性即可实时改变播放速度。难点在于高度的百分比转换。

## 过程指南

本篇实现较为简单，不再分步骤讲解，示例代码如下：

```javascript
  const speed = document.querySelector(".speed");
  const speedBar = speed.querySelector(".speed-bar");
  const video = document.querySelector(".flex");
  
  function changeSpeed(e) {
    const height = e.offsetY;//获取滑块的高度
    const percentage = e.offsetY / speed.offsetHeight;
    const min = 0.5;
    const max = 5;
    //依据自定义播放速度范围和滑块高度百分比确定播放速率
    const playbackRate = percentage * (max - min) + min; 
    speedBar.style.height = Math.round(percentage*100) + '%';
    speedBar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
  }

  speed.addEventListener('click',changeSpeed);
```

> JS30的第28个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
