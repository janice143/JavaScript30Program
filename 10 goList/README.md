---
title: 【原生javascript项目】Go list 10
date: 2022-01-09 20:27:51
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第10天的“待办清单”项目，我增加了 **双击删除任务** 、**添加任务**的功能。Have fun with the website! ♪(^∇^*)

网页效果：https://janice143.github.io/goList/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Golist10.png?raw=true)

## 项目描述

利用一些 `checkbox` 类型的 `input` 元素，通过在js中实现特定功能，而设计的待办清单网页。在网页中，可以通过点击checkbox来**标记**任务状态，通过按住shift键可以对任务实现**多项check**。也可以通过点击添加来**增加**任务，完成的任务可以通过**双击实现删除**。

项目重点

- 类型为checkbox的input元素的点击事件，回调函数为`clickCheck`
  - *e*.shiftKey
  - this.checked
  - 标记上一次点击的input，以及多选内部的Input
- 类型为text的input元素的change事件，回调函数为`displayTask`
  - 使用createElement创建元素
  - 使用append来在指定结点后添加html
  - 输入文本回车后情况文本，this.value = ''
  - 监听双击事件，移除任务
- checkbox后面的文本双击事件，回调函数为`removeTask`
  - *e*.path[1].remove()

## 项目过程

#### html部分

1. 输入文本框input
2. 定位在文本框上的div元素，点击后display: none
3. 四个类名为task-item是checkbox和任务文本p
4. 新添任务的占位标签，新添加的任务将会append在这里

#### Js部分

- 获取类型为checkbox的所有input，遍历点击事件
  - 点击事件为`clickCheck`
  - 多选操作的原理

```javascript
if(e.shiftKey && this.checked)
    inputChecks.forEach(inputCheck => {
        console.log(inputCheck === this || inputCheck === lastChecked);
        if (inputCheck === this || inputCheck === lastChecked) {
            inBetween = !inBetween;
            // console.log('Starting to check them in between!');
        }
        // console.log('行内是否',inBetween);
        if (inBetween) {
            inputCheck.checked = true;
        }
    })
```

- 获取所有p元素，遍历双击事件
  - 双击事件为`removeTask`
  - 找到对应的任务路径，remove即可

```javascript
function removeTask(e){
    console.log(e.path[1].remove());
}
```

- 获取类名为add-icon的元素，监听点击事件，点击隐藏

  - 使页面元素隐藏和显示可以有两种方式：

    - 方式1：设置元素style属性中的display

    ```javascript
    var t = document.getElementById('test');//选取id为test的元素
    t.style.display = 'none';	// 隐藏选择的元素
    t.style.display = 'block';	// 以块级样式显示
    ```

    - 方式2：设置元素style属性中的visibility

    ```javascript
    var t = document.getElementById('test');
    t.style.visibility = 'hidden';	// 隐藏元素
    t.style.visibility = 'visible';	// 显示元素
    ```

二者的区别在于设置display隐藏后不占用原来的位置，而visibility隐藏后元素位置任然被占用。

- 获取类型为text的input元素，监听change事件

  - change事件调用`displayTask`
  - [动态插入html](https://zh.javascript.info/modifying-document)
    - 使用createElement创建元素
    - 使用append挂载元素
  - 监听双击事件

  ```javascript
  function displayTask(){
      // 使用createElement创建元素
      const newTaskItem = document.createElement('div');
      newTaskItem.className = 'new-task-item';
      const html =
            `
  <div class="task-item">
  <input type="checkbox">
  <p>${this.value}</p>
  </div>
  `;
      newTaskItem.innerHTML = html;
      newTask.append(newTaskItem);
      // console.log(newTask);
      // console.log(html);
      this.value = ''
      newTaskItem.addEventListener('dblclick',removeTask)
  }
  ```

### CSS部分

-  `:checked` 选择器
- 紧邻兄弟组合器：A`+` B 组合器选择相邻元素，即后一个元素B紧跟在前一个A之后，并且共享同一个父节点
- 添加删除线  *text-decoration*: line-through;

## 项目知识点

#### DOM 树

DOM为文档对象模型，每个 HTML 标签都是一个对象。

DOM 将 HTML 表示为标签的树形结构。标签被称为 **元素节点**（或者仅仅是元素），并形成了树状结构：`<html>` 在根节点，`<head>` 和 `<body>` 是其子项，等。元素内的文本形成 **文本节点**，被标记为 `＃text`。一个文本节点只包含一个字符串。它没有子项，并且总是树的叶子。

#### 利用JS修改文档

- 创建一个元素（DOM节点）
  - `document.createElement(tag)`创建一个新 **元素节点（element node）**
  - `document.createTextNode(text)`创建一个 **文本节点**

- 创建 `div` 分为 3 个步骤：

```javascript
// 1. 创建 <div> 元素
let div = document.createElement('div');

// 2. 将元素的类设置为 "alert"
div.className = "alert";

// 3. 填充消息内容
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

这时已经创建了该元素。但到目前为止，它还只是在一个名为 `div` 的变量中，尚未在页面中。所以我们无法在页面上看到它。

- `append`挂载元素

  为了让 `div` 显示出来，我们需要将其插入到 `document` 中的某处。

  - `append`：`document.body.append(div)`。
  - `node.append(...nodes or strings)` —— 在 `node` **末尾** 插入节点或字符串，
  - `node.prepend(...nodes or strings)` —— 在 `node` **开头** 插入节点或字符串，
  - `node.before(...nodes or strings)` —— 在 `node` **前面** 插入节点或字符串，
  - `node.after(...nodes or strings)` —— 在 `node` **后面** 插入节点或字符串，
  - `node.replaceWith(...nodes or strings)` —— 将 `node` 替换为给定的节点或字符串。



> JS30的第10个项目圆满完成啦，虽然对原项目做了一些改进，但是整体上也实现了一些我自己的独特功能。PS：中间跳了第7和9个项目，如果有时间我后面会补上滴！
>
> 感谢阅读，有问题联系我的邮箱1803105538@qq.com.
