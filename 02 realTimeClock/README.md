---
title: 【原生javascript项目】Real time clock 02
date: 2021-11-12 14:46:15
tags: 原生javascript项目
categories: 30个原生javascript项目
---

### 引言

本文利用javascript写一个实时显示时间的时钟特效网页。

网址为(https://janice143.github.io/realTImeClock/)

### 正文

#### 1网页布局与功能

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_Clock.png?raw=true)

网页主体为一个时钟，具有表盘（12个数字）和三个指针（时针、分针、秒针）。

#### 2实现原理

一、 html代码

使用一个类名为clock为的div容器，里面包含时针.hour-hand,分针.minute-hand,秒针second-hand，以及12个数字。

```html
<div class="clock">
    <div class="hour-hand hand"></div>
    <div class="minute-hand hand"></div>
    <div class="second-hand hand"></div>
    <div class="number">
        <span class="num12">12</span>
        <span class="num1">1</span>
        <span class="num2">2</span>
        <span class="num3">3</span>
        <span class="num4">4</span>

        <span class="num5">5</span>
        <span class="num6">6</span>
        <span class="num7">7</span>
        <span class="num8">8</span>

        <span class="num9">9</span>
        <span class="num10">10</span>
        <span class="num11">11</span>

    </div>
</div>
```

二、css代码

1 先让时钟显示在页面的中部（垂直居中，水平居中），这可以用个在clock的上一级词main中设置flex容器。

```css
#main{

    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;

}
```

2 时钟的表盘的样式

```css
.clock{
    width: 300px;
    height: 300px;
    border-radius: 300px;
    border: 20px solid white;
    position: relative;
}
```

3 指针的样式

指针旋转的特效是由transfrom：rotate(deg)实现的（本文这里是通过js代码后面再设置的）。transform-origin默认是50%，元素会绕着中间旋转，设置成100%后，元素绕着一端旋转。transition-timing-function是设置过渡的时间函数特效，不设置是默认均匀地过渡。

```css
.hand{
    width: 120px;
    height: 6px;
    background-color: blueviolet;
    position:absolute;
    top:148px;
    right: 148px;
    transform-origin: 100%;
    transition:all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}
.hour-hand{
    width: 100px;
}
.second-hand{
    height: 4px;
}
```

4 12个数字的样式

先给数字设置相对定位，相对于上一级.number。然后再给每个数字设置相应的top和left. 数字位置算法为：

  num=2;   top=135*sin((num-3)*30/180*pi)+135；  left=135*cos((num-3)*30/180*pi)+135 （num为1-12的数字）

```css
.number{
    width: 300px;
    height:300px;
    font-size: 15px;


    position:absolute;
    top:0px;
    right: 0px;
}

```

三、 javascript代码

分别获取时针、分钟、秒针的类名，然后通过当前时间给三个指针分配正确的旋转角度。

1 秒针： parseInt(second/60*360)+90;

2 分针： parseInt(minute/(60)*360+second/10)+90;

3 时针：parseInt(hour/(12)*360+minute/(60)*30)+90;

+90度是因为设置指针css样式的时候，指针都在指在9点钟的位置，+90度可让指针从12点为起始点旋转。

设置为指针的角度后，利用定时器每隔一秒刷新指针的位置，这样就可以达到实时显示的效果。

当指针转弯一圈后，重新运行设置时间函数 setDate()重置指针的角度。

```javascript
  // 获取指针的transform样式，从而让其旋转
        const secondHand = document.querySelector('.second-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const hourHand = document.querySelector('.hour-hand');

        const audio = document.querySelector('audio');
        // 获取当前时间，从时间里设置指针
        function setDate(){
            const time = new Date();
            const second = time.getSeconds();
            const secondDeg = parseInt(second/60*360)+90;
            secondHand.style.transform = `rotate(${secondDeg}deg)`;

            const minute= time.getMinutes();
            const minuteDeg = parseInt(minute/(60)*360+second/10)+90;
            minuteHand.style.transform = `rotate(${minuteDeg}deg)`;

            const hour= time.getHours();
            const hourDeg = parseInt(hour/(12)*360+minute/(60)*30)+90;
            hourHand.style.transform = `rotate(${hourDeg}deg)`;
            
        }
        // 设置定时器美隔一秒时间进行刷新页面
        setInterval(setDate,1000);
        // 
        setDate(); // 当指针转一圈后，重置度数

```

### 总结

完整代码放在了[Github](https://github.com/janice143/realTImeClock)上，如果读者有兴趣，不妨试一试。

