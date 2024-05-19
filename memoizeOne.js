
/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
function defaultEqual(args1, args2){
  return  JSON.stringify(args1) === JSON.stringify(args2);
}


function memoizeOne(func, isEqual = defaultEqual) {
  // your code here
  let lastArg = null;
  let lastVal = null;
  let lastThis = null;
  return function memo(){
    let context = this;
    let arg = arguments;
    if(lastThis === context && isEqual(lastArg, arg)){
      return lastVal;
    }else{
      val = func.apply(context,arg);
      lastThis = context;
      lastArg = arg;
      lastVal = val;
      return val;
    }
  }
}
