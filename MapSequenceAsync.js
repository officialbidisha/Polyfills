function sequence(funcs) {
  const promiseFuncs = funcs.map(promisify)
  
  return async function (callback, input) {
    // init promise
    let promise = Promise.resolve(input);
    
    // add all promiseFuncs to promise
    promiseFuncs.forEach((promiseFunc) => {
      promise = promise.then(promiseFunc)
    })
    
    // handle resolved or rejected promise
    promise.then((data) => {
      callback(undefined, data)
    }).catch(callback)
  }   
}
function promisify(fn) {
  return function (input) {
    return new Promise((resolve, reject) => {
      const cb = (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve(data)
      };
      
      fn.call(this, ...[cb, input])
    })
  } 
}
