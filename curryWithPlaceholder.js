function curry(fn) {
  // your code here
  return function curried(...args) {
    const complete =
      args.length >= fn.length &&
      !args.slice(0, fn.length).includes(curry.placeholder);
    if (complete) {
      return fn.apply(this, [...args]);
    }
    return function (...args2) {
      const mergedArgs = mergeArguments(args, args2);
      return curried.apply(this, [...mergedArgs]);
    };
  };
}
function mergeArguments(args, args2) {
  let i = 0;
  let j = 0;
  let finalArgs = [];
  while (i < args.length && j < args2.length) {
    if (args[i] === curry.placeholder) {
      finalArgs.push(args2[j]);
      i++;
      j++;
    } else {
      finalArgs.push(args[i]);
      i++;
    }
  }
  while (i < args.length) {
    finalArgs.push(args[i]);
    i++;
  }
  while (j < args2.length) {
    finalArgs.push(args2[j]);
    j++;
  }
  return finalArgs;
}

curry.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
const _ = curry.placeholder;

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'
