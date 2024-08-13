let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let isRunning = false;

const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        lapButton.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
        lapButton.disabled = true;
        isRunning = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    startPauseButton.textContent = 'Start';
    lapButton.disabled = true;
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    const lapTime = `${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
    millisecondsElement.textContent = pad(milliseconds);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}