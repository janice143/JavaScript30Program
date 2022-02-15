---
title: 【原生javascript项目】Slide in on scroll 13
date: 2022-01-30 19:41:50
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第13天的“图片随屏幕滚动而滑入滑出”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/sliderIn/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Slidein13.png?raw=true)

## 项目描述

本项目为一个图文浏览网页，其中，当浏览到图片时（屏幕滚动到图片上），图片具有滑入特效，浏览完毕后，图片滑出。滑入滑出特效由css的`translateX()`实现，触发特效有javascript控制。

#### 项目重点

- window的scroll事件
  - `window.addEventListener('scroll')`
- 一些位置（像素值）
  - `window.scrollY`  文档当前垂直滚动的像素数
  -  `window.innerHeight` viewport部分的高度
  - `sliderImage.offsetTop` 当前元素顶部相对于其 offsetParent 元素的顶部的距离
  - [未枝丫博客有图解](https://github.com/soyaine/JavaScript30/tree/master/13%20-%20Slide%20in%20on%20Scroll)

- `debounce` 的作用（函数防抖）
  -  降低事件监听的频率，使用了 Lodash 中的 debounce 方法

## 项目过程

#### html部分

1. `p`标签的文字
2. `img`标签的图片

#### JS部分

- 监听window的scroll事件
- 触发`checkSlide`函数
  - 图片滑入条件：屏幕滚动位置以及屏幕高度之和 > 图片顶部距离页面距离以及图片半高；屏幕滚动位置 < 图片底部距离

```javascript
const slideInAt = (window.scrollY + window.innerHeight);
const imageBottom = sliderImage.offsetTop + sliderImage.height;
const isHalfShown = slideInAt > (sliderImage.offsetTop + sliderImage.height / 2);
const isNotScrolledPast = window.scrollY < imageBottom;
```

- 函数防抖

  由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用 `debounce` 函数来降低触发的次数

  ```javascript
  function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };
  ```

#### CSS部分

- 屏幕滚动之前，图片的状态是：不透明度为0（隐藏），x方向偏移30%（相对于图片大小），缩放95%。

```css
.align-right.slide-in {
transform: translateX(30%) scale(0.95);
}
.slide-in.active {
opacity: 1;
transform: translateX(0%) scale(1);
}
```

- 触发特效，图片的状态是：不透明度为1，x方向偏移0%（相对于图片大小），缩放1。

```css
.slide-in.active {
    opacity: 1;
    transform: translateX(0%) scale(1);
}
```

## 项目补充

#### 元素浮动

##### 作用

能够实现让多个元素排在问一行,并且给这些元素设置宽度与高度。

##### 背景

在标准文档流中的元素只有两种：块级元素和行内元素。让多个元素排在同一行：行内元素的特性；给这些元素设置宽高:块级元素的特性。如果想让一些元素既要有块级元素的特点也要有行内元素的特点，只能让这些元素脱离标准文档流（脱标），浮动可以让元素脱离标准文档流，可以实现让多个元素排在同一行并且可以设置宽高。

##### 实现

浮动通过浮动属性来实现，`float`这个属性有两个值left向左浮动，向左移动、right向右浮动，向右移动。

##### 浮动元素的特性

- 浮动元素脱离标准文档流不再占用空间；

- 我们可以把浮动元素理解为“漂”
- 浮动元素的层级比标准文档流里面的元素层级要高,会将标准文档流中的元素给压盖住
- 行内素浮动后，变成块状元素

##### 清除浮动：只要有浮动那么必须有清除浮动

**1** **为什么要清除浮动?**

因为经过浮动元素会影响到下面的元素的排版布局，浮动元素的父元素没有将浮动元素包裹，只要清除了浮动，就不会影响到浮动元素的下面进行排版布局，浮动元素的父元素会将浮动元素从视觉上包裹着。

**2** **清除浮动有以下三种方法:**

- 给浮动元素的父元素设置一个固定的高度
- 使用清除浮动的样式属性 clear.（clear:left清除左浮动, clear: right:;清除右浮动 clear: both两者都清除）,这个属性一般用在最后一个浮动元素的下面,在最后一个浮动元素的下面（不是子级，而是并列下一行）新建一个空白的div,这个div什么内容都不要放,只做一件事件，就是清除浮动
- 使用 overflow: hidden这个属性来清除浮动

**注意***：使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围



> JS30的第13个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.





