function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // Wrap in a Promise so we can resolve/reject properly
  return new Promise((resolve, reject) => {
    function tryFetched(remainingRetries) {
      // Call the fetcher (if it's a function that returns a promise)
      fetcher().then((res) => {
        resolve(res);
      }).catch((err) => {
        if (remainingRetries > 0) {
          tryFetched(remainingRetries - 1); // Retry with decremented count
        } else {
          reject(err); // No retries left, reject with the error
        }
      });
    }
    
    // Start the initial fetch attempt
    tryFetched(maximumRetryCount);
  });
}
function fetcher(){
    return new Promise((resolve, reject)=> {
       reject(100);
    })
}
fetchPromiseWithRetry(fetcher, 3).then((res)=> {
console.log(res);
}).catch((E)=> console.log(E.message));
