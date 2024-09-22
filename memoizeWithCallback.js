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
/**
* Some unrealistic expectation from a stupid shithead of uber panel lol
*/
function generateKey(args) {
  return args.map(arg => {
    if (arg === null) return 'null';
    if (typeof arg === 'undefined') return 'undefined';
    if (typeof arg === 'function') return arg.toString(); // Serialize function
    if (typeof arg === 'object') return stableStringify(arg); // Use stable stringify for objects
    return String(arg); // Handle primitives
  }).join('|'); // Join with a separator
}

// Stable stringify function to ensure consistent key generation
function stableStringify(obj) {
  if (obj === null) return 'null';
  if (typeof obj !== 'object') return String(obj);
  
  const keys = Object.keys(obj).sort(); // Sort keys to maintain order
  const sortedObj = {};
  for (const key of keys) {
    sortedObj[key] = stableStringify(obj[key]); // Recursively stringify values
  }
  return JSON.stringify(sortedObj); // Convert to string
}
