let alarmInterval;

function updateTime() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  timeElement.textContent = timeString;

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString(undefined, dateOptions);
  dateElement.textContent = dateString;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function setAlarm() {
  const alarmTimeElement = document.getElementById("alarmTime");
  const alarmTime = alarmTimeElement.value;

  clearInterval(alarmInterval);
  alarmInterval = setInterval(function () {
    const currentTime = new Date();
    const currentTimeString = `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}`;

    if (alarmTime === currentTimeString) {
      playAlarmSound();
      alert("Alarm!");
      clearInterval(alarmInterval);
    }
  }, 1000);
}

let stopwatchInterval;
let stopwatchStartTime;
let stopwatchRunning = false;

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  if (stopwatchRunning) {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }
}

function resetStopwatch() {
  stopStopwatch();
  const stopwatchTimeElement = document.getElementById("stopwatchTime");
  stopwatchTimeElement.textContent = "00:00:00";
}

function updateStopwatch() {
  const stopwatchTimeElement = document.getElementById("stopwatchTime");
  const elapsedMilliseconds = Date.now() - stopwatchStartTime;
  const milliseconds = Math.floor((elapsedMilliseconds % 1000) / 10);
  const seconds = Math.floor((elapsedMilliseconds / 1000) % 60);
  const minutes = Math.floor((elapsedMilliseconds / 1000 / 60) % 60);
  const stopwatchTimeString = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
  stopwatchTimeElement.textContent = stopwatchTimeString;
}

function playAlarmSound() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 500; // Adjust frequency to change the tone

  const gainNode = audio.createGain();
  gainNode.gain.value = 0.5; // Adjust volume

  oscillator.connect(gainNode);
  gainNode.connect(audio.destination);

  oscillator.start();

  setTimeout(function () {
    oscillator.stop();
    audio.close();
  }, 2000); // Adjust duration in milliseconds (2 seconds in this example)
}

setInterval(updateTime, 1000);
