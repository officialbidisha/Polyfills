function undefinedToNull(arg) {
  // your code here
  let res = {};
    // console.log(Object.entries(arg));
    for(let [key,value] of Object.entries(arg)){
        let temp = [];
        if(typeof (value) === 'object'){
          if(Array.isArray(value)){
            for(let val of value){
              if(typeof val === 'undefined'){
                temp.push(null);
              }
              else{
                temp.push(val);
              }
            }
              res[key] = temp;
          }
          else{
            if(value === null){
              res[key] = (null);
            }
            else{
            res[key] = undefinedToNull(value);
            }
          }
        }

        else if(value === undefined){
          res[key] = null;
        }
        else{
          res[key] = value;
        }
    }

    return Array.isArray(arg) ? Object.values(res):res ;
  
}
