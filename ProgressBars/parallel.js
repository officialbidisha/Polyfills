function startProgressBar(progressBarId, duration) {
  let progressBar = document.getElementById(progressBarId);
  let width = 0;
  const interval = setInterval(() => {
    if (width < 100) {
      width++;
      progressBar.style.width = width + "%";
    } else {
      clearInterval(interval);
      console.log(`${progressBarId} completed`);
    }
  }, duration);
}

// Function to start multiple progress bars
function startMultipleProgressBars(progressBars) {
  progressBars.forEach(({ id, duration }) => {
    startProgressBar(id, duration);
  });
}

// Example of running 3 progress bars in parallel
startMultipleProgressBars([
  { id: "pbar1", duration: 10 }, // 1st progress bar
  { id: "pbar2", duration: 20 }, // 2nd progress bar
  { id: "pbar3", duration: 15 }  // 3rd progress bar
]);