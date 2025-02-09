const display = document.querySelector('.display');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');
const lapContainer = document.querySelector('.lap-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function startTimer() {
    if (!timerInterval) {
        if (elapsedTime === 0) {  
            display.textContent = "00:00:00"; 
        }
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = Date.now() - startTime;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps = [];
    lapContainer.innerHTML = "";
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (timerInterval) {
        let lapTime = elapsedTime;
        laps.push(lapTime);
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${laps.length}: ${display.textContent}`;
        lapContainer.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
