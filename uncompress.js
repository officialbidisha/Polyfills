function uncompress(str){
  let result = '';
  let stack = [];
  for(let i=0;i<str.length;i++){
     if(str[i]!== ')'){
        stack.push(str[i]);
     }
     else{
        let substr = '';
        while(stack.length>0 && stack[stack.length-1] !== '('){
           substr=stack.pop()+substr;
        }
        stack.pop() // pop out the last
        let k = "";
        while(stack && !isNaN(parseFloat(stack[stack.length-1]))){
            k = stack.pop()+k;
        }
        
        stack.push(substr.repeat(parseInt(k)));
     }
  }
  return stack.join('');
}

uncompress('3(ab2(c))')
