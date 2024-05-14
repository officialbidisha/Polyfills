function sequence(funcs) {
  const promiseFuncs = funcs.map(promisify);

  return function (callback, input) {
    // Use reduce to chain promises sequentially
    promiseFuncs
      .reduce((chain, promiseFunc) => {
        return chain.then((data) => promiseFunc(data));
      }, Promise.resolve(input)) // Start with a resolved Promise for initial input
      .then((data) => callback(null, data)) // Call callback with resolved data
      .catch((error) => callback(error)); // Handle any errors
  };
}

function promisify(callback) {
  return function (input) {
    return new Promise((resolve, reject) => {
      callback((err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      }, input);
    });
  };
}
const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};
const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
