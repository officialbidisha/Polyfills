function expand(mystr, value) {
  var items = mystr.split("."); // split on dot notation
  var output = {}; // prepare an empty object, to fill later
  var ref = output; // keep a reference of the new object

  //  loop through all nodes, except the last one
  for (var i = 0; i < items.length - 1; i++) {
    ref[items[i]] = {}; // create a new element inside the reference
    ref = ref[items[i]]; // shift the reference to the newly created object
  }

  ref[items[items.length - 1]] = value; // apply the final value

  return output; // return the full object
}

let d = expand("a.b.c", 2);
console.log(d);
