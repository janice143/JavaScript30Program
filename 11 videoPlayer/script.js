// 获取标签
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');// 获取自定义属性
const ranges = player.querySelectorAll('.player_slider');

// 写自定义函数
// 播放按键
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    console.log(method)
    video[method]();
}
// console.log(video.paused)

// 更新播放键的按键
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}
// 跳过
function skip() {
video.currentTime += parseFloat(this.dataset.skip);
}
// 更新滑块的值
function handleRangeUpdate() {
video[this.name] = this.value;
console.log(this.name)
}
// 更新进度条
function handleProgress() {
const percent = (video.currentTime / video.duration) * 100;
progressBar.style.flexBasis = `${percent}%`;
}
// 鼠标移动进度条
function scrub(e) {
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
video.currentTime = scrubTime;
}



// 添加监听事件

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


