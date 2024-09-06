class Observable {
  constructor() {
    this.subscribers = new Map(); // Map to hold subscribers and their callbacks
  }

  // Subscribe an observer with a callback
  subscribe(callback) {
    const id = Symbol(); // Unique ID for each subscription
    this.subscribers.set(id, callback);
    return {
      unsubscribe: () => this.subscribers.delete(id),
    };
  }

  // Notify all subscribers with data
  notify(data) {
    this.subscribers.forEach((callback) => callback(data));
  }
}
class Observer {
  constructor(name) {
    this.name = name;
    this.subscriptions = []; // Track all subscriptions
  }

  // Subscribe to an observable and keep track of the subscription
  addSubscription(observable, callback) {
    const subscription = observable.subscribe(callback);
    this.subscriptions.push(subscription);
    return subscription;
  }

  // Unsubscribe from all subscriptions
  unsubscribeAll() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = []; // Clear the list
  }
}
// Create an observable
const observable = new Observable();

// Create observers
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// Observer 1 subscribes to the observable with multiple callbacks
const subscription1 = observer1.addSubscription(observable, (data) =>
  console.log(`${observer1.name} received data: ${data}`)
);
const subscription2 = observer1.addSubscription(observable, (data) =>
  console.log(`${observer1.name} received additional data: ${data}`)
);

// Observer 2 subscribes to the observable
const subscription3 = observer2.addSubscription(observable, (data) =>
  console.log(`${observer2.name} received data: ${data}`)
);

// Emit events
observable.notify("Event 1");

// Unsubscribe Observer 1 from one callback
subscription1.unsubscribe();

// Emit another event
observable.notify("Event 2");
