class MyTimer {
  constructor() {
    this.timerId = 1;
    this.queue = [];
  }
  setTimeout(cb, time, ...args) {
    let id = this.timerId;
    this.timerId++;
    this.queue.push({
      id,
      time: Date.now() + time,
      cb,
      args,
    });
    this.queue.sort((a, b) => a.time - b.time);
    return id;
  }

  clearTimeout(id) {
    this.queue = this.queue.filter((x) => x.id !== id);
  }

  run() {
    while (this.queue.length > 0) {
      let element = this.queue.shift();
      const { id, time, cb, args } = element;
      if (time >= Date.now()) {
        cb(...args);
      } else {
        queue.unshift(element);
      }
    }
  }
}
let MY_TIMER = new MyTimer();
MY_TIMER.setTimeout(() => {
  console.log(1);
}, 2500);
MY_TIMER.setTimeout(() => {
  console.log(2);
}, 2000);
MY_TIMER.setTimeout(() => {
  console.log(3);
}, 2500);
MY_TIMER.setTimeout(() => {
  console.log(4);
}, 3000);

MY_TIMER.run();
