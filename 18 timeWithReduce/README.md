---
title: 【原生javascript项目】Time with Redece 18
date: 2022-02-15 15:06:27
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第18天的“利用reduce进行时间累加”项目。Have fun with the website! ♪(^∇^*)

网页代码： https://janice143.github.io/timeWithReduce/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_TimeWithReduce18.png?raw=true)

## 项目描述

项目首先在html中提供了若干个属性名为`data-time`的列表元素，`data-time`的值以00:00（分：秒）的格式显示。要求在JS中计算出`data-time`的总值，并且用？时？分？秒的格式显示结果。

#### 项目重点

- `Array.from()`
- `timeNode.dataset.time`
- `.split(':')`
- `.map(parseFloat)`
- `.reduce()`
- `Math.floor()`

## 项目过程

#### HTML部分

-  若干个`li`标签，添加了`data-time`属性

#### JS部分

JS的整体思路是先获取所有的`data-time`的值，然后将所有值转化成秒，并且计算出的总秒数。根据总秒数得到对应的时、分、秒。

为了显示最后的结果，在本项目中国通过创建一个p元素来实现。

- 获取所有的`data-time`元素，转化成数组，并存储在`timeNodes`变量中

  ```javascript
  const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
  ```

- 从`timeNodes`中可以得到`data-time`的值

  ```javascript
  const seconds = timeNodes.map(
      timeNode => timeNode.dataset.time
  )
  ```

- 将每个`data-time`的值转化成秒

  ```javascript
  .map(
      timeCode => {
          const [min, sec] = timeCode.split(':').map(parseFloat)
          // console.log(typeof(min),sec)
          return (min*60)+sec
      }
  )
  ```

- 利用reduce方法累加得到总秒数

  ```javascript
  .reduce(
      (total,vidSecond) => total + vidSecond
  )
  ```

- 根据总秒数，计算出时、分、秒

  ```javascript
  let leftSec = seconds;
  const hour = Math.floor(leftSec/3600);
  leftSec = leftSec % 3600;
  
  const min = Math.floor(leftSec/60);
  leftSec = leftSec % 60;
  ```

- 新建一个p元素，添加显示内容，最后挂载到网页上，显示结果

  ```javascript
  function display(hour,min,leftSec){
      // 使用createElement创建元素
      const newTaskItem = document.createElement('p');
      newTaskItem.className = 'total-time';
      const html =
            `
            总播放时间为：${hour}小时${min}分${leftSec}秒。
  `;
      newTaskItem.innerHTML = html;
      document.querySelector('ul').before(newTaskItem);
  }
  ```

## 项目补充

[Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)：将一个伪数组对象转化成数组。

`.split()`：将一个`String`对象分割成子字符串数组

#### `parseFloat(string)`将字符串解析为浮点数

- 如果 `parseFloat` 在解析过程中遇到了正号（`+`）、负号（`-` ）、数字（`0`-`9`）、小数点（`.`）、或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数。
- 第二个小数点的出现也会使解析停止。
- 参数首位和末位的空白符会被忽略。
- 如果字符串的第一个字符不能被解析成为数字，则返回 `NaN`。
- `parseFloat` 也可以解析并返回 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)。

#### [reduce方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

##### 语法

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

`initialValue`为作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。

##### 示例

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue){
  return accumulator + currentValue;
}); // 10
```

> JS30的第18个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.









