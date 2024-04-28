/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  debugger;
  if (!target) {
    throw new Error();
  }

  if (typeof target !== "object") {
    const constructor = Object.getPrototypeOf(target).constructor;
    target = new constructor(target);
  }

  for (const source of sources) {
    if (!source) {
      continue;
    }

    const keys = [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source),
    ];
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(target, key);
      console.log("des", descriptor);
      if (descriptor && !descriptor.configurable) {
        throw new Error();
      }

      target[key] = source[key];
    }
  }

  return target;
}
