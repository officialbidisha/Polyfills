// Creating event emitter

class EventEmitter {
  constructor() {
    this.subscriptionList = new Map();
  }

  subscribe(eventName, callback) {
    const sym = Symbol();
    if (!this.subscriptionList.has(eventName)) {
      const callbackMap = new Map();
      callbackMap.set(sym, callback);
      this.subscriptionList.set(eventName, callbackMap);
    } else {
      const callbackMap = this.subscriptionList.get(eventName);
      callbackMap.set(sym, callback);
    }

    const that = this; // store the reference to the EventEmitter instance
    return {
      release: function releaseFn() {
        const list = that.subscriptionList.get(eventName);
        list && list.delete(sym);
        // Clean up if there are no more subscriptions for the event
        if (list && list.size === 0) {
          that.subscriptionList.delete(eventName);
        }
      },
    };
  }

  emit(eventName, ...args) {
    const subscriptions = this.subscriptionList.get(eventName);
    if (subscriptions) {
      subscriptions.forEach((callback) => {
        callback(...args);
      });
    }
  }
}

// Test cases

const emitter = new EventEmitter();

// Test case: release() should work spec
const sub1 = emitter.subscribe('test', () => console.log('test1'));
sub1.release();
emitter.emit('test'); // expects no output

// Test case: release() should work for multiple listeners on the same event spec
const sub2 = emitter.subscribe('test', () => console.log('test2'));
const sub3 = emitter.subscribe('test', () => console.log('test3'));
sub2.release();
emitter.emit('test'); // expects 'test3' output
