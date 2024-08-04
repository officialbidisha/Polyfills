let container = document.getElementsByClassName("container")?.[0];
let btn = document.getElementsByClassName("btn")?.[0];
let progressQueue = [];
let isAnimating = false;

btn.addEventListener("click", startLoadingBar);

function startLoadingBar() {
  progressQueue.push(3);
  processQueue();
}

function createLoadingBar(duration) {
  // Create a div
  const loadingBar = document.createElement("div");
  loadingBar.classList.add("loadingBar");

  // Append the div to the DOM
  container.appendChild(loadingBar);

  // Set the dynamic transition duration
  loadingBar.style.transitionDuration = duration + "s";
  loadingBar.style.backgroundColor = "red";

  // Start the animation after a short delay to ensure the element is in the DOM
  setTimeout(() => {
    loadingBar.style.width = "100%";
  }, 10); // Small delay to ensure smooth transition

  // Add an event listener for when the transition ends
  loadingBar.addEventListener("transitionend", onTransitionEnd);
}

function onTransitionEnd(event) {
  // Remove the event listener to avoid multiple triggers
  event.target.removeEventListener("transitionend", onTransitionEnd);

  // Reset the flag and process the next item in the queue
  if (isAnimating) {
    isAnimating = false;
    processQueue();
  }
}

function processQueue() {
  if (isAnimating || progressQueue.length === 0) {
    return;
  }
  isAnimating = true;

  const duration = progressQueue.shift();
  createLoadingBar(duration);
}
