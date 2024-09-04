function startProgressBar(progressBarId, duration) {
    const progressBar = document.getElementById(progressBarId);
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, duration);
}

// Start the progress bar
startProgressBar('progressBar1', 100);