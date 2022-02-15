---
title: 【原生javascript项目】数组操作 04
date: 2021-11-15 19:30:39
tags: 原生javascript项目
categories: 30个原生javascript项目
---

### 引言

本文介绍一下数组操作的一些常用方法。

### 正文

#### 1创建数组

```javascript
const people = [
'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];
```

#### 2 获取数组长度

```javascript
console.log(people.length);
```

#### 3循环

```javascript
people.forEach(function(item,index){
    console.log(item,index);
})
```

#### 4 数据尾部添加一个元素

```javascript
let newLength = people.push('Wheeler, Ben');// newLength的结果是people的长度，不是新添加的元素内容
console.log(people.length);
```

#### 5 从尾部删除一个元素

```javascript
let last = people.pop();
console.log(people.length);
```

#### 6 从头部删除一个元素

```javascript
let first = people.shift();
console.log(people.length);
```

#### 7 从提添加一个新元素

```javascript
let firstItem = people.unshift('Bernhard, Sandra');
console.log(people);
```

#### 8 寻找下标 

```javascript
let pos = people.indexOf('Blair, Tony');
console.log(pos);
```

#### 9 根据下标删除元素

```javascript
let removeItem = people.splice(pos,1);//参数1表示Pos下标后多少个
console.log(removeItem);
```

#### 10 复制数组

```javascript
// 复制数组 1
let newPeople1 = people; //people和newPeople1指向同一个内存
// 复制数组 2
let newPeople2 = people.slice(); // people和newPeople1指向不同一个内存
```

#### 11 Index超出数组长度

```javascript
people[100] = 'bbb';
console.log(people);
```

#### 12 Array.prototype.filter() 过滤

```javascript
const fifteen = inventors.filter(inventor=>(inventor.year>=1500 && inventor.year < 1600));
console.table(fifteen);
```

#### 13 Array.prototype.map()

```javascript

const fullNames = inventors.map(inventor => (inventor.first + ' ' + inventor.last));
const fullNames2 = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log(fullNames);
console.log(fullNames2);
```

#### 14  Array.prototype.sort()

```javascript
// 升序
const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1);
console.table(ordered);
// 降序
const oldest = inventors.sort(function(a,b){
    const lastInventor = a.passed - a.year;
    const nextInventor = b.passed - b.year;
    return lastInventor > nextInventor ? -1:1;
});
console.table(oldest);
```

#### 15 Array.prototype.reduce() 结果返回单个值

```javascript
// Array.prototype.reduce() 结果返回单个值
const totalYears = inventors.reduce((total,inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0); // 0表示返回的单个值再加上0
console.log(totalYears);
            
```

### 结论

完整代码放在了[Github](https://github.com/janice143/arrayOperation)上，如果读者有兴趣，不妨试一试。

