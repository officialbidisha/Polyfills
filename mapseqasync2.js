function promisify(func, inputData) {
    
    return new Promise((resolve, reject) => {
        // respData after processing the callback when time out is done
        func((err, respData) => {
            !err ? resolve(respData) : reject(err);
        }, inputData)
    })
}

/**
* Using promise
* Step 1: we create a starter promise with initial data in its resolver, accumlatorPromise points to this when we start
* Step 2: loop over the funcs array and create promise for each func(using promisify)
* Step 3: once promisify is resolved it will return a resolve promise with the new data from the func call
  and this new resolve promise will be the accumlatorPromise which will call promisify again on the next func in the array
*/
function sequence(funcs){
    
    return function(finalCallback, initialData) {
        const starterPromise = Promise.resolve(initialData);
        
        const finalPromise = funcs.reduce((accumlatorPromise, currentFn)=>{
            return accumlatorPromise.then(data => {
                return promisify(currentFn, data);// this will create a new promise and run the executor which will resolve/reject
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }, starterPromise);
        
        // last resolve/reject promise in the accumulator
        finalPromise
        .then(data => {finalCallback(undefined, data)})
        .catch(err => {finalCallback(err)} )
    };
}
