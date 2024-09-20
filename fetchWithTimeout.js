function fetchWithTimeout(url, timeInMilliseconds) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;         // Get the signal from the controller

    const timer = setTimeout(() => {
      controller.abort();                     // Abort the fetch if timeout occurs
    }, timeInMilliseconds);

    fetch(url, { signal })
      .then((res) => {
        clearTimeout(timer);                  // Clear the timeout when fetch succeeds
        resolve(res);                         // Resolve with the response
      })
      .catch((err) => {
        clearTimeout(timer);                  // Clear the timeout in case of error
        if (err.name === 'AbortError') {
          reject(new Error('Request timed out'));  // Handle abort error
        } else {
          reject(err);                             // Handle other errors
        }
      });
  });
}
