let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapTimes = [];
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lapList');

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime; // Store the elapsed time when stopping
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
        lapButton.disabled = true;
        isRunning = false;
        display.classList.remove('pulse');
    } else {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('stop');
        lapButton.disabled = false;
        isRunning = true;
        display.classList.add('pulse');
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('stop');
    lapButton.disabled = true;
    isRunning = false;
    display.classList.remove('pulse');
    lapTimes = [];
    lapCounter = 1;
    updateLapList();
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime + elapsedTime;
        const previousLapTime = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].totalTime : 0;
        const lapDuration = currentTime - previousLapTime;
        lapTimes.push({ lap: lapCounter++, totalTime: currentTime, lapTime: lapDuration });
        updateLapList();
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    display.textContent = formatTime(currentTime);
}

function formatTime(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    return (
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

function updateLapList() {
    lapList.innerHTML = '';
    lapTimes.forEach((lap) => {
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.innerHTML = `
            <span>Lap ${lap.lap}</span>
            <span>${formatTime(lap.lapTime)}</span>
            <span>${formatTime(lap.totalTime)}</span>
        `;
        lapList.prepend(lapItem);
    });
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);