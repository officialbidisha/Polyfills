let cloneDeep = (aObject, map = new Map()) => {
  //If not a object then return
  if (!aObject) {
    return aObject;
  }

  if (map.has(aObject)) {
        return map.get(aObject);
  }

  let v;
  let bObject =null;

  if(typeof aObject === 'object'){
  //Check the type of the input
     bObject =  Array.isArray(aObject) ? [] : {};
  }
  else{
     bObject = aObject;
  }
  map.set(aObject, bObject);

  //Copy each element
  const keys = [...Object.getOwnPropertySymbols(aObject), ...Object.keys(aObject)]
  for (const k of keys) {
    v = aObject[k];

    //If type of element is object
    //Then recursively call the same function and create  a copy
    bObject[k] = typeof v === "object" ? cloneDeep(v,map) : v;
  }

  return bObject;
};
