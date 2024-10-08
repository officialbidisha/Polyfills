class EventEmitter {
  constructor() {
    this.subscriptionList = new Map();
  }

  // Subscribe to an event with a callback function
  subscribe(eventName, callback) {
    const id = Symbol(); // Unique identifier for the subscription
    if (!this.subscriptionList.has(eventName)) {
      this.subscriptionList.set(eventName, new Map());
    }
    const eventMap = this.subscriptionList.get(eventName);
    eventMap.set(id, callback);

    // Return an object with a release method to unsubscribe
    return {
      release: () => {
        // Remove the callback from the event's subscription map
        if (eventMap.has(id)) {
          eventMap.delete(id);
        }
        // If there are no more subscribers, remove the event entry
        if (eventMap.size === 0) {
          this.subscriptionList.delete(eventName);
        }
      },
    };
  }

  // Emit an event with optional arguments
  emit(eventName, ...args) {
    const eventMap = this.subscriptionList.get(eventName);
    if (eventMap) {
      eventMap.forEach((cb) => cb.apply(this, args)); // Call each callback with the provided arguments
    }
  }
}
