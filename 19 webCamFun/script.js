const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// 访问网络摄像头的权限,播放视频，放在video标签里
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

// 视频信息放到canvas中
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    console.log(height,width);

    // canvas上显示的机制是利用定时器，将视频中当前帧的图像绘制在canvas上    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // 取出每一帧的画面
        // let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);
    
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
    
        // pixels = greenScreen(pixels);
        // put them back
        // ctx.putImageData(pixels, 0, 0);
      }, 16);
}

// 
function takePhoto(){
    // console.log("拍照了");
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
getVideo();

video.addEventListener('canplay', paintToCanvas);



