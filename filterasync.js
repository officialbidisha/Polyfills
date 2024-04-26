const filter = (arr, fn) => {
  // return a new promise
  return new Promise((resolve, reject) => {
    const output = [];
    let track = 0;
    
    arr.forEach((e, i) => {
      fn(e, (error, result) => {
        // track the no of inputs processed
        track++;
        
        if(error){
          reject(error);
        }
        
        // if the input passes the test
        // add it to the current index
        if(result){
          output[i] = e;
        }
        
        // if the last element of the input array
        if(track >= arr.length){
          // filter the final output with truthy values
          // to return the value in order
          resolve(output.filter(Boolean));
        }
      });
    });
   
  });
};

let numPromise = filter([1, 2, 3, 4, 5,7], function (num, callback) {
  setTimeout(function () {
    num = num * 1;
    
    // throw error
    if(num === 7){
      callback(true);
    }else{
      callback(null, num !== 4);
    }
    
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
