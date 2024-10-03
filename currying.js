// 4 args
const sum = (...args) => {
  //spread the arguments in storage array
  const storage = [...args];
  
  //base case
  if(storage.length === 4){
    return storage.reduce((a, b) => a + b, 0);
  }
}



/**
* Curry using a sum and when the function is called internally.
* let curriedSum = curry(sum);
* console.log(curriedSum(1)(2)(4)); // 3
*/
//
function curry(f) {
  // curry(f) does the currying transform
  return function curried(...args) {
    if (args.length >= f.length) {
      return f.apply(this, [...args]);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

// usage
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)(4)); // 3


/// Added sum for empty argument.

function sum(...args) {
  if (args.length === 0) {
    return args.reduce((a, b) => a + b);
  } else {
    return function (...args2) {
      let tempArr = [...args, ...args2];
      if (args2.length === 0) {
        return tempArr.reduce((a, b) => a + b, 0);
      }
      return sum(...tempArr);
    };
  }
}
console.log(sum(1)(2)(3)(4)()); // Output: 10
console.log(sum(1)(2, 3)(4)()); // Output: 10

/*Custom method with sum that triggers currying with empty arguments*/

function curry(fn) {
  return function (...args) {
    let storage = [...args];
    if (storage.length === 0) {
      console.log("h");
      return fn.apply(this, storage);
    } else {
      return function curried(...args2) {
        if (args2.length === 0) {
          return fn.apply(this, storage);
        } else {
          storage = [...storage, ...args2];
          return curried;
        }
      };
    }
  };
}

let sum = (a, b) => a + b;

let c = curry(sum);
console.log(c(1)(2)());


