---
title: 【原生javascript项目】Piano-Kit-01
date: 2021-11-07 19:44:12
tags: 原生javascript项目
categories: 30个原生javascript项目
---

###  引言

本文介绍如何用javascripty语法写一个简单的琴键(drum ang piano)网页，通过敲击特定键盘（音键），可以发出不同音调。

网址为(https://janice143.github.io/musicKit.github.io/)

### 正文

#### 1网页布局与功能

![](https://github.com/janice143/myblog.github.io/blob/master/images/js30_DrumKit01.png?raw=true)

网页整体分为3个部分：

1是最顶上居中排布的乐器切换(Drum Kit, Piano Kit)组块，选中响应的kit，背景图和琴键切换为响应的内容，同时kit字体变为白色；

2是页面居中排布的琴键；

3是背景图。

琴键可以通过鼠标点击或者按下响应的键盘来操作，可以发出对应的音效（黄色字体表示音效的名称）。琴键被点击按下后，加以一定的css动画（黄色高亮边框）来区分。

#### 2实现原理

一、 html代码

1 乐器切换组块：

```html
   <div id="switch">
        <a class="drum chosen" href="#" onclick="addChosenDrum()">Drum Kit</a>
        <a class="piano" href="#" onclick="addChosen()">Piano Kit</a>
   </div>
```

2 Drum Kit:

```HTML

<div id="pianoKit">
    <div data-key="65" class="key1 key" >
        <a href="#" onclick="clickPlaySound(65)">
            <p class="key-ABC">A</p>
            <p class="key-tune">DO</p>
        </a>
    </div>

    <div data-key="83" class="key2 key">
        <a href="#" onclick="clickPlaySound(83)">
            <p class="key-ABC">S</p>
            <p class="key-tune">RE</p>
        </a>

    </div>
    <div data-key="68" class="key3 key">
        <a href="#" onclick="clickPlaySound(68)">
            <p class="key-ABC">D</p>
            <p class="key-tune">MI</p>
        </a>

    </div>
    <div data-key="70" class="key4 key">
        <a href="#" onclick="clickPlaySound(70)">
            <p class="key-ABC">F</p>
            <p class="key-tune">FA</p>
        </a>

    </div>
    <div data-key="71" class="key5 key">
        <a href="#" onclick="clickPlaySound(71)">
            <p class="key-ABC">G</p>
            <p class="key-tune">SOL</p>
        </a>

    </div>
    <div data-key="72" class="key6 key">
        <a href="#" onclick="clickPlaySound(72)">
            <p class="key-ABC">H</p>
            <p class="key-tune">LA</p>
        </a>

    </div>
    <div data-key="74" class="key7 key">
        <a href="#" onclick="clickPlaySound(74)">
            <p class="key-ABC">J</p>
            <p class="key-tune">SI</p>
        </a>

    </div>

    <audio data-key="65" src="sounds/1.MP3"></audio>
    <audio data-key="83" src="sounds/2.MP3"></audio>
    <audio data-key="68" src="sounds/3.MP3"></audio>
    <audio data-key="70" src="sounds/4.MP3"></audio>
    <audio data-key="71" src="sounds/5.MP3"></audio>
    <audio data-key="72" src="sounds/6.MP3"></audio>
    <audio data-key="74" src="sounds/7.MP3"></audio>

</div>
     
```

3 Piano Kit

```html
 <div id="drumKit" class="chosen">
     <div data-key="65" class="key1 key">
         <a href="#1" onclick="clickPlaySound(65)">
             <p class="key-ABC">A</p>
             <p class="key-tune">CLAP</p>
         </a>

     </div>
     <div data-key="83" class="key2 key">
         <a href="#1" onclick="clickPlaySound(83)">
             <p class="key-ABC">S</p>
             <p class="key-tune">HIHAT</p>
         </a>

     </div>
     <div data-key="68" class="key3 key">
         <a href="#1" onclick="clickPlaySound(68)">
             <p class="key-ABC">D</p>
             <p class="key-tune">KICK</p>
         </a>

     </div>
     <div data-key="70" class="key4 key">
         <a href="#1" onclick="clickPlaySound(70)">
             <p class="key-ABC">F</p>
             <p class="key-tune">OPENHAP</p>
         </a>

     </div>
     <div data-key="71" class="key5 key">
         <a href="#1" onclick="clickPlaySound(71)">
             <p class="key-ABC">G</p>
             <p class="key-tune">BOOM</p>
         </a>

     </div>
     <div data-key="72" class="key6 key">
         <a href="#1" onclick="clickPlaySound(72)">
             <p class="key-ABC">H</p>
             <p class="key-tune">RIDE</p>
         </a>

     </div>
     <div data-key="74" class="key7 key">
         <a href="#1" onclick="clickPlaySound(74)">
             <p class="key-ABC">J</p>
             <p class="key-tune">SNARE</p>
         </a>

     </div>
     <div data-key="75" class="key7 key">
         <a href="#1" onclick="clickPlaySound(75)">
             <p class="key-ABC">K</p>
             <p class="key-tune">TOM</p>
         </a>

     </div>
     <div data-key="76" class="key7 key">
         <a href="#1" onclick="clickPlaySound(76)">
             <p class="key-ABC">L</p>
             <p class="key-tune">TINK</p>
         </a>
     </div>
     <audio data-key="65" src="sounds/clap.wav"></audio>
     <audio data-key="83" src="sounds/hihat.wav"></audio>
     <audio data-key="68" src="sounds/kick.wav"></audio>
     <audio data-key="70" src="sounds/openhat.wav"></audio>
     <audio data-key="71" src="sounds/boom.wav"></audio>
     <audio data-key="72" src="sounds/ride.wav"></audio>
     <audio data-key="74" src="sounds/snare.wav"></audio>
     <audio data-key="75" src="sounds/tom.wav"></audio>
     <audio data-key="76" src="sounds/tink.wav"></audio>
</div>
```

二、css代码

1 实现顶部的切换组块（Drum Kit, Piano Kit)固定在窗口的某个位置，不占位置，脱离标准文档流；居中排布

```css
position: fixed;
left:0;  
right:0;  
margin:0 auto; 
```

2 实现琴键居中排布：用Flex 布局实现垂直、水平居中。

[flex用法参考]: https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

任何一个容器都可以指定为 Flex 布局（flex容器），display: flex即可实现。采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"Item"。

容器具有6个属性：

· flex-direction:水平主轴的方向

· flex-wrap:如果主轴拍不下，可以用这个属性来设置换行的形式

· flex-flow:合并了flex-direction 和flex-wrap的功能，用这个属性可以同时设置这两个属性。

· justify-content:定义了item在主轴（水平方向上）的对齐方式

·align-items：定义了item在垂直方向上的对齐方式

· align-content：定义了多跟轴线的对齐方式

```css
#drumKit,#pianoKit{
    /* background-color: red; */
    /* 在需要垂直居中的父元素上，设置display:flex和align-items：center。要求：父元素必须显示设置height值 */
    display: flex;
    flex:1;
    min-height: 90vh; /*vh 就是当前屏幕可见高度的100% 		
    align-items: center; /*子元素水平居中*/
    justify-content: center; /*子元素垂直居中*/
}
```

90vh表示占窗口（当前页面窗口）大小的90%。

3 键盘被点击时，js会添加playing类，其css布局为

```css
.playing{
    transform: scale(1.1);
    border-color: #ffc600;
    box-shadow: 0 0 1rem #ffc600;
}
```

4 drum kit 和piano kit被选中时，js会添加chosen类名。设置css代码让选中字体变为白色以区分

```css
#switch .chosen{
    color:white;
}
```

三、 javascript代码

1 切换键盘(drum kit, piano kit)

对于drum kit：点击drum，添加.chosen，同时去掉piano kit 的.chosen类名；显示drum琴键，隐藏piano琴键；显示响应背景background-image。

```javascript
 // 点击a标签，切换键盘:点击piano键盘，添加chosen class，去掉drum的class; 显示对应的piano键盘;在对应的键盘中添加chosen，这样audio也可以对应
    function addChosen(){
        const chosen =  document.getElementsByClassName("piano");
        const notChosen = document.getElementsByClassName("drum");
        chosen[0].classList.add('chosen');
        notChosen[0].classList.remove('chosen');
        const notChosenKit = document.getElementById("drumKit");
        notChosenKit.classList.remove('chosen');
        notChosenKit.style.display = "none"; 
        const chosenKit = document.getElementById("pianoKit");
        chosenKit.style.display = "flex";
        chosenKit.classList.add('chosen');
        // 换钢琴壁纸
        const wallpaper = document.getElementsByTagName("html");
        wallpaper[0].style.backgroundImage="url(./pianoback.jpg)";
    }
    function addChosenDrum(){
        const chosen =  document.getElementsByClassName("drum");
        const notChosen = document.getElementsByClassName("piano");
        chosen[0].classList.add('chosen');
        notChosen[0].classList.remove('chosen');
        const notChosenKit = document.getElementById("pianoKit");
        notChosenKit.classList.remove('chosen');
        notChosenKit.style.display = "none"; 
        const chosenKit = document.getElementById("drumKit");
        chosenKit.style.display = "flex";
        chosenKit.classList.add('chosen');
        // 换鼓壁纸
        const wallpaper = document.getElementsByTagName("html");
        wallpaper[0].style.backgroundImage="url(./drumback.jpg)";
    }
```

2 键盘敲击琴键，用keycode标注，给对应琴键添加.playing类名。设置audio.play发出音效。

```javascript
// 点击键盘字母时，对应的键添加class属性
function playSound(e){
    const audio = document.querySelector(`.chosen audio[data-key="${e.keyCode}"]`);
    // console.log(audio);
    if (!audio) return;
    const key = document.querySelector(`.chosen div[data-key="${e.keyCode}"]`);
    key.classList.add('playing');//添加playing类属性
    audio.currentTime = 0; //音频重头播放

    audio.play();
}
```

3 如果连续敲击多个琴键，多个琴键都会显示过渡特效（黄色Border,放大1.2倍），为了让最后一个琴键之前的琴键过滤样式去掉，可以利用transitionend事件，让已经过渡的琴键去掉.playing类名。

```javascript
// 去掉playing 类属性
function removeTransition(e){
    if (e.propertyName !='transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key=>key.addEventListener('transitionend',removeTransition));
window.addEventListener('keydown',playSound);

```

4 鼠标点击也可以实现琴键发出音效。设置onclick事件，传入keycode参数。

```javascript
 function clickPlaySound(keycode){
        // data-key=keycode;
        const audio = document.querySelector(`.chosen audio[data-key="${keycode}"]`);
        if (!audio) return;
        const key = document.querySelector(`.chosen div[data-key="${keycode}"]`);
        key.classList.add('playing');//添加playing类属性
        audio.currentTime = 0; //音频重头播放
        audio.play();
        // console.log(audio);
    };

```

### 总结

完整代码放在了[Github]( https://github.com/janice143/musicKit.github.io.git)上，如果读者有兴趣，不妨试一试。

