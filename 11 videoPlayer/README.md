---
title: 【原生javascript项目】Video player 11
date: 2022-01-18 13:58:54
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第11天的“自定义视频播放器”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/videoPlayer/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_VideoPlayer11.png?raw=true)

## 项目描述

利用video标签，以及一些div标签，在js中设置视频的播放控件，包括**暂停/播放**，**声音调节**，**视频进度调节**，**视频播放率**，**跳过/退后**。

项目重点

- [video对象的各种属性、方法和事件](https://www.w3school.com.cn/jsref/dom_obj_video.asp)
  - `paused`
  - `play()`
  - `pause()`
  - `currentTime`
  - `volume`
  - `playbackRate`

- HTML DOM offsetWidth 属性
  - 获取元素的宽度，包含内边距（padding）和边框（border）:
- [HTML5 data-* 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*)
  - this.dataset.
  - data-

## 项目过程

#### html部分

1. `video`标签标记视频文件
2. `div`标签和`button`标签实现的一些视频控件，类名为.controlers
   - .progress进度条，.progress_filled进度条填充颜色
   - .player_button播放按钮
   - 声音滑块
   - 播放速度滑块
   - 前进/后退按钮

#### Js部分

- 获取标签

- 编写自定义函数

  - 播放按键

    ```javascript
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    ```

  - 更新播放键的按键

    ```javascript
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    ```

  - 前进/后退

    ```javascript
    video.currentTime += parseFloat(this.dataset.skip);
    ```

  - 更新滑块的值

    ```javascript
    video[this.name] = this.value;
    ```

  - 更新进度条（填充颜色）

    ```javascript
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    ```

  - 鼠标移动进度条

    ```javascript
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    ```

- 添加监听事件

  - 视频的click,play,pause,timeupdata事件
  - 播放按钮、前进后退按钮的click事件
  - 滑块的change,mousemove事件
  - 进度条的click,mousemove,mousedown,mouseup事件

### CSS部分

-  flex容器的项目属性
   -  `flex-basis`：项目占据的主轴空间（main size）
   -  `flex`

- [属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)
  -  input[type=range]

## 项目知识点

#### [data-*](https://juejin.cn/post/6844904039407157262)

自定义数据属性，可通过所属元素的 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口访问，确切地说是`HTMLElement.dataset` ， `HTMLElement.dataset["testValue"]` 属性访问。

注*：data-后面的命名规则

- 该名称不能以`xml`开头，无论这些字母是大写还是小写；
- 该名称不能包含任何分号；
- 该名称不能包含A至Z的大写字母
- data后面的命名中有-，如 *data-test-value* ，可通过 `HTMLElement.dataset.testValue` ( 或者是` HTMLElement.dataset["testValue"] `) 来访问，任何短线符号都会被下个字母的大写替代(驼峰拼写)。

> JS30的第11个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
>

