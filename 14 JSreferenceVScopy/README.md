---
title: 【原生javascript项目】Reference VS copy 14
date: 2022-01-31 20:10:10
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第14天的“JS中引用和复制区别”项目。Have fun with the website! ♪(^∇^*)

## 项目描述

本项目主要是在javascript中对比引用和复制变量的区别，效果在console（控制台）中显示。

#### 项目重点

- 对于基础类型的值，存储的是值
  - number
  - string
  - boolean
- 对于复杂类型的值，存储的是引用（指针）
  - arr
  - object
  - regx

- 对于复杂类型的值，如果实现复制
  - arr
    - Array.prototype.slice()
    - Array.prototype.concat()
    -  ES6 扩展语法
    - Array.from()
  - 对象
    - Object.assign()
    - JSON 转换

## 项目过程

#### JS部分

- 首先从 String、Number、Boolean 类型的值开始。

```javascript
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100
```

改动age不会影响age2。

- 对于数组

```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log(players, team);
team[3] = 'Lux';
console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
```

 对数组进行和Number类型相同的复制操作，发现改动team会改变players。

**结论**：基础类型（number,string,boolean）将内容直接存储在**栈**中（大小固定位置连续的存储空间），记录的是该数据类型的值，即直接访问，基础类型赋值是复制（copy）； 

复杂类型（object即广义的对象类型（arr,object,regx））将内容存储在堆中，堆所对应的栈中记录的是**指针**（堆的地址），外部访问时先引出地址，再通过地址去找到值所存放的位置。复杂类型赋值是地址引用。

- 数组的复制

  - 方法一 Array.prototype.slice()

  ```javascript
  const team2 = players.slice();
  team2[3] = 'Lux2';
  console.log(players, team2);
  ```

  - 方法二 Array.prototype.concat()

  ```javascript
  const team3 = [].concat(players);
  team3[3] = 'Lux3';
  console.log(players, team3); 
  ```

  - 方法三 ES6 扩展语法

  ```javascript
  const team4 = [...players];
  team4[3] = 'Lux4';
  console.log(players, team4);
  ```
  - 方法四 Array.from()

  ```javascript
  const team5 = Array.from(players);
  team5[3] = 'Lux5';
  console.log(players, team5);
  ```

- 对象的复制

  - 方法一 Object.assign()

    ```javascript
    const person = {
       name: 'Wes Bos',
       age: 80
     };
    const cap2 = Object.assign({}, person, { number: 99, age: 12 });
    console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
    ```

  - 方法二 JSON 转换

    ```javascript
    const wes = {
      name: 'Wes',
      age: 100,
      social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
      }
    };
    const dev = Object.assign({}, wes);
    const dev2 = JSON.parse(JSON.stringify(wes));
    console.log(wes);
    console.log(dev);
    console.log(dev2);
    ```

## 项目补充

#### ES6扩展运算符

符号：`...`

作用：将数组或对象进行展开

例如，对于数组arr=[1,2,3]

console.log(...arr)相当于for循环把arr中每个元素打印一下。

#### 参考博客

1 [js 值引用和值复制](https://segmentfault.com/a/1190000015411195)

2 [对象引用和复制]( https://zh.javascript.info/object-copy)

3 [总结 ES6 扩展运算符（...）](https://segmentfault.com/a/1190000020259974)

4 [未枝丫](https://github.com/soyaine)的[JS30博客](https://github.com/soyaine/JavaScript30/tree/master/14%20-%20JavaScript%20References%20VS%20Copying)

> JS30的第14个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

