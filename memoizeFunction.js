/**
* Simple Memoize
*/
function memoize(fn) {
  const cache = new Map(); // A Map to store the results

  return function (...args) {
    const key = JSON.stringify(args); // Convert arguments to a unique key (string)

    if (cache.has(key)) {
      console.log("Fetching from cache");
      return cache.get(key); // Return cached result if available
    }

    console.log("Calculating result");
    const result = fn(...args); // Call the original function
    cache.set(key, result); // Store the result in the cache
    return result;
  };
}


/**
* Complicated memoize,
*/

// when resolver is given to be the array from arghuments.join

function memo(func, resolver) {
  const cache = new Map();
  return function(...args) {
    const cacheKey = resolver? resolver(...args): args.join("_");
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const value = func.apply(this, args);
    cache.set(cacheKey, value);
    return value;
  }
}

function testThis(a) {
  return `${this.val}_${a}`;
}

const memoFunc = memo(testThis);

const testSubject = {
  val: 1,
  memo: memoFunc,
};

const testSubject2 = {
  val: 2,
  memo: memoFunc,
};

// 1_1
console.log(testSubject.memo(1));
// Expected no caching and output is 2_1
console.log(testSubject2.memo(1));
// Expected to cache
console.log(testSubject2.memo(1));
