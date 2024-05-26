function completeAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error("target is Not an object!");
  }
  target = new Object(target);
  for (const source of sources) {
    if (!source) {
      continue;
    }
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  }
  return target;
}
const source = Object.create(
  {
    a: 3, // prototype
  },
  {
    b: {
      value: 4,
      enumerable: true, // enumerable data descriptor
    },
    c: {
      value: 5, // non-enumerable data descriptor
    },
    d: {
      // non-enumerable accessor descriptor
      get: function () {
        return this._d;
      },
      set: function (value) {
        this._d = value;
      },
    },
    e: {
      // enumerable accessor descriptor
      get: function () {
        return this._e;
      },
      set: function (value) {
        this._e = value;
      },
      enumerable: true,
    },
  }
);
let p = competeAssign({}, source);
console.log(p);
