---
title: 【原生javascript项目】Link Highlighter 22
date: 2022-02-25 14:10:10
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第22天的“链接高亮显示”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/22%20linkHighlighter/index.html

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_HighLighter.png?raw=true)

## 项目描述

本项目页面主要有一个导航栏菜单和正文内容组成。页面实现的效果是：当鼠标进入`a`标签时，背景颜色以白色高亮显示，当鼠标移到下一个`a`标签时，白色高亮块上一个`a`标签中移动下来。

#### 项目重点

- `Element.getBoundingClientRect()`
- `window.scrollY`
- `mouseenter`事件

## 项目过程

#### HTML部分

- `nav`标签包裹的导航栏菜单
  - `ul`标签
    - 5个`li`标签，为菜单内容

- 类名为`wrapper`的`div`标签包含了正文内容
- 链接用`a`标签标记，在JS中要实现高亮显示

#### CSS部分

使用如下技巧将外边距和内边距重置为零

```css
*, *:before, *:after {
  box-sizing: inherit;
}
```

高亮块的CSS样式，基本思路是加上绝对定位（相对于最近定位的父元素定位，在这里父元素是body），通过在JS中改变`top`和`left`以及`width`和`height`属性，来呈现不同链接选中的状态。

```css
.highlight{
    transition: all 0.2s;
    border-bottom: 2px solid white;
    position: absolute;
    top: 0;
    background: white;
    left: 0;
    z-index: -1;
    border-radius: 20px;
    display: block;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

#### JS部分

JS的大致思路是：

1. 获取链接标签，以及创建`span`标签，用来添加`highlight`样式

   ```javascript
   const triggers = document.querySelectorAll('a');
   const highlight = document.createElement('span');
   highlight.classList.add('highlight');
   document.body.appendChild(highlight);
   ```

2. 获取当前鼠标进入的链接元素的位置信息

3. 修改类名为`highlight`的样式

4. 给`a`标签添加鼠标进入`mouseenter`事件

- 获取链接标签，以及创建`span`标签，用来添加`highlight`样式

```javascript
function highlightter(){
    const link = this.getBoundingClientRect();
    console.log(link);
    const linkCoordinates ={
        width:link.width,
        height:link.height,
        top:link.top+window.scrollY,
        left:link.left+window.scrollX
    };
    highlight.style.width = `${linkCoordinates.width}px`;
    highlight.style.height = `${linkCoordinates.height}px`;
    highlight.style.transform = `translate(${linkCoordinates.left}px,${linkCoordinates.top}px)`;
}
triggers.forEach(a => a.addEventListener('mouseenter', highlightter));
```

## 项目补充

#### [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

返回一个DOMRect对象，包含了元素的大小、相对于视口的位置信息。

**DOMRect相关只读属性**

| Attribute | Description                                 |
| --------- | ------------------------------------------- |
| height    | 矩形盒子的高度                              |
| width     | 矩形盒子的宽度                              |
| top       | Y 轴，相对于视口原点（viewport origin）顶部 |
| left      | X 轴，相对于视口原点左侧                    |
| bottom    | Y 轴，相对于视口原点底部                    |
| right     | X 轴，相对于视口原点右侧                    |
| x         | 盒子左上角位置的X轴横坐标                   |
| y         | 盒子左上角位置的Y轴横坐标                   |

#### window.scrollY

鼠标滑动的垂直距离

window.scrollX 鼠标滑动的水平距离

#### mousemove, mouseenter 和mouseover区别

mousemove：鼠标指针进入`div`以及其子元素时触发；

 mouseenter：鼠标指针进入`div`时触发；

mouseover：鼠标每次滑过`div`时触发

点击此链接体验三者的效果 👉 [体验](https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_mouseenter_mouseover#:~:text=mouseenter%20and%20mouseover.-,The%20mouseover%20event%20triggers%20when%20the%20mouse%20pointer%20enters%20the,moved%20over%20the%20div%20element.)

> JS30的第22个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.



