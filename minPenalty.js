function calculatePenalty(log, closingTime) {
  let trimmedLog = log.trim().split(" ");
  let penalty = 0;
  for (let i = 0; i < closingTime; i++) {
    if (trimmedLog[i] === "N") {
      penalty++;
    }
  }
  for (let i = closingTime; i < trimmedLog.length; i++) {
    if (trimmedLog[i] === "Y") {
      penalty++;
    }
  }
  return penalty;
}

let result = calculatePenalty("Y Y N Y", 4);
// console.log(result);

function minPenalty(log) {
  let trimmedLog = log.trim().split("");
  let minimumPenalty = Infinity;
  let result;
  for (let i = 0; i <= trimmedLog.length; i++) {
    if (calculatePenalty(log, i) < minimumPenalty) {
      minimumPenalty = calculatePenalty(log, i);
      result = i;
    }
  }
  return result;
}

function parseString(str) {
  let trimmedStr = str.trim().split(" ");
  let stack = [];
  let arr = [];
  let penalty = [];
  for (let i = 0; i < trimmedStr.length; i++) {
    if (trimmedStr[i] !== "END") {
      stack.push(trimmedStr[i]);
    } else {
      //   console.log("stack", stack);
      let temp = [];
      while (stack.length > 0 && stack[stack.length - 1] !== "BEGIN") {
        temp.push(stack.pop());
      }

      stack.pop();
      arr.push(temp.reverse().join(" "));
    }
  }
  console.log(arr);

  for (let a of arr) {
    penalty.push(minPenalty(a));
  }
  return penalty;
}

let p = parseString("BEGIN BEGIN BEGIN Y Y N Y END Y Y N N END Y N Y N END");
console.log(p);
let re = minPenalty("Y Y N Y");
console.log(re);


// optimised
function bestClosingTime(log) {
  let trimmedLog = log.trim().split("");
  let minimumPenalty = 0;
  let result=0;
  let currentPenalty = 0;
  for (let i = 0; i < trimmedLog.length; i++) {
    if (trimmedLog[i] === 'Y') {
      currentPenalty -- ;
      if(currentPenalty<minimumPenalty){
        minimumPenalty = currentPenalty;
        result =i+1;
       }
    }
    else{
        currentPenalty++;
    }
  }
  return result;
}
