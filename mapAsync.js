let chopped = (arr, limit) => {
  let result = [];
  let i = 0;
  while (i < arr.length) {
    result.push(arr.slice(i, i + limit));
    i = i + limit;
  }
  console.log(result);
  return result;
};

const mapLimit = (arr, limit, fn) => {
  let ar = chopped(arr, limit);
  return new Promise((resolve, reject) => {
    const promise = ar.reduce((promiseFn, val) => {
      return promiseFn.then((res) => {
        return new Promise((resolve, reject) => {
          const results = [];
          let taskCompleted = 0;
          val.forEach((e) => {
            fn(e, (error, value) => {
              if (error) {
                reject(error);
              } else {
                results.push(value);
                taskCompleted++;
                if (taskCompleted >= val.length) {
                  resolve([...res, ...results]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));
  });

  promise
    .then((r) => {
      resolve(r);
    })
    .catch((e) => reject(e));
};

function getUserById(id, callback) {
  // simulating async request
  // const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, 2000);
}

function mapLimit2(inputs, limit, iterateeFn, callback) {
  // write your solution here
  let choppedArr = chopped(inputs, limit);
  const reduceResult = choppedArr.reduce((acc, curr) => {
    return new Promise((resolve) => {
      let arr = [];
      curr.forEach((x) => {
        iterateeFn(x, (callbackVal) => {
          arr.push(callbackVal);
          if (curr.length === arr.length) {
            acc.then((accRes) => {
              resolve([...accRes, ...arr]);
            });
          }
        });
      });
    });
  }, Promise.resolve([]));
  reduceResult.then((results) => {
    console.log("results", results);
    callback(results);
  });
}
let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

mapLimit2([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
