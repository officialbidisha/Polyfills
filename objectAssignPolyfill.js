function objectAssign(target, ...sources) {
    if (target == null) { // Check if target is null or undefined
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const to = Object(target); // Convert the target to an object

    sources.forEach(source => {
      if (source != null) { // Skip over undefined or null sources
      let keys = [...Object.getOwnPropertySymbols(source), ...Object.keys(source)]
        for (let key of keys) {
          const descriptor = Object.getOwnPropertyDescriptor(to, key);

          // Check if the property is non-writable
          if (descriptor && !descriptor.writable) {
            throw new TypeError(`Cannot assign to read-only property '${key}'`);
          }
          target[key] = source[key];
        }
      }
    });

    return to;
  };
