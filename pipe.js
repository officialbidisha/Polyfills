function pipe(...fns) {
    return function (input) {
      return fns.reduce((acc, curr) => {
        return curr(acc);
      }, input);
    };
  }
  
  function asyncPipe(...fns) {
    return function (input) {
      return fns.reduce((acc, curr) => {
        return acc.then(curr);
      }, Promise.resolve(input));
    };
  }