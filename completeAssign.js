// 
function completeAssign(target, ...sources) {
  // test case: completeAssign should throw error when target is null or undefined 
  if(target === null || target === undefined){
    throw Error("Target is not defined");
  }
  if(typeof target !== 'object'){
    return Object(target);
  }
  for(const source of sources){
    //test case: non-string primitives in source are ignored
    if(source === null || source === undefined){
      continue;
    }
    // Shorthand way to clone an object with descriptors.
    // Source: https://javascript.info/property-descriptors#object-getownpropertydescriptors
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
    console.log(Object.getOwnPropertyDescriptors(source))
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  }
  return target;
}
