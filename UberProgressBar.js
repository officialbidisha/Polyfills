const container = document.getElementById("container");
const startButton = document.getElementById("start_btn");
const maxConcurrency = 3;
let runningBars = 0;
const progressQueue = [];

const bars = [
  { duration: 3000, color: "red" },
  { duration: 3000, color: "blue" },
  { duration: 3000, color: "red" },
  { duration: 3000, color: "pink" },
  { duration: 3000, color: "red" },
];

startButton.addEventListener("click", () => {
  if (bars.length > 0) {
    const { duration, color } = bars.shift();
    createLoadingBar(duration, color);
  }
});

function createLoadingBar(duration, color) {
  if (runningBars < maxConcurrency) {
    runningBars++;
    generateBar(duration, color);
  } else {
    progressQueue.push({ duration, color });
  }
}

function generateBar(duration, color) {
  const loadingBar = document.createElement("div");
  loadingBar.classList.add("loading_bar");
  loadingBar.style.backgroundColor = color;
  container.appendChild(loadingBar);

  const startTime = Date.now();

  function updateProgress() {
    const elapsedTime = Date.now() - startTime;
    const progressPercentage = Math.min((elapsedTime / duration) * 100, 100);
    loadingBar.style.width = progressPercentage + "%";

    if (progressPercentage < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      runningBars--;
      if (progressQueue.length > 0) {
        const nextBar = progressQueue.shift();
        createLoadingBar(nextBar.duration, nextBar.color);
      }
    }
  }

  requestAnimationFrame(updateProgress);
}
