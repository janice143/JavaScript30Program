---
title: 【原生javascript项目】Sort without Articles 17
date: 2022-02-14 20:38:39
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第17天的“去除冠词排序”项目。Have fun with the website! ♪(^∇^*)

网页效果： https://janice143.github.io/sortWithoutArticles/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_SortWithoutArticles17.png?raw=true)

## 项目描述

本项目首先给定了一个内容为band名字的列表`bands`，在JS中，对列表进行**特殊的排序**操作，得到新的列表最终以列表的形式显示到网页中。

其中特殊的排序操作，具体来说，是先去除列表元素中"a, an, the"的前缀，然后按照字母排序。排序的列表还是原列表，无需使列表元素去除特定前缀。

#### 项目重点

- 字符串的一些方法
  - `String.prototype.replace()`
  - `String.prototype.trim()`

- 数组的一些方法
  - `Array.prototype.sort()`

- 正则表达式
  - `/^(a |the |an )/i`

## 项目过程

#### HTML部分

-  id 属性为`bands`的ul元素，列表内容在JS中添加

#### JS部分

- 首先提供一个已知列表bands

- 将列表`bands`内容显示到网页中

  ```javascript
  document.querySelector('#bands').innerHTML = bands.map(band => `<li>${band}</li>`).join('');
  ```

- 显示已经实现，下一步我们需要对bands进行一些操作，得到的新列表再按照上述方法显示到网页中。**注意**：无需对原列表bands进行操作，也就是不用改变bands的值

  - 去除前缀

    ```javascript
    function strip(bandName){
        return bandName.replace(/^(a |the |an )/i,'').trim();
    }
    ```

  - 排序

    ```javascript
    const sortedBands = bands.sort(
        function(a,b){
            return strip(a) > strip(b) ? 1 : -1
        }
    )
    ```

程序写到这里就已经ok啦！本项目需要注意的是最后显示的内容还是原bands中的元素，但是排序方式要求去掉前缀后排序。

如果项目要求最后显示的内容是去除前缀的元素，那么下面的程序提供了一个实现思路：

- 去除前缀

  ```javascript
  // 先将bands元素中开头为a|the|an的去掉前缀，返回新的bands
  function newBands(bands){
      return bands.map(band => {
          return band.replace(/^(a |the |an )/i,'').trim();        
      })
  }
  ```

- 排序

  ```javascript
  const sortedBands = newBands(bands).sort()
  ```

## 项目补充

#### [String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

**`replace(pattern,replacement)`** 方法返回一个新字符串，该字符串由`replacement`替换**部分或所有**的`pattern`匹配项后的新字符串。

`pattern`可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，`replacement`可以是一个字符串或者一个每次匹配都要调用的回调函数。

如果`pattern`是字符串，则仅替换第一个匹配项。

原字符串不会改变。

##### 语法

```
str.replace(regexp|substr, newSubStr|function)
```

#### [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

从一个字符串的两端删除**所有**空白字符。

#### [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

```
arr.sort([compareFunction])
```

主要讲讲有`compareFunction`的情况，该函数具有两个参数a,b。

- 如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；

- 如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。

- 如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。

例如比较数字，`compareFunction`函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

```
function compareNumbers(a, b) {
  return a - b;
}
// 也可以这样些
function compareNumbers(a, b) {
  return a > b ? 1 : -1;
}
```

#### [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)的特殊字符 ^

匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。

例如，`/^A/` 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。

#### 参考博客

1. [正则表达式中的特殊字符](https://www.cnblogs.com/louby/p/4882148.html)

> JS30的第17个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

