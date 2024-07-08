function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    let concurrentCount = 0;
    let latestCalledFuncIndex = -1;
    let resultCount = 0;
    let hasError = false;
    const result = [];

    const fetchNext = () => {
      // Termination conditions
      if (resultCount === funcs.length) {
        resolve(result);
        return;
      }

      // If an error has occurred, stop processing
      if (hasError) {
        return;
      }

      // Ensure there is room for another concurrent execution
      while (
        concurrentCount < max &&
        latestCalledFuncIndex < funcs.length - 1
      ) {
        const nextFuncIndex = ++latestCalledFuncIndex;
        const next = funcs[nextFuncIndex];

        concurrentCount += 1;

        next()
          .then((data) => {
            result[nextFuncIndex] = data;
            resultCount += 1;
            concurrentCount -= 1;

            // If all functions have resolved, resolve the main promise
            if (resultCount === funcs.length) {
              resolve(result);
            } else {
              // Fetch the next function
              fetchNext();
            }
          })
          .catch((err) => {
            hasError = true;
            reject(err);
          });

        // Recursively call fetchNext to maintain concurrency level
        fetchNext();
      }
    };

    // Start the first batch of promises
    fetchNext();
  });
}

const funcs = [
  () => new Promise((resolve) => setTimeout(() => resolve('Result 1'), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve('Result 2'), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve('Result 3'), 1500)),
  () => new Promise((resolve) => setTimeout(() => resolve('Result 4'), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve('Result 5'), 2000)),
  () => new Promise((resolve) => setTimeout(() => resolve('Result 6'), 300))
];

const maxConcurrent = 2; // Maximum number of concurrent promises

throttlePromises(funcs, maxConcurrent).then((results) => {
  console.log('All promises resolved:', results);
}).catch((error) => {
  console.error('One of the promises failed:', error);
});
