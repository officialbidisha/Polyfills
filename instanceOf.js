function myInstanceOf(obj, target) {
  // your code here
  let flag = false;
   if(obj === null || typeof obj !== 'object') return false;
   if(!target.prototype) throw Error();
    while(obj){
      if(Object.getPrototypeOf(obj) == target.prototype){
        flag = true;
        break;
      }
      obj = Object.getPrototypeOf(obj);
    }
  return flag;
}
