---
title: 【原生javascript项目】Countdown Timer 29
date: 2022-03-11 21:16:13
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第28天的“倒计时计时器”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/29%20CountdownTimer/index.htm



**本项目的笔记内容选自 [大史不说话](https://github.com/dashnowords)**，他本人是JS30社区里的知名参与者，他的全部笔记在[这里](https://github.com/soyaine/JavaScript30)。

本项目的笔记在[这里](https://github.com/soyaine/JavaScript30/tree/master/29%20-%20Countdown%20Timer)。





## 挑战任务

初始文档`index-start.html`中提供了一个倒计时控制器，从`html`文档的结构可以看出，顶部的按钮可以用来增加倒计时时间，常用的时间间隔已将参数绑定在`data-time`属性上;`display`类用来显示计时的结果。
本次编程挑战的任务是通过javascript代码基于当前时间生成一个倒计时，将`结束时间`和`剩余时间`分别显示在`diaplay__time-left`类标签和`display__end-time`类标签上。

## 实现效果

[![结果展示](https://github.com/soyaine/JavaScript30/raw/master/29%20-%20Countdown%20Timer/effect.png)](https://github.com/soyaine/JavaScript30/blob/master/29 - Countdown Timer/effect.png)

## 编程思路

监听按点击事件`click`来为倒计时增加时间，使用`setInterval`函数每秒执行判断函数，若倒计时事件到，则清除当前计时器，若时间未到，则计算并刷新页面上应该显示的时间。

## 过程指南

1.定义变量及获取需要操作的DOM元素的引用。

```
const endTime  = document.querySelector(".display__end-time");
const leftTime = document.querySelector(".display__time-left");
const buttons = document.querySelectorAll("button");
const date = new Date();
var left = 0;//剩余时间
var end = 0;//结束时间
var timer;//interval计时器
leftTime.innerHTML = left;//未操作时，剩余时间显示0
```

2.为button绑定点击事件，当按钮点击时执行对应的回调函数。

```
const arr = Array.from(buttons);
arr.map(function(item){
    item.addEventListener('click',clickAction);
});
```

3.监听表单的提交事件,注意表单的调用方式。

```
document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	updateTime(this.minutes.value*60);
	updateTimer();
});
```

4.点击后的回调函数中取得点击按钮传递的秒数，调用`updateTime()`函数更新页面显示结果，并调用`updateTimer()`来更新计时器相关动作.

```
function clickAction(e){
	let deltaTime;
	   	deltaTime = this.dataset.time;//取得data-time属性的值
	   	updateTime(deltaTime);

        //点击后更新计时器
        updateTimer();
}
```

5.`updateTime()`函数用来更新和页面相关的显示信息。

```
 function updateTime(delta){
	    left = left + parseInt(delta,0);
        end = date.getTime() + left*1000;
        leftTime.innerHTML = left;
        endTime.innerHTML =new Date(end).toLocaleTimeString();
}
```

6.`updateTimer()`函数用来执行和设定每秒检查计时器是否需要继续工作的逻辑判断。

```
function updateTimer(){
	//清除以前的timer,如果不清除，新生成的定时器会和以前的定时器叠加在一起，均会生效。
	if(timer){
		clearInterval(timer);
	}

    // 设置新的Timer
    timer = setInterval(function(){
	if(left == 0){
		endTime.innerHTML = 'End';
        clearInterval(timer);
	}else{
		left -= 1;
		leftTime.innerHTML = left;
	}
},1000);
}
```

## 延伸思考

本次代码中前后会定义定时器和清除定时器，另一种做法是定时器一直工作不清除，对应的按钮和表单只修改时间，不用调整定时器，当值发生变化后，下一秒定时器检测时就会开始倒计时，这样代码逻辑上会有所简化，感兴趣的朋友可以自行练习。

> JS30的第29个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.
