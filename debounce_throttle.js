function debounce(fn, delay) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }
  
  function throttle(fn, delay) {
    let isTimerValid = false;
    return function () {
      let context = this;
      let args = arguments;
      if (!isTimerValid) {
        isTimerValid = true;
        fn.apply(context, args);
        setTimeout(() => {
          isTimerValid = false;
        }, delay);
      }
    };
  }
  