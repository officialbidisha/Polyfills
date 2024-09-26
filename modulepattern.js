var modularpattern = (function () {
  var arr = [];
  let i = 0;

  return {
    setArray: function (newArr) {
      arr = newArr;
    },
    get: function () {
      return arr[i++];
    },
    reset: function () {
      arr = [];
      return "Array reset";
    },
  };
})();

// Pass an array from outside
modularpattern.setArray(["zero", "one", "two", "three", "four"]);

console.log(modularpattern.get()); // alerts: one
console.log(modularpattern.get()); // alerts: two
console.log(modularpattern.reset()); // alerts: Array reset
