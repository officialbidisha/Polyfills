class LRUCache {
  constructor(limit) {
    this.cache = new Map();
    this.limit = limit;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.limit) {
      // Remove the least recently used item (first item in the Map)
      console.log("----LAST VALUE----", this.cache.keys().next());
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
}

function getSquare(x, cb) {
   console.log('function executed', x);
  setTimeout(() => {
    cb(null, x * x);
  }, 200);
}

function memoize(fn, cacheLimit) {
  let lru = new LRUCache(cacheLimit);
  return function memoized(...args) {
    let cb = args[args.length - 1];
    let params = args.slice(0, -1);
    let key = JSON.stringify(params);
    let cachedPromise = lru.get(key);
    if (!cachedPromise) {
      cachedPromise = new Promise((resolve, reject) => {
        fn(...params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      lru.set(key, cachedPromise);
    }

    cachedPromise
      .then((res) => {
        cb(null, res);
      })
      .catch((err) => {
        cb(err, null);
      });
  };
}

let memoizedSquare = memoize(getSquare, 3);

memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16 and "---CALLED FROM HERE---"
});
memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16
});
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
memoizedSquare(7, (err, res) => {
  if (!err) console.log(res); // Should print 16
});
memoizedSquare(8, (err, res) => {
  if (!err) console.log(res); // Should print 16
});

memoizedSquare(4, (err, res) => {
  if (!err) console.log(res); // Should print 16 and "---CALLED FROM HERE---"
});
