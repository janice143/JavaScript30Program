---
title: 【原生javascript项目】Secret code sequence 12
date: 2022-01-20 15:41:16
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第12天的“字符序列检测”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/secretCode/

键盘输入 **<u>happy 2022</u>** 即可触发彩蛋。

## 项目描述

通过判断键盘输入的字符串中是否含有指定字符串序列，开启网页中的隐藏彩蛋。本项目的彩蛋是

从网页 [Cornify.com](https://www.cornify.com/) 中加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，随机在页面出加载独角兽的图标和`p`标签。

项目重点

- window的keyup事件
  - `window.addEventListener('keyup',)`
  - `e.key`

- 数组操作
  - `.push()`
  - `.splice()`
  - `.length`
  - `.join()`
  - `.includes()`

## 项目过程

#### html部分

1. `p`标签标记一段提示的文字

#### Js部分

- 声明一个变量用来存储按下的字符串序列数组

- 声明一个变量用来存储已知的指定字符串序列

- window的键盘监听事件

  - 将字符串指定规则切分

  ```javascript
  pressCode.splice(-secretCode.length - 1, pressCode.length - secretCode.length)
  ```

- 判断是否包含指定字符串

  ```javascript
  if (pressCode.join('').includes(secretCode)){}
  ```

- 随机在页面中加载独角兽图标

  ```javascript
  cornify_add();
  ```

## 项目知识点

#### js中的splice方法的使用说明

splice方法可以用来对js的数组进行删除，添加，替换等操作。

1.  删除。第一个参数为起始位置（如果为负数，表示倒数），第二个参数为要删除几个。

   `array.splice(index,num)`

2.  插入。第一个参数（插入位置），第二个参数（0），第三个参数（插入的项）。

   `array.splice(index,0,insertValue)`

3. 替换。第一个参数（起始位置），第二参数（删除项数），第三参数（插入任意数量的项）。

   `array.splice(index,num,insertValue)`

> JS30的第12个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

