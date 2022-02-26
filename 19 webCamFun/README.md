---
title: 【原生javascript项目】WebCam Fun 19
date: 2022-02-16 22:02:13
tags: 原生javascript项目
categories: 30个原生javascript项目
---

> 作者：©[Iaine 万一](https://github.com/janice143?tab=repositories)
> 简介：[30 Day Challenge](https://courses.wesbos.com/account)是 [Wes Bos](https://github.com/wesbos) 设计的一个 30 天原生js编程挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。
>
> 本项目为第19天的“网络摄像头”项目。Have fun with the website! ♪(^∇^*)

源代码：https://github.com/janice143/JavaScript30Program/tree/master/19%20webCamFun/index.html

## 项目描述

通过访问网络摄像头，获取了当前摄像头拍摄的信息，作为`video`元素的内容。`video`元素中的视频信息被定时器一帧一帧绘制在`canvas`元素中。

提供了一个名为`take photo`的按钮用来抓取当前视频帧的内容，该内容最后通过通过创建`a`标签显示在网页中。

#### 项目重点

- `mediaDevices.getUserMedia`
- `video`属性和方法
  - `video.videoWidth`
  - `video.srcObject `
- `setInterval`
- `canvas.toDataURL`
- `HTML DOM setAttribute(属性名，值)`
- `canplay`事件

## 项目过程

#### HTML部分

- 最外层为类名为`photobooth`的`div`元素
  - 作为控件的`div`元素：take photo按钮
  - `canvas`元素用来绘制`video`的视频帧
  - `video`元素用来播放从网络摄像头获取的数据流
- 音频`audio`标签

#### JS部分

JS的大致思路是：

1. 请求调用网络摄像头
2. 摄像头中的数据流给video元素
3. 在canvas上绘制video的内容
4. 点击take photo按钮获取当前canvas上的画面，显示到网页上

- 编写`getVideo`函数：访问网络摄像头的权限,播放视频，放在`video`标签里

  ```javascript
  function getVideo(){
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        console.log(localMediaStream);     
        video.srcObject = localMediaStream;
        video.play();
      })
      .catch(err => {
        console.error(`OH NO!!!`, err);
      });  
  }
  ```

- 把视频信息放到`canvas`中

  - 先获取视频的宽高信息，复制给canvas.width和height，保证canvas上显示视频画面完整（注意这里并不是设置canvas在网页上显示的宽高）

  - `canvas`流畅显示的机制是利用定时器不断获取当前`video`的内容

  - 利用`ctx.drawImage`实现绘制

  ```javascript
  function paintToCanvas(){
      const width = video.videoWidth;
      const height = video.videoHeight;
      canvas.width = width;
      canvas.height = height;
  
      // canvas上显示的机制是利用定时器，将视频中当前帧的图像绘制在canvas上    
      return setInterval(() => {
          ctx.drawImage(video, 0, 0, width, height);
        }, 16);
  }
  video.addEventListener('canplay', paintToCanvas);
  ```

- 编写take photo的点击函数

  - 播放音效
  - 获取当前canvas的data，变成图片
  - 创建元素，显示到网页中

  ```javascript
  function takePhoto(){
       // 播放音频
      snap.currentTime = 0;
      snap.play();
  
      // 获取当前canvas的data，变成图片
      const data = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = data;
      link.setAttribute('download', 'handsome');
      link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
      strip.insertBefore(link, strip.firstChild);
  }
  ```

## 项目补充

#### HTML 音频/视频 DOM `canplay` 事件

当浏览器能够开始播放指定的音频/视频时，触发canplay 事件

#### 常用CSS的长度单位（相对/绝对）

| 单位  | 名称                                                         |
| ----- | ------------------------------------------------------------ |
| `em`  | 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width |
| `rem` | 根元素的字体大小                                             |
| `vw`  | 视窗宽度的1%                                                 |
| `vh`  | 视窗高度的1%                                                 |
| `px`  | 像素                                                         |

#### [navigator.mediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

提示用户允许一个媒体输入（视频、音频等），媒体输入会产生一个mediaStream包换了媒体信息。该方法返回一个promise

**示例**

```javascript
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* use the stream */
})
.catch(function(err) {
  /* handle the error */
});
```

其中`constrains`参数可为`{ audio: true, video: true }`

#### X:after 选择器

在元素内部的后面插入内容。常用来清楚浮动`clear-fix`。

```css
.clearfix:after {  
    content: "";  
    display: block;  
    clear: both;  
    visibility: hidden;  
    font-size: 0;  
    height: 0;  
}   
.clearfix {   
   *display: inline-block;   
   _height: 1%;  
}
```

原理是使用`:after`伪类元素来在元素后增加一个空间，然后清除它。

#### overflow-x

overflow-x 属性规定是否对内容的左/右边缘进行裁剪，如果溢出元素内容区域的话。

overflow-y 属性对上/下边缘的裁剪。

#### a:nth-child(5n+1)

选择第1、6、11...个`a`标签

#### [利用canvas操纵video](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)

获取到video的每一帧内容后，绘制在canavs上。这是显示的第一步，除此之外，还可以做一些进阶，比如将每一帧画面。

```javascript
let pixels = ctx.getImageData(0, 0, width, height);
```

####   JavaScript 定时器

- `setTimeout()`：指定多久时间运行回调函数

```javascript
setTimeout(() => {
  // 2 秒之后运行
}, 2000)
```

`setTimeout` 会返回定时器的 id。 通常不使用它，但是可以保存此 id，并在要删除此安排的函数执行时清除它：

```javascript
const id = setTimeout(() => {
  // 应该在 2 秒之后运行
}, 2000)
// 改变主意了
clearTimeout(id)
```

- `setInterval()`：指定多少时间间隔运行一次回调函数

```javascript
setInterval(() => {
// 每 2 秒运行一次
}, 2000)
```

<u>**问题**：这里如何清除定时器呢？每次触发`video`的`canplay`事件，会执行`paintToCanvas`函数，而该函数可以返回定时器的`id`。如果要清除该定时器，怎么清除呢？</u>

## 参考博客

1. [30个你必须记住的CSS选择符](https://yanhaijing.com/css/2014/01/04/the-30-css-selectors-you-must-memorize/)
2. [探索 JavaScript 定时器](http://nodejs.cn/learn/discover-javascript-timers)
3. [JS设置定时器和清除定时器](https://www.cnblogs.com/chenyoumei/p/12695381.html)

> JS30的第19个项目圆满完成啦，感谢阅读，有问题联系我的邮箱1803105538@qq.com.

