 function memoize(fn, resolver) {
  let cache = {};
  return function memoized(...args) {
    let callback = args[args.length - 1];
    let params = args.slice(0, -1);
    let key = resolver ? resolver(...params) : JSON.stringify(params);

    if (cache.hasOwnProperty(key)) {
      cache[key].then(result => callback(null, result)).catch(err => callback(err, null));
    } else {
      console.log("---CALLED FROM HERE---");
      cache[key] = new Promise((resolve, reject) => {
        fn(...params, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      cache[key].then(result => callback(null, result)).catch(err => callback(err, null));
    }
  };
}

function getSquare(x, cb) {
  setTimeout(() => {
    cb(null, x * x);
  }, 200);
}

let memoizedSquare = memoize(getSquare);

setTimeout(() => {
  memoizedSquare(4, (err, res) => {
    if (!err) console.log(res); // Should print 16 and "---CALLED FROM HERE---"
  });
  memoizedSquare(4, (err, res) => {
    if (!err) console.log(res); // Should print 16
  });
  memoizedSquare(4, (err, res) => {
    if (!err) console.log(res); // Should print 16
  });
}, 3000);
