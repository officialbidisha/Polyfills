

/**** Yet another way ****/

function mapLimit(inputs, limit, iterateeFn, outputCallback) {
  const indexedInputs = inputs.map((value, index) => ({ value, index }));
  const results = [];

  function run(input) {
    iterateeFn(input.value, (result) => {
      results[input.index] = result;

      if (indexedInputs.length > 0) {
        const nextInput = indexedInputs.shift();
        run(nextInput);
      }

      if (results.length === inputs.length) {
        outputCallback(results);
      }
    });
  }

  indexedInputs.splice(0, limit).forEach(run);
}
