---
title: 【原生javascript项目】Click and drag 27
date: 2022-03-05 15:13:56
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第26天的“内容悬浮显示”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/27%20clickAndDrag/index.html

## 项目描述

本项目为一个横向条幅，实现的特效是鼠标点击实现横向拖拽。

#### 项目重点

- `e.pageX `
- `.scrollLeft`
- `.offsetLeft`
-  `e.preventDefault()`

## 项目过程

#### JS部分

编程思路为

1. 监听最外层items元素的`mousedown`事件，触发后添加`active`类名，此类名具有一定的CSS特效。记录此时的起点`startX` 以及 左边滚动的位置`scrollLeft`。
2. 监听鼠标移动`mousemove`事件，给`scrollLeft`赋值，即可调整元素在水平方向滚动的位置。
3. 鼠标离开`mouseleave`和不点击`mouseup`事件触发时，去掉`active`类名。

- `mousedown`事件

  ```javascript
  slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  });
  ```

- `mousemove`事件

  ```javascript
  
  slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
  });
  ```

- `mouseleave`和不点击`mouseup`事件

  ```javascript
  slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
  });
  
  slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
  });
  ```

## 项目补充

#### 一些CSS样式

1. `overflow`属性：控制元素溢出时的特性，主要有一下几个值
   - `visible` 默认值，溢出也是可见的，没有被裁剪
   - `hidden` 溢出的内容被裁剪，并且看不到
   - `scroll `溢出的内容被裁剪，但是可以添加滑块scrollbar看到溢出内容
   - `auto` 有点像`scroll`

2. `white-space`空格处理
   - `normal`表示合并空格，多个相邻空格合并成一个空格
   - `nowrap`不换行，经常和`overflow`,`text-overflow`一起使用
   - `pre`保留空格不换行，有几个空格算几个空格显示
   - `pre-wrap`的作用是保留空格

3. user-select：禁止用户用鼠标在页面上选中文字、图片等，也就是，让页面内容不可选

> JS30的第27个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
