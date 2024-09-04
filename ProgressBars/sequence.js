function startProgressBar(progressBarId, totalDuration) {
    return new Promise((resolve) => {
      let progressBar = document.getElementById(progressBarId);
      let width = 0;
      let intervalDuration = totalDuration / 100;
  
      const interval = setInterval(() => {
        if (width < 100) {
          width++;
          progressBar.style.width = width + "%";
        } else {
          clearInterval(interval);
          resolve(); // Resolve when the progress bar reaches 100%
        }
      }, intervalDuration);
    });
  }
  
  async function runProgressBarsSequentially(progressBars) {
    for (const { id, duration } of progressBars) {
      await startProgressBar(id, duration);
    }
    console.log("All progress bars completed");
  }
  
  // Array of progress bar IDs and durations
  const progressBars = [
    { id: "pbar1", duration: 1000 }, // 1 second
    { id: "pbar2", duration: 1500 }, // 1.5 seconds
    { id: "pbar3", duration: 2000 }, // 2 seconds
  ];
  
  // Start the sequence
  runProgressBarsSequentially(progressBars);