---
title: 【原生javascript项目】 Flex Panel 05
date: 2021-11-17 20:10:40
tags: 原生javascript项目
categories: 30个原生javascript项目
---

### 引言

本文介绍一个动态放映网页，知识点主要涉及到flex容器，以及元素点击事件。

效果网站：https://janice143.github.io/flexPanel/

### 正文

#### 一、html部分

主要为5个div元素将网页分为5块，横向排列。每一个div元素中有上中下三个p标签，对应3段话。

```html
<div class="panels">
    <div class="panel1 panel" onclick="clickOpen(1)">
        <p>Hey</p>
        <p>Let's</p>
        <p>Dance</p>
    </div>
    <div class="panel2 panel" onclick="clickOpen(2)">
        <p>Give</p>
        <p>Take</p>
        <p>Receive</p>
    </div>
    <div class="panel3 panel" onclick="clickOpen(3)">
        <p>Experience</p>
        <p>It</p>
        <p>Today</p>
    </div>
    <div class="panel4 panel" onclick="clickOpen(4)">
        <p>Give</p>
        <p>All</p>
        <p>You can</p>
    </div>
    <div class="panel5 panel" onclick="clickOpen(5)">
        <p>Life</p>
        <p>In</p>
        <p>Motion</p>
    </div>
</div>
```

#### 二、css部分

css代码主要要实现5个div元素均匀横向排列，每个div元素内有对应的背景图片、3个p标签的文本。P标签的文本在每一个div元素中也是左右居中、上下均匀排列。主要是利用了flex容器来实现。

#### 1 flex容器

参考网站：https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器的属性：

- flex-direction：项目的排列方向
- flex-wrap：默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。
- flex-flow：`flex-direction`属性和`flex-wrap`属性的简写形式
- justify-content：项目在主轴上的对齐方式
- align-items：项目在交叉轴上如何对齐
- align-content：定义了多根轴线的对齐方式

项目的属性：

- order：项目的排列顺序，数值越小，排列越靠前
- flex-grow：定义项目的放大比例，默认为0
- flex-shrink：项目的缩小比例，默认为1
- flex-basis： 项目占据的主轴空间
- flex：是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`
- align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性

#### 2 css字体

```css
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Amatic+SC">
text-transform: uppercase;
font-family: 'Amatic SC',cursive;
text-shadow: 0 0 4px rgba(0,0,0,0.72),0 0 14px rgba(0,0,0,0.45);
```

#### 3过渡样式

```css
transition:
font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
background 0.2s;
transform:translateY(-100%);
```

#### 4 背景图片

```css
background-size: cover;
background-position: center;
.panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
.panel2 { background-image:url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500); }
.panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
.panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
.panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }
```

#### 5其他

CSS选择器

`*` 将匹配文档的所有元素；`>` 组合器选择前一个元素的直接子代的节点。

 .panel > *选择类名为panel的所以直接子元素

### Js部分

我写的程序，大致思路是在html代码里设置onclick属性，然后函数内容在js里写，不同的panel传入参数不一样

定位类名有两个以上的标签document.getElementsByClassName(`panel${num} panel-open`)；

```javascript
// 点击panel 12345，给对应的panel添加.panel-open属性
function clickOpen(num){
    const panelNumIf = document.getElementsByClassName(`panel${num} panel-open`);
    const panelNum = document.getElementsByClassName(`panel${num}`);
    // console.log(panelNumIf[0])
    if (panelNumIf[0])
        panelNumIf[0].classList.remove('panel-open');
    else
        panelNum[0].classList.add('panel-open');//添加panel-open类属性
    console.log(`panel${num} panel-open`);          
};
```

别人的程序，大致思路是遍历5个Panel，监控是否有点击事件，有的话就运行toggleOpen函数，该函数里 this.classList.toggle('open')表示如果this有open类名，则删除，没有则加上。

e.propertyName获取transitionend的属性名，e.propertyName.includes('flex')包含flex字段的属性名

```javascript
const panels = document.querySelectorAll('.panel');
function toggleOpen() {
    console.log('Hello');
    this.classList.toggle('open');
}
function toggleActive(e) {
    console.log(e.propertyName);
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```

### 总结

完整代码放在了[Github](https://github.com/janice143/flexPanel)上，如果读者有兴趣，不妨试一试。

