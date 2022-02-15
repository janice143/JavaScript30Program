---
title: 【原生javascript项目】Local storage 15
date: 2022-02-04 20:21:57
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第15天的“JS window属性： localStorage ”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/localStorage/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_LocalStorage15.png?raw=true)

## 项目描述

本项目是一个可添加项目的点菜清单，刷新网页时，菜单信息不会清空。实现该功能的主要技术是JavaScript Window 对象的localStorage属性。

#### 项目重点

- [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
  - `localStorage.setItem`
  - `localStorage.getItem`

- JS取消默认行为
  - [event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

- reset() 方法
  - 把表单中的元素重置为默认值

- JSON 的方法
  - `JSON.stringify`
  - `JSON.parse`

## 项目过程

#### HTML部分

- 网页logo

  - `<svg>`标签

- 菜品清单内容

  - 标题`<h2>`

  - 菜单项目`<ul>`

  - 添加菜品表单`<form>`

    ```html
    <div class="wrapper">
            <h2>LOCAL TAPAS</h2>
            <p></p>
            <ul class="plates">
              <li>Loading Tapas...</li>
            </ul> 
            <form class="add-items">
              <input type="text" name="item" placeholder="Item Name" required>
              <input type="submit" value="+ Add Item">
            </form>
        </div>
    ```

#### CSS部分

- 菜品项目添加后默认复选框⬜️没有checked

  ```css
  .plates input + label:before {
  content: "⬜️";
  margin-right: 10px;
  }
  ```

- 菜品项目checked后方框变成其他图标

  ```css
  .plates input:checked + label:before {
  content: "🌮";
  }
  ```

#### JS部分

- form表单中若有type 属性是 "submit"的元素，则具有`submit` 事件

  ```javascript
  function addItem(){
     console.log('hello')
  }
  addItems.addEventListener('submit', addItem);
  ```

- 当点击form中的提交按钮时，会提交表单并且刷新页面（可在控制台中看出闪现hello），这种默认行为可以通过 e.preventDefault来阻止

  ```javascript
  function addItem(e){
      e.preventDefault();
  }
  ```

- 下面开始正式编写addItem函数，用来获取form中添加的元素，然后放到items变量中存储起来

  - `this.querySelector('[name=item]')`选择type为text元素的值（输入框输入的内容）
  - 构造一个对象 item 来存储这个信息
  - 把item push到提前创建的items（所有菜单）中

  ```javascript
  const text = (this.querySelector('[name=item]')).value;
  // 构造一个对象 item 来存储这个信息
  item = {
      text, // ES6中对 text: text, 的简写
      done:false // 标记有没有checked
  }
  items.push(item);
  ```
  - 执行populateList(items, itemsList)函数，把新添加的菜品显示到页面中
  - 更新localStorage中的items数据
  - 重置输入框的值

  ```javascript
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
  ```

-  编写populateList函数，实现将items中的信息挂载到DOM树上

  - `<input>`标签实现的复选框
    - `data-index`属性标记菜品序号
  - `<label>`标签记录菜单的文字

  ```javascript
  function populateList(plates = [], platesList) {
      platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
          </li>
        `;
      }).join('');
  }
  ```

- 程序写到这里基本完成，但是仔细观察会发现，如果checked每个菜品，刷新页面后，这个状态会被刷新（不被保留），这是因为我们并没有更新items中done的值

- 所以还需编写toggleDone函数，通过菜品click事件触发

  - `e.target.dataset.index`可以获取利用`data-index`属性标记菜品序号
  - `!items[index].done`否操作
  - 更新localStorage和HTML页面

  ```javascript
  function toggleDone(e) { 
      if (!e.target.matches('input')) return; // skip this unless it's an input
      // console.log(e.target)
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }
  itemsList.addEventListener('click', toggleDone);
  ```

## 项目补充

#### HTML `<input> `标签的 required 属性

required 属性规定必需在提交之前填写输入字段

#### JS-preventDefault() 取消默认行为

语法：`event.preventDefault()`

该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。

常用情景：

- 如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
- <button>标签在form表单中时，click事件默认会提交表单刷新页面，调用可方法，可避免刷新页面
- a 标签点击时，会跳转url，采用如下方式，可防止链接打开 URL：

> 常用情景的知识点来源于[博客](https://blog.csdn.net/hsany330/article/details/105049740)

####  [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)和[JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

JSON对象在所有现代浏览器中都适用，他有两个非常有用的方法是parse()和stringify().

- `JSON.parse()` 把一个JSON字符串转变成JS对象

```javascript
let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}';
let userObj = JSON.parse(userStr);
console.log(userObj);
// {name: 'Sammy', email: 'sammy@example.com', plan: 'Pro'}
```

- `JSON.parse()` 第二个参数可以是一个自定义函数，具有返回值

```javascript
let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}';
let userObj = JSON.parse(userStr, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});
console.log(userObj);
// {name: 'SAMMY', email: 'SAMMY@EXAMPLE.COM', plan: 'PRO'}
```

- `JSON.stringify()` 把一个JS对象转变成JSON字符串

```javascript
let userObj = {
  name: "Sammy",
  email: "sammy@example.com",
  plan: "Pro"
};
let userStr = JSON.stringify(userObj);
console.log(userStr);
// {"name":"Sammy","email":"sammy@example.com","plan":"Pro"}
```

- JSON.stringify()可以有两个额外参数

  - 一个replacer参数（是一个自定义函数，函数名为replacer)

  ```javascript
  let userObj = {
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro"
  };
  function replacer(key, value) {
    console.log(typeof value);
    if (key === 'email') {
      return undefined;
    }
    return value;
  }
  let userStrReplacer = JSON.stringify(userObj, replacer);
  console.log(userStrReplacer);
  // {"name":"Sammy","plan":"Pro"}
  ```

  - 一个是space参数（是 `String` 或者 `Number` 值），用来控制间距
    - 如果是Number，缩进为空格数(1-10)
    - 如果是String，缩进为该字符串

  ```javascript
  JSON.stringify({ uno: 1, dos: 2 }, null, '\t');
  // returns the string:
  // '{
  //     "uno": 1,
  //     "dos": 2
  // }'
  ```

#### map()和forEach()的区别和理解

两个方法都可以实现元素遍历，但是map方法可以用返回值，而forEach方法没有返回值

#### 参考博客

1. [JS-preventDefault() 取消默认行为](https://blog.csdn.net/hsany330/article/details/105049740)
2. [How To Use JSON.parse() and JSON.stringify()](https://www.digitalocean.com/community/tutorials/js-json-parse-stringify)
3. [Example of using JSON.stringify() with localStorage](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#example_of_using_json.stringify_with_localstorage)
4. [map()和forEach()的区别和理解](https://blog.csdn.net/suwu150/article/details/111590409#:~:text=forEach()%E6%96%B9%E6%B3%95%E4%B8%8D%E4%BC%9A,%E6%89%A7%E8%A1%8C%E6%97%B6%E6%94%B9%E5%8F%98%E5%8E%9F%E6%95%B0%E7%BB%84%EF%BC%89%E3%80%82)

> JS30的第15个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

