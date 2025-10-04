document.addEventListener("DOMContentLoaded", () => {
  // elements
  const display = document.getElementById("display");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const resetBtn = document.getElementById("reset");
  const lapBtn = document.getElementById("lap");
  const themeBtn = document.getElementById("theme");
  const lapsList = document.getElementById("laps");
  const body = document.body;

  // timer state
  let timer;
  let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
  let running = false;
  let lapCounter = 0;

  function updateDisplay() {
    const h = hours < 10 ? "0" + hours : hours;
    const m = minutes < 10 ? "0" + minutes : minutes;
    const s = seconds < 10 ? "0" + seconds : seconds;
    const ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    display.textContent = `${h}:${m}:${s}.${ms}`;
  }

  function startTimer() {
    if (!running) {
      running = true;
      timer = setInterval(() => {
        milliseconds++;
        if (milliseconds === 100) {
          milliseconds = 0;
          seconds++;
        }
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        updateDisplay();
      }, 10);
    }
  }

  function stopTimer() {
    clearInterval(timer);
    running = false;
  }

  function resetTimer() {
    clearInterval(timer);
    running = false;
    milliseconds = seconds = minutes = hours = 0;
    lapCounter = 0;
    updateDisplay();
    lapsList.innerHTML = "";
  }

  function recordLap() {
    if (!running) return;
    lapCounter++;
    const li = document.createElement("li");

    const left = document.createElement("span");
    left.textContent = `Lap ${lapCounter}`;

    const right = document.createElement("span");
    right.textContent = display.textContent;

    li.appendChild(left);
    li.appendChild(right);

    lapsList.appendChild(li);

    // auto-scroll to newest lap
    lapsList.scrollTop = lapsList.scrollHeight;
  }

  // Event listeners
  startBtn.addEventListener("click", startTimer);
  stopBtn.addEventListener("click", stopTimer);
  resetBtn.addEventListener("click", resetTimer);
  lapBtn.addEventListener("click", recordLap);

  // theme persistence (localStorage)
  const savedTheme = localStorage.getItem("stopwatch-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeBtn.textContent = "☀️";
  } else {
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
  }

  themeBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-theme");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("stopwatch-theme", isDark ? "dark" : "light");
  });

  // initialize display
  updateDisplay();
});
