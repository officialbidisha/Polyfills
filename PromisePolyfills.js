/**
* Promise.all
*/

// Promise.all

function promiseAll(promises) {
  let count = 0;
  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result.push(res);
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
/**
* Promise.race
*/

function promiseRace(promises) {
  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          result.push(res);

          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

/** 
* Promise.allSettled
*/
const allSettled = (promises) => {
  // map the promises to return custom response.
  const mappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ status: "fulfilled", value: val }),
      (err) => ({ status: "rejected", reason: err })
    )
  );

  // run all the promises once with .all
  return Promise.all(mappedPromises);
};

/**
* Promise.any
*/
function any(promises) {
  // your code here
  let errorCount = 0;
  let errors = [];
  let totalLengh = promises.length;
  return new Promise((resolve, reject)=> {
       promises.forEach((promise,index)=> {
           promise.then((res)=>{
              resolve(res);
           }).catch((err)=> {
              errors[index]=err;
              errorCount++;
              if(errorCount === totalLengh-1){
                  reject(new AggregateError('No Promise in Promise.any was resolved', errors))
              }
           })
       })
  })
}

/**
* Prototype.finally
*/
function myFinally(promise, onFinally) {
  // your code here

   return promise
    .then((value) => {
      // Handle the resolved case
      return Promise.resolve(onFinally()).then(() => value);
    })
    .catch((reason) => {
      // Handle the rejected case
      return Promise.resolve(onFinally()).then(() => Promise.reject(reason));
    });

}



let a = new Promise((resolve, reject) => {
  resolve("15");
});

let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 200);
});
let c = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(30);
  }, 300);
});

promiseRace([a, b, c])
  .then((Res) => console.log(Res))
  .catch((Err) => console.log(Err));


