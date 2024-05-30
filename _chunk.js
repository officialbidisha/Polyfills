function _chunk(arr, size){
	let result = [];
  for(let i=0;i<arr.length;i=i+size){
  	result.push(arr.slice(i, i+size));
  }
  return result;
}

let x = _chunk([1,3,7,9,12,5,66],2);
console.log(x);
