---
title: 【原生javascript项目】Mouse Move Shadow 16
date: 2022-02-10 21:10:23
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第16天的“文字阴影随鼠标移动”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/mouseMoveShadow/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_MouseMoveShadow16.png?raw=true)

## 项目描述

本项目实现的是一个文字阴影随鼠标位置移动的特效。其中文字阴影是通过添加CSS的text-shadow属性实现的，为了让文字阴影随鼠标位置移动，需要获取当前鼠标的位置，通过一些转化变成对应的文字阴影位置。

#### 项目重点

- CSS的[text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)属性
  - `text-shadow: 10px 10px 0 rgba(0,0,0,1), 10px 20px 0 rgba(200,0,0,1);`
- HTMLElement的一些只读属性
  - `offsetWidth`
  - `offsetHeight`
  - `offsetLeft`
  - `offsetTop`

- 鼠标事件的一些属性
  - `offsetX`
  - `offsetY`

## 项目过程

#### HTML部分

- 类名为hero的div元素
  - h1标签，加了`contenteditable`属性，表示浏览网页的用户可以编辑

#### CSS部分

- 让网页主题内容水平、垂直居中

  ```css
  display: flex;
  justify-content: center;
  align-items: center;
  ```

- 让文字具有阴影（后面再JS中会修改）

  ```css
  h1 {
      text-shadow: 10px 10px 0 rgba(0,0,0,1);
      /* text-shadow: 10px 10px 0 rgba(0,0,0,1), 10px 20px 0 rgba(200,0,0,1); */
      font-size: 100px;
  }
  ```

#### JS部分

- 首先创建三个变量，一个指向类名为`hero`的元素，一个指向`h1`元素，最后一个变量`walk`用来存储文字阴影距离原文字最大距离的一半。

- 监听`hero`上的`mouseover`的事件，回调函数为`shadow`

- 回调函数要实现的是，获取鼠标移动事件的位置`offsetX`和`offsetY`，通过一些公式将这两个位置变成新的位置信息，然后修改CSS样式上的text-shadow属性。

  - 首先设置变量`width`和`height`存储hero元素的宽高信息

  - 设置变量`x`和`y`存储鼠标移动事件的位置信息

    ```javascript
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;
    ```

    这里的写法采用了ES6的**[解构赋值写法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)**，语句`let { offsetX: x, offsetY: y } = e;`等同于`let x = e.offsetX; let y = e.offsetY;`

    `offsetX/offsetY`：鼠标位置（相对于最近父元素的坐标）

    `offsetWidth/offsetHeight`：元素的宽高（width+padding+border）

  - 转换的公式如下所示，其中x/width是一个比例系数

    ```javascript
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));
    ```

  - 利用JS修改CSS中的text-shadow属性，具体来说有四个文字阴影，分布在text的四个角落

    ```javascript
    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;
    ```

- 程序写到这里会出现一个bug，当鼠标移动到h1时，文字阴影没有在文字中聚焦，这是因为鼠标移动到h1时，`offsetX`表示的是相对于h1的位置；当鼠标移动在hero上时，`offsetX`表示的是相对于hero的位置。

  所以还需要添加在shadow函数中，首先需要做个**条件判断**

  ```javascript
  if (this !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
  }
  ```

- 写到这里程序就大体完成啦！具体代码我放在了[github](https://github.com/janice143/mouseMoveShadow)上。

## 项目补充

#### [JavaScript中event.target与this区别](https://segmentfault.com/a/1190000023596603#:~:text=%E6%80%BB%E7%BB%93%EF%BC%9Athis%E4%B8%8Eevent.target,%E8%AF%A5%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%9B%AE%E6%A0%87%E8%8A%82%E7%82%B9%E3%80%82)

`this`一直指向函数的调用者，在本程序中，鼠标无论移动到`hero`上还是`h1`上，console.log(this)显示的一直是

```html
<div class="hero">
    <h1 contenteditable style="text-shadow: rgba(255, 0, 255, 0.7) 241px 101px 0px, rgba(0, 255, 255, 0.7) -241px 101px 0px, rgba(0, 255, 0, 0.7) 101px -241px 0px, rgba(0, 0, 255, 0.7) -101px 241px 0px;">🔥WOAH!</h1>
</div>
```

而`event.target`指向的是触发该事件的目标节点，在本程序中，鼠标移动到`hero`上，显示内容和上述一样，但是移动到`h1`上时，显示内容为

```html
<h1 contenteditable style="text-shadow: rgba(255, 0, 255, 0.7) 241px 101px 0px, rgba(0, 255, 255, 0.7) -241px 101px 0px, rgba(0, 255, 0, 0.7) 101px -241px 0px, rgba(0, 0, 255, 0.7) -101px 241px 0px;">🔥WOAH!</h1>
```

因此，**this与event.target的区别为当含有事件冒泡时，this一直指向该函数的调用者，而event.target则指向触发该事件的目标节点**

#### ES6 解构赋值

**解构赋值**语法是一种 Javascript 表达式。通过**解构赋值,** 可以将属性/值从对象/数组中取出,赋值给其他变量。

以前，为变量赋值，只能直接指定值。

```javascript
var a = 1;
var b = 2;
var c = 3;
```

ES6允许写成下面这样。

```javascript
var [a, b, c] = [1, 2, 3];
```

上述为数组赋值。

对于对象赋值，可以写成在这样

```javascript
var { foo, bar } = { foo: "aaa", bar: "bbb" };
```

如果变量名与属性名不一致，必须写成下面这样

```javascript
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

#### 参考博客

1. [ES6 变量的解构赋值](http://caibaojian.com/es6/destructuring.html)
2. [JavaScript中event.target与this区别](https://segmentfault.com/a/1190000023596603#:~:text=%E6%80%BB%E7%BB%93%EF%BC%9Athis%E4%B8%8Eevent.target,%E8%AF%A5%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%9B%AE%E6%A0%87%E8%8A%82%E7%82%B9%E3%80%82)

> JS30的第16个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.



