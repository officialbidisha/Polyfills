

/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  // your code here

  for(let [key,value] of Object.entries(command)){
    // console.log(key);
    // console.log(value);
    switch(key){
      case '$push':{
        if(!Array.isArray(data)){
          throw Error('Error in the target');
        }
        return [...data, ...value];
      }

      case '$merge': {
        if (!(data instanceof Object)) {
            throw Error("bad merge");
          }
        return {...data, ...value};
      }

      case '$apply': {
        return value(data);
      }

      case '$set':{
         return value;
      }
      default:
        if (data instanceof Array) {
          const res = [...data];
          res[key] = update(data[key], value);
          return res;
        } else {
          const newData = {...data};
          newData[key] = update(data[key], value);
          return newData;
        }
    }
  }
}

const arr = [1, 2, 3, 4]
const newArr = update(arr, {0: {$apply: (item) => item * 2}})
console.log(newArr);
