function loadMethod() {
  document.getElementById("search").addEventListener("keydown", optimisedPrint);
}
function printArg(e) {
  console.log(e.target.value);
}
const optimisedPrint = debounce(printArg, 800);

function debounce(fn, delay, option = { leading: true, trailing: false }) {
  let timer;
  let isLeadingInvoked = false;
  return function (...args) {
    let context = this;
    if (timer) {
      clearTimeout(timer);
    }

    if (option.leading && !timer) {
      fn.apply(context, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timer = setTimeout(() => {
      if (option.trailing && !isLeadingInvoked) {
        fn.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}
window.onload = loadMethod();
