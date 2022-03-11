---
title: 【原生javascript项目】Strip follow along nav 26
date: 2022-02-27 14:49:16
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第26天的“内容悬浮显示”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/26%20stripAlongNav/index.html

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_stripAlongNav.png?raw=true)

## 项目描述

本项目的网页主题是一个菜单栏，通过鼠标`mouseenter`进入每个菜单项目时，会显示出相应的隐藏扩展内容，当从一个菜单进入另一个菜单时，扩展内容的显示会有一个从上一个菜单平移到当前菜单的动态效果。

本项目的难点在于适应大小的动态显示和平移效果。由于扩展内容包含的类型各不相同，而且显示要有一个从上一个菜单平移到当前菜单的动态效果，要做到用通用化的操作，根据扩展内容的具体大小动态显示出，是一件值得思考的事情。

#### 项目重点

- `getBoundingClientRect()`

## 项目过程

#### HTML部分

- 第一个菜单及其扩展内容

  包含`a`标签标记的标题；类名为`dropdown,dropdown1`的下拉菜单（一张图片和描述文本）

  ```html
  <li>
      <a href="#">About Me</a>
      <div class="dropdown dropdown1">
          <div class="bio">
              <img src="https://logo.clearbit.com/wesbos.com">
              <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait. BBQ isn't part of web development. It should be though!</p>
          </div>
      </div>
  </li>
  ```

- 第二个菜单及其扩展内容

  包含`a`标签标记的标题；类名为`dropdown,dropdown2`的下拉菜单（类型相同的列表）

  ```html
  <li>
      <a href="#">Courses</a>
      <ul class="dropdown courses">
          <li>
              <span class="code">RFB</span>
              <a href="https://ReactForBeginners.com">React For Beginners</a>
          </li>
          <li>
              <span class="code">ES6</span>
              <a href="https://ES6.io">ES6 For Everyone</a>
          </li>
          <li>
              <span class="code">NODE</span>
              <a href="https://LearnNode.com">Learn Node</a>
          </li>
          <li>
              <span class="code">STPU</span>
              <a href="https://SublimeTextBook.com">Sublime Text Power User</a>
          </li>
          <li>
              <span class="code">WTF</span>
              <a href="http://Flexbox.io">What The Flexbox?!</a>
          </li>
          <li>
              <span class="code">GRID</span>
              <a href="https://CSSGrid.io">CSS Grid</a>
          </li>
          <li>
              <span class="code">LRX</span>
              <a href="http://LearnRedux.com">Learn Redux</a>
          </li>
          <li>
              <span class="code">CLPU</span>
              <a href="http://CommandLinePowerUser.com">Command Line Power User</a>
          </li>
          <li>
              <span class="code">MMD</span>
              <a href="http://MasteringMarkdown.com">Mastering Markdown</a>
          </li>
      </ul>
  </li>
  ```

- 第三个菜单及其扩展内容

  包含`a`标签标记的标题；类名为`dropdown,dropdown3`的下拉菜单（类型相同的列表）

  ```html
  <li>
      <a href="#">Other Links</a>
      <ul class="dropdown dropdown3">
          <li><a class="button" href="http://twitter.com/wesbos">Twitter</a></li>
          <li><a class="button" href="http://facebook.com/wesbos.developer">Facebook</a></li>
          <li><a class="button" href="http://wesbos.com">Blog</a></li>
          <li><a class="button" href="http://wesbos.com/courses">Course Catalog</a></li>
      </ul>
  </li>
  ```

- 白背景

  ```html
  <div class="dropdownBackground">
      <span class="arrow"></span>
  </div>
  ```

#### CSS部分

- `trigger-enter`类名。效果是显示下拉菜单，但是此时下拉菜单的不透明度还是为0，所以还是看不到下拉菜单

  ```css
  .trigger-enter .dropdown {
      display: block;
  }
  ```

- `trigger-enter-active`类名。效果是将下拉菜单的不透明度设置为1

  ```css
  .trigger-enter-active .dropdown {
      opacity: 1;
  }
  ```

- `dropBackgorund`类名。设置背景图片的样式，<u>也是本项目难点的实现机制，通过移动背景白版，来实现一个动态平移的过程。</u>

  ```css
  .dropdownBackground {
      width: 100px;
      height: 100px;
      position: absolute;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 50px 100px rgba(50,50,93,.1), 0 15px 35px rgba(50,50,93,.15), 0 5px 15px rgba(0,0,0,.1);
      transition: all 0.3s, opacity 0.1s, transform 0.2s;
      transform-origin: 50% 0;
      display: flex;
      justify-content: center;
      opacity: 0;
  }
  ```

- `open`类名。将背景图片的不透明度设置为1

  ```css
  .dropdownBackground.open {
  	opacity: 1;
  }
  ```

  

#### JS部分

- 鼠标进入导航栏项目时。

  - 给对应的项目添加类名`trigger-enter`，随后150ms，添加类名`trigger-enter-active`。
  - 白背景也要同时显示，所以添加类名`open`
  - 利用`getBoundingClientRect()`属性获取元素的宽高和位置信息。<u>这是本项目的难点的实现机制，根据下拉菜单大小动态显示。</u>
  - 白背景的显示位置是相对于已定位的`nav`元素，所以其`top`位置是下拉菜单的`top`位置减去`nav`的`top`位置。

  ```javascript
  const triggers = document.querySelectorAll('.cool > li');
  const background  = document.querySelector('.dropdownBackground');
  const nav  = document.querySelector('.top');
  
  function handleEnter() {
      this.classList.add('trigger-enter');
      setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
      background.classList.add('open');
  
      const dropdown = this.querySelector('.dropdown');
      const dropdownCoords = dropdown.getBoundingClientRect();
      const navCoords = nav.getBoundingClientRect();
  
      const coords = {
          height: dropdownCoords.height,
          width: dropdownCoords.width,
          top: dropdownCoords.top - navCoords.top,
          left: dropdownCoords.left - navCoords.left
      };
  
      background.style.setProperty('width', `${coords.width}px`);
      background.style.setProperty('height', `${coords.height}px`);
      background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
  }
  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
  ```

- 鼠标移除导航栏菜单时。删除类名`trigger-enter`，`trigger-enter-active`，`open`。

  ```javascript
  function handleLeave() {
      this.classList.remove('trigger-enter', 'trigger-enter-active');
      background.classList.remove('open');
  }
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
  ```

##  项目补充

#### [getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

返回DOMRect对象，包含元素的大小和相对视口的位置信息。

```javascript
domRect = element.getBoundingClientRect();
```

#### will-change: opacity

提醒浏览器该元素的opacity特性将会改变

#### A > B

匹配A的所有直接后代B

> JS30的第26个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
