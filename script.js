let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(Date.now() - startTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.appendChild(li);
  }
}

function updateTime() {
  const time = Date.now() - startTime;
  display.textContent = formatTime(time);
}

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const seconds = Math.floor(totalCentiseconds / 100) % 60;
  const minutes = Math.floor(totalCentiseconds / 6000) % 60;
  const hours = Math.floor(totalCentiseconds / 360000);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, "0");
}
