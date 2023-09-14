'use strict'
// 今日の日付を表示
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();
let countDown;

const today = document.getElementById("today").innerHTML = `${year}年${month}月${day}日`;

// タイマーの表示
const timerDisplay = document.getElementById("display_timeLeft");
const endTime = document.getElementById('display_endTime');
const customSeconds = document.getElementById('custom');
const submit = document.getElementById('submit')
const buttons = document.querySelectorAll('[data-time]');

// タイマー関数
function timer(seconds) {
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

        countDown = setInterval(() => {
        const secondLeft = Math.floor((then - Date.now()) / 1000);
        if (secondLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondLeft);
    }, 1000);
}

// タイマー表示
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

// 終了時間表示
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Until ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
// ボタンに設定された時間のタイマーを起動させるための関数
function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// 入力フォームのイベントリスナー
submit.addEventListener('click', function(){
    const mins = customSeconds.value;
    timer(mins * 60);
});