function flat(arr, depth=1){
  let stack = arr.map((x) => [x, depth]);

  let output = [];
  while(stack.length>0){
     const [item,depth] = stack.pop();
     if(Array.isArray(item) && depth>0){
        stack.push(...item.map((x)=> [x,depth-1]));
     }
     else{
        output.push(item);
     }
  }
  return output.reverse();
}

const arr = [1, [2], [3, [4]]];
flat(arr, 2)
