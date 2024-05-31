function promisify(func) {
 return (...args) => {
   return new Promise((resolve, reject) => {
     const callback = (error, data) => {
       if (error) {
         reject(error)
       }
       resolve(data)
     }
     func(callback, ...args)
   })
 }
}

function sequence(funcs){
 const promisifiedFuncs = funcs.map(promisify)
 return function(cb, startValue) {
   const resultantPromise = promisifiedFuncs.reduce((acc, promiseFunc) => {
     return acc.then(promiseFunc)
   }, Promise.resolve(startValue))
   return resultantPromise
     .then(v => cb(undefined, v))
     .catch(error => cb(error))
 }
}
