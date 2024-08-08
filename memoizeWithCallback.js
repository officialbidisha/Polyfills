function memoize(fn) {
  let cache = {};
  let progressQueues = {};

  return function memoized(...args) {
    let cb = args[args.length - 1];
    let params = args.slice(0, -1);
    let key = JSON.stringify(params);

    if (cache.hasOwnProperty(key)) {
      cb(null, cache[key]);
      return;
    }

    if (!progressQueues[key]) {
      progressQueues[key] = [cb];
    } else {
      progressQueues[key].push(cb);
      return;
    }

    fn(...params, (err, data) => {
      if (err) {
        progressQueues[key].forEach((element) => {
          element(err, null);
        });
      } else {
        cache[key] = data;
        progressQueues[key].forEach((element) => {
          element(null, data);
        });
      }
      delete progressQueues[key];
    });
  };
}

function getSquare(x, cb) {
  console.log("function executed", x);
  setTimeout(() => {
    cb(null, x * x);
  }, 200);
}

let memoizedSquare = memoize(getSquare);

memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16
});
memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16
});
memoizedSquare(5, (err, res) => {
  if (!err) console.log(res); // Should print 25
});
memoizedSquare(6, (err, res) => {
  if (!err) console.log(res); // Should print 36
});
memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16
});
