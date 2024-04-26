function sequence(funcs) {
  return function (finalCallback, initialData) {
    /**
     * We call this callNextFunc for funcs.len times
     * initially this callNextFunc is called with initial data
     * and after that it is called repeatedly
     */
    let index = 0;
    const callNextFunc = (data) => {
      if (index === funcs.length) {
        // think about the asyncTimes4 function call
        finalCallback(null, data);
        return;
      }
      const func = funcs[index];
      index++;
      let cb = (error, data) => {
        if (error) {
          finalCallback(error, undefined);
        } else {
          callNextFunc(data);
        }
      };
      // asyncTimes2
      func(cb, data);
    };
    callNextFunc(initialData);
  };
}
const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};
const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
