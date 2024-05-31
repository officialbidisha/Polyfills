const myExtends = (SuperType, SubType) => {
  function Child(...args) {
    SuperType.apply(this, args);
    SubType.apply(this, args);
    Object.setPrototypeOf(this, SubType.prototype);
  }
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype);
  // NOT necessary on instances
  // Object.setPrototypeOf(Child.prototype, SubType.prototype); 
  Object.setPrototypeOf(Child, SuperType);
  return Child;
};
