---
title: 【原生javascript项目】Event Capture 25
date: 2022-02-27 14:09:03
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第25天的“语音合成”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/25%20eventCapture/index.html

## 项目描述

本项目主要目的是理解事件的捕获、传播、冒泡、单次触发等机制。首先提供3个尺寸颜色不一的`<div>`元素，通过点击事件来理解上述内容。

#### 项目重点

- `capture`
- `once`

## 项目过程

#### JS部分

- **冒泡**

  当点击某个`div`时，自该`div`起以及其外层的`div`也将监听到点击事件。

  例如，点击第3个div（最内层的），控制台显示的结果是three,two,one。

  ```javascript
  const divs = document.querySelectorAll('div');
  function textLog(){
      console.log(this.classList.value);
  }
  divs.forEach(div=>div.addEventListener('click',textLog));
  ```

- **捕获**

  点击某个`div`时，从不具体的`div`元素到最具体的元素（被点击的元素）从上到下监听到点击事件。

  例如，点击第3个`div`（最内层的），控制台显示的结果是one,two,three。

  ```javascript
  divs.forEach(div=>div.addEventListener('click',textLog,{
    capture: true
   }));
  ```

- 停止事件继续传递

  在冒泡的基础上，加上`e.stopPropagation();`来设置不再继续传播

  ```javascript
  function textLog(e){
      console.log(this.classList.value);
      e.stopPropagation();
  }
  divs.forEach(div=>div.addEventListener('click',textLog,{
      capture: false
  }));
  ```

- Once：允许事件触发一次，之后相当于`removeEventListener`。

  ```javascript
  function textLog(e){
      console.log(this.classList.value);
  }
  divs.forEach(div=>div.addEventListener('click',textLog,{
      capture: false,
      once:true
  }));
  ```

##  项目补充

#### 事件冒泡

事件开始由最精确的元素触发，逐级向上传播到其他节点

#### 事件捕获

事件由不太具体的节点传播到最具体的节点

## 参考博客

1. [事件流](https://tsejx.github.io/javascript-guidebook/document-object-model/events/event-flow)

JS30的第25个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
