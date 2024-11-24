/**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
  if (data === null) return 'null';
  if (typeof data === 'number') {
    // Handle NaN and Infinity
    if (isNaN(data) || !isFinite(data)) {
      return 'null';
    }
    return data.toString();
  }
  if (typeof data === 'boolean') {
    return data.toString();
  }
  if (typeof data === 'string') {
    return `"${data}"`;
  }
  if (typeof data === 'undefined' || typeof data === 'function' || typeof data === 'symbol') {
    return undefined; // These types are omitted in objects
  }
  if (data instanceof Date) {
    // Serialize Date objects as ISO strings
    return `"${data.toISOString()}"`;
  }
  if (typeof data === 'bigint') {
    // Serialize BigInt values as strings (JSON.stringify does not support BigInt)
    throw new Error('BigInt');
  }
  if (Array.isArray(data)) {
    const arrayContents = data.map((element) => stringify(element) || 'null');
    return `[${arrayContents.join(',')}]`;
  }
  if (typeof data === 'object') {
    const keyValuePairs = Object.keys(data)
      .map((key) => {
        const value = stringify(data[key]);
        return value !== undefined ? `"${key}":${value}` : undefined;
      })
      .filter((pair) => pair !== undefined);
    return `{${keyValuePairs.join(',')}}`;
  }
  return 'null';
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
