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


function memo(func, resolver) {
  // your code here
  const cache = new Map();

  // Map<cacheKey, Map<context, value>>
  return function () {
    const cacheKey = resolver
      ? resolver(...arguments)
      : Array.from(arguments).join(",");
    const contextMap = cache.get(cacheKey);
    // If there is a corresponding context map to cachekey
    // Check if context is in the map, if so, return value.
    // Else if no corresponding add contextMap, add new entry to the context map
    if (!contextMap) {
      const value = func.apply(this, arguments);
      return value;
    }
    if (contextMap.has(this)) {
      return contextMap.get(this);
    }          // 
    // If context not in the map, calculate and add to context map.
    const value = func.apply(this, arguments);
    contextMap.set(this, value);
    return value;
  };
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
