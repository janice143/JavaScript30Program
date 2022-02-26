---
title: 【原生javascript项目】Geolocation 21
date: 2022-02-24 21:43:51
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第21天的“地理位置”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/21%20geoLocation/index.html

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_geoLocation21.png?raw=true)

## 项目描述

本项目是一个可视化的指南，利用网络地址位置`Web Geolocation API`获取的地理位置和速度。

本项目的JS代码相对比较简单，但是由于电脑一般没有速度及方向传感器，所以实际的功能并没显示出来，只是提供了一种实现途径。

#### 项目重点

- `Geolocation.watchPosition()` API
  - `.coords.speed`
  - `.coords.heading`
- CSS `radial-gradient`
- `background-attachment`设置背景图是否固定不到

## 项目过程

#### HTML部分

- `svg`图片元素
- `h1`元素
  - 类名为`speed-value` `span`标签
  - 类名为`speed-unit` `span`标签

#### CSS部分

- 设置背景图片

`radial-gradient`由圆心向外的径向的颜色渐变

```css
radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px
```

#### JS部分

JS的大致思路是：

1. 请求调用[Geolocation接口](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) 
2. 获取当前的地理位置信息data
3. 显示速度信息 `data.coords.speed`
4. 改变页面中指南针的朝向 `data.coords.heading`

具体代码如下：

```javascript
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
});

```

## 项目补充

#### [Geolocation接口](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) ：获取设备的地理位置信息

方法 1：`Geolocation.getCurrentPosition()` 获取当前的位置信息

方法 2：[`Geolocation.watchPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) 返回位置变化后的最新信息

方法 3：`Geolocation.clearWatch()` 删除使用`watchPosition()`后的句柄

> JS30的第21个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

