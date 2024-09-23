function myInstanceOf(obj, target) {
  // your code here
  // let flag = false;
   if(obj === null || typeof obj !== 'object') return false;
   if(Object.getPrototypeOf(obj) == target.prototype){
      return true
    }
   return myInstanceOf(Object.getPrototypeOf(obj), target);
}
