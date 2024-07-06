function stringify(data) {
  if (
    data === NaN ||
    data === null ||
    data === Infinity ||
    data === undefined
  ) {
    return "null";
  }
  if (typeof data === "symbol" || typeof data === "function") {
    return undefined;
  }
  if (typeof data === "string") {
    return `"${data}"`;
  }

  if (typeof data === "object") {
    removeCycle(data);
    if (Array.isArray(data)) {
      return `[${data.map((e) => stringify(e) || "null").join()}]`;
    } else {
      return (
        "{" +
        Object.keys(data)
          .filter((key) => data[key] !== undefined)
          .map((key) => `"${key}": ${stringify(data[key])}`)
          .join() +
        "}"
      );
    }
  } else {
    return String(data);
  }
}


const removeCycle = (obj) => {
  //set store
  const set = new WeakSet([obj]);

  //recursively detects and deletes the object references
  const iterateObj = (obj) => {
    for (let key in obj) {
      // if the key is not present in prototype chain
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object") {
          // if the set has object reference
          // then delete it
          if (set.has(obj[key])) {
            delete obj[key];
          } else {
            //store the object reference
            set.add(obj[key]);
            //recursively iterate the next objects
            iterateObj(obj[key]);
          }
        }
      }
    }
  };
  iterateObj(obj);
};

let obj1 = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

console.log(stringify(obj1));

const List = function (val) {
  this.next = null;
  this.val = val;
};

const item1 = new List(10);
const item2 = new List(20);
const item3 = new List(30);

item1.next = item2;
item2.next = item3;
item3.next = item1;

console.log(stringify(item1));
