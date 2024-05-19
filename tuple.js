const input = `(1, 2, 3) , (4, 5, 6) , (7, 8, 9)`;
function tuple(inputStr){
  let replacedString = inputStr.replaceAll("(", "[").replaceAll(")", "]");
  
  let replaxereplacedString = replacedString.replaceAll(" ","");
  let output = [];
  console.log(replaxereplacedString);
  let value = replaxereplacedString.split('],[');

  for(let val of value){
    val = val.replaceAll("[", "").replaceAll("]","").split(',');
    
    output.push(val.map((x)=> parseInt(x)));
  }
  console.log(output);
 
}

tuple(input);
