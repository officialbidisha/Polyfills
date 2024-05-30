function promisify(fn){
   return function(...args){
      return new Promise((resolve, reject)=>{
         function customCallback(err, data){
             if(err){
                reject(err);
             }
             else{
                resolve(data);
             }
         }
         args.push(customCallback);
         fn.call(this, ...args);
      })
   }
}
