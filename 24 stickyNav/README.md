---
title: 【原生javascript项目】Sticky Nav 24
date: 2022-02-26 19:46:22
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第23天的“语音合成”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/24%20stickyNav/index.html

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Nav.png?raw=true)

## 项目描述

本项目主要亮点在于实现导航栏的位置粘贴固定，此外，当鼠标滚动导航栏（本来）消失时，除了要固定导航栏，还要加一点其他样式。

技术要点是通过`scroll`事件中，判断窗口位置和当前导航栏的位置，如果前者大于或等于后者，则通过添加一个类名`'fixed-nav'`（其样式事先在CSS中完善），来实现上述两亮点。

当前者小于后者，则移除`'fixed-nav'`类名。

#### 项目重点

- scroll事件
- `window.scrollY `>= `topOfNav`
-  `nav.offsetTop`
- `document.body.classList.add()`
- `document.body.classList.remove()`
- `position: fixed`

## 项目过程

#### HTML部分

- `header`标题
- `nav`导航栏菜单
- `.site-wrap`正文

#### JS部分

JS的大致思路是：

1. 监听页面滚动事件
2. 判断页面当前滚动位置，如果大于等于导航栏距离窗口顶部位置时，则通过添加类名
3. 否则移除类名
4. 该类名的样式在CSS中设置好，原理在于position设置为fix

```javascript
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;
function fixNav() {
    if (window.scrollY >= topOfNav) {
        // document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;
    }
}

window.addEventListener('scroll', fixNav);
```

 项目补充

#### text-align: justify

均匀分布，有点像word软件的“两端对齐”。

> JS30的第24个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
