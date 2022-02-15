---
title: 【原生javascript项目】 Fun dictionary 06
date: 2022-01-06 00:20:45
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：30-day vanilla js coding challenge [(30 Day Challenge)](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。本项目属于第6天项目，为了更有挑战性，我尝试实现了 **单词查找** 的功能。
>
>  Have fun with the website! ♪(^∇^*)
>
> 网页效果：https://janice143.github.io/funDictionary/

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Dick.png?raw=true)

## 项目描述

在输入框中输入一个单词，会实时匹配现有词库中所有包含该字段的单词（以一定的样式展示），每个单词中，会高亮显示出文本输入框中输入的字段。词库为[json数据](https://gist.githubusercontent.com/BideoWego/60fbd40d5d1f0f1beca11ba95221dd38/raw/58fb4cce910fbf5fa67a2f0f1f619c09d7b1b373/dictionary.json)，在加载页面时，异步获取而来。

项目主要知识点包括：

- 异步操作
- 数组Array对象的一些方法
- 正则表达式
- CSS transform的一些属性

## 项目过程

#### html部分

设置input标签用来输入单词，ul标签（列表标签）用来展示搜索的结果

#### JS部分

1. 空数组直接赋值给一个`dict`变量，用来存储json数据中的词库
2. 使用fetch 方法从网络中异步获取资源，解析 JSON 数据，存入数组`dict`
3. 利用 filter() 方法查找单词`wordToMatch`，筛选的条件是正则表达式，如果string的match(regex)方法返回不是空，则filter函数返回词库中所有wordToMatch字段的单词
   - 运用 `filter()` 过滤数组数据
   - 创建正则表达式，构造过滤条件
   - match方法匹配
4. 编写匹配输入的函数。在Html中显示匹配的单词，利用map方法按照原始数组元素顺序依次处理元素。
   - 获取匹配数据
   - 替换关键词放入高亮的标签
   - 构造 HTML 标签数据
   - 将匹配值的 HTML 标签放入 `<ul>` 中
5. 编写展示匹配结果的函数
   - 获取匹配数据
   - 利用map方法依次处理元素，替换关键词放入高亮的标签，返回html标签数据
   - 将匹配值的 HTML 标签放入 `<ul>` 中
6. 获取两个主要 HTML 元素（`<input>`，`<ul>`），给 `<input>` 添加事件监听（`change`, `keyup`）

#### CSS部分

CSS**`transform`**属性允许旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

## 项目知识点

#### 异步操作

概念：程序执行任务时分两段进行，执行第一段任务后，执行其他任务，其他任务执行完后接着执行第二段任务。

异步操作的方法：

- 回调函数多重嵌套

缺点：出现多重嵌套，代码很容易乱成一团，无法管理，出现callback hell。

**示例:** 读取A文件之后，再读取B文件，之后再回到读取A文件后的操作。

```javascript
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  });
});
```

- Promise

它不是新的语法功能，而是一种新的写法。代码从横向发展，变成纵向发展。Promise提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

```javascript
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});
```

参考文档：https://wiki.jikexueyuan.com/project/es6/async.html#:~:text=%E6%89%80%E8%B0%93%22%E5%BC%82%E6%AD%A5%22%EF%BC%8C%E7%AE%80%E5%8D%95%E8%AF%B4,%E7%9A%84%E6%89%A7%E8%A1%8C%EF%BC%8C%E5%B0%B1%E5%8F%AB%E5%81%9A%E5%BC%82%E6%AD%A5%E3%80%82

#### fetch

属于Fetch API的一个全局方法。需要接受 `url` 作为参数，返回值是一个 Promise 对象。若请求成功，这个对象包含了（对应 Request 的）Response，但这只是一个 HTTP 响应。

一个基本的 fetch 请求设置代码如下：

```javascript
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

这里通过网络获取一个 JSON 文件并将其打印到控制台。最简单的用法是只提供一个参数用来指明想 `fetch()` 到的资源路径，然后返回一个包含响应结果的 promise（一个 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象）。

当然它只是一个 HTTP 响应，而不是真的 JSON。为了获取JSON的内容，我们需要使用 [`json()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/json) 方法（该方法返回一个将响应 body 解析成 JSON 的 promise）。

