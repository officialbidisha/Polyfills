/**
 * Memoize the below function
 */
function getSomeData(foo, callback) {
  console.log("ASYNC REQ CALLED");
  let uri = "https://jsonplaceholder.typicode.com/todos/" + foo;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("async request");
      fetch(uri).then((res) => {
        resolve(callback(undefined, res));
      });
    }, 300);
  });
}
//
function memoize(fn) {
  const cache = {};

  return async function () {
    const args = JSON.stringify(arguments);
    cache[args] = cache[args] || fn.apply(this, arguments);
    return cache[args];
  };
}

const mem = memoize(getSomeData);
let cb = (err, res) => {
  if (err) {
    return err;
  } else {
    return res;
  }
};

const x = mem(2, cb);
x.then((res) => {
  return res.clone().json();
}).then((r) => console.log("A", r));

const y = mem(2, cb);
y.then((res) => {
  return res.clone().json();
}).then((r) => console.log("B", r));
