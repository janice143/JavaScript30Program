---
title: 【原生javascript项目】Canvas 08
date: 2022-01-07 20:13:07
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第8天项目，为了更有挑战性，我实现了 **移动端绘图** 、**画笔样式选择**的功能。Have fun with the website! ♪(^∇^*)



网页效果：https://janice143.github.io/myCanvas/ （画了个嗅嗅，一不小心暴露自己是个魔法师啦，哈哈）

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Canvas08.png?raw=true)

## 项目描述

利用html5 中的canvas实现的画板。在**电脑端**可利用鼠标移动点击进行绘图，在**移动端**可以通过触摸移动实现绘图。绘图的笔**颜色**、**粗细**可以调节，选中**橡皮擦**可对局部区域进行修改，**清屏**按钮可以一键清屏。

项目重点

- canvas
  - window.innerWidth
  - lineJoin、lineWidth、lineCap 
  - strokeColor 
  - beginPath、moveTo、lineTo、stroke()

- 鼠标事件
  - mousemove: *e*.offsetX, *e*.offsetY
  - mouseup
  - mouseout
  - mousedown
- 触摸事件
  - touchmove
  - touchend
  - touchcancel
  - touchstart
  - touch坐标计算的坐标偏移问题
- *input*标签的change事件
  - this.value
  - this.name
  - this.checked
  - 滑块input线性过渡变成非线性过渡
- css的flex容器属性
  - *display*:flex
  - *align-items*: center 竖直居中
  -  *justify-content*: center 水平居中

## 项目过程

#### html部分

1. 三个input控件
   - 颜色 type="color"
   - 粗细 type="range"
   - 橡皮擦 type="checkbox"
2. canvas标签设置画布
3. 清屏按钮 type="button"

#### Js部分

- 获取`canvas`标签，并设定宽度和高度；获取四个input元素
- 利用`getContext()`获取渲染上下文，存储在变量`ctx`中。
  - 在二维渲染上下文中，左上点坐标为(0,0)，向右（x轴）向下（y轴）为正
- 设置初始值
  - 初始化画笔颜色（`ctx.StrokeStyle`）粗细（`ctx.lineWidth`），橡皮擦不选中(`eraserChecked = false`)；
  - 设置lineCap(线的末端形状）为圆形，lineJoin（两条线段连接处形状）为圆形
-  编写`updateValue()`函数
  - 三个控件input发生改变时，触发事件，调用该函数，更新画笔三个初始值。
- 编写`draw()`函数
  - 设定一个用于标记绘画状态的变量，画或者不画（true or false)
  - 判断是鼠标事件还是触摸事件，返回当前鼠标点和触摸点的坐标
  - 赋值新的画笔参数
  - 绘制前调用`beginPath()`，设定路径起点、终点
- 编写`clearCanvas()`函数
  - 清屏的原理就是在画布上画满一个白色矩阵
- 所有input的监听事件，控件中的change事件，清屏是click事件

#### CSS部分

使用over-flow:hidden来设置页面不动，这点在移动端触摸时显得必不可少。

## 项目知识点

#### [Canvas](https://www.w3school.com.cn/html/html5_canvas.asp)

- 创建 Canvas 元素

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

- 通过 JavaScript 来绘制

```javascript
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

- 基本样式属性
  - 颜色`：strokeStyle`：线条描边的颜色，`fillStyle`：填充的颜色
  - 线型：`lineCap`：笔触的形状；`lineJoin`：线条相较的方式；`lineWidth`：线条的宽度
- 路径绘制
  - `beginPath()`：新建一条路径
  - `stroke()`：绘制轮廓
  - `moveTo()`：绘制操作的起点
  - `lineTo()`：路径的终点

#### 触摸屏端坐标偏移问题

使用鼠标事件在canvas画布上画画，非常容易就能获取到画布上的坐标，使用（e.offsetX，e.offsetY）就行。但是对于移动端的触摸屏，必须利用【页面上的坐标】-【画布左上角的坐标】=【画布上的坐标】公式去计算当前触摸位置坐标。

changedTouches[0].clientX表示当前触摸点在页面上的坐标，e.target.offsetLeft表示画布偏离页面左上角的位置。

```javascript
x = e.changedTouches[0].clientX -e.target.offsetLeft;
y = e.changedTouches[0].clientY-e.target.offsetTop;
```



> JS30的第8个项目圆满完成啦，虽然对原项目做了一些改进，但是整体上也实现了一些我自己的独特功能。PS：发现自己真的很喜欢编程，fun with front end development.希望自己能力越来越强，实现自己的程序员梦想。
>
> 感谢阅读，有问题联系我的邮箱1803105538@qq.com.