#### 对象转换为数组

获取的资源data为对象类型，

``{a: 'The first letter of the English and of many other …tury, wasa sound of the quality of ä (as in far).', ab: 'The fifth month of the Jewish year according to th…putation,coinciding nearly with August. W. Smith.', aback: 'Backward against the mast;-said of the sails when …uddenly checked, baffled, ordiscomfited. Dickens.', abaft: 'Behind; toward the stern from; as, abaft the wheelhouse. Abaftthe beam. See under Beam.', abalone: 'A univalve mollusk of the genus Haliotis. The shel…oast of California, clingingclosely to the rocks.', …}`

想要转换为数组：

`[0:{a: 'The first letter of the English and of many other …tury, wasa sound of the quality of ä (as in far).'}`

`1:{ab: 'The fifth month of the Jewish year according to th…putation,coinciding nearly with August. W. Smith.'}]`

代码参考链接：https://juejin.cn/post/6844903602478120967

```javascript
data => Object.keys(data).forEach(v => {
    let o = {};
    o[v] = data[v];
    dict.push(o);
})
```

Object.keys方法是JavaScript中用于遍历对象属性的一个方法 。它传入的参数是一个对象，返回的是一个数组，数组中包含的是该对象所有的属性名。

#### 正则表达式

概念：匹配字符串的字符组合模式

创建一个正则表达式有两种方法：

1 使用正则表达式字面量，包含在斜杠之间

2 调用`RegExp`对象的构造函数

知识参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

正则表达式可以被用于 `RegExp` 的 [`exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 和 [test (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) 方法以及 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 [match (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)、[`replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)、[search (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search) 和 [split (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法。其中match方法是一个在字符串中执行查找匹配的String方法，返回一个数组，在未匹配到时会返回 null。

```
// 匹配单词
    function findWords(wordToMatch,dict){
        return dict.filter(word =>{
            const regex  = new RegExp(wordToMatch,'gi');// g:global,i:intensive          
            if (Object.keys(word)[0].match(regex))
                return word[Object.keys(word)[0]];
           })
    };
```

#### 一些数组和对象方法

17个实用的JavaScript数组和对象的方法：https://segmentfault.com/a/1190000015301183

- .filter()
  创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
- .map()
  创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
- .reduce()
  对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
- .forEach()
  对数组的每个元素执行一次提供的函数。
- .some()
  判断数组中的某些元素是否通过由提供的函数实现的测试。
- .every()
  检查是否数组中的每个值都满足条件。
- .includes()
  检查是否一个数组包含一个确定的值。
- Array.from()
  这是一个可以从其他数组或者字符串中创造新array的方法。
- Objects.values()
  返回一个由给定对象自己的所有可枚举属性值的数组。
- Objects.keys()
  返回一个由给定对象的自身可枚举属性组成的数组。
- Object.entries()
  返回一个由一个给定对象的键值对组成的数组。
- Array spread
  在数组中使用扩展运算符（…）可以展开数组中的元素。
- Object spread
  扩展对象允许为一个没有更改的对象添加新的属性和方法（换句话说，创建了一个新对象)
- Object.freeze()
  防止修改现有的对象属性或者向对象添加新的属性和值。
- Object.seal()
  停止将任何新属性添加到对象，但仍允许更改现有属性。
- Object.assign()
  允许将对象组合在一起。

> 想把我的技术文章写好一点，特意参考其他优秀人的文档，感谢[未枝丫](https://github.com/soyaine)，我觉得他的文档写的不错，特意模仿，顺便挂上他的JS30挑战项目[链接](https://github.com/soyaine/JavaScript30/tree/master/06%20-%20Type%20Ahead)。
>
> 感谢阅读，有问题联系我的邮箱1803105538@qq.com.



















