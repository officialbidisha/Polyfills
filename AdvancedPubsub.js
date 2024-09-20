class Events {
  constructor() {
    this.subscriptionList = [];
  }
  subscribe(name, callback) {
    if (!this.subscriptionList[name]) {
      this.subscriptionList[name] = [];
    }
    this.subscriptionList[name].push(callback);
    return {
      remove: () => {
        this.subscriptionList[name] = this.subscriptionList[name].filter(
          (cb) => cb !== callback
        );
      },
    };
  }

  subscribeOnce(name, callback) {
    const wrapper = (payload) => {
      callback(payload);
      this.subscriptionList[name].filter((cb) => cb !== wrapper);
    };
    this.subscribe(name, wrapper);
  }

  subscribeOnceAsync(name) {
    return new Promise((resolve, reject) => {
      const wrapper = (payload) => {
        resolve(payload);
        this.subscriptionList[name].filter((cb) => cb !== wrapper);
      };
      this.subscribe(name, wrapper);
    });
  }

  publish(name, args) {
  console.log('args...', args);
  if(this.subscriptionList[name]){
    this.subscriptionList[name].forEach((callback) => {
   		callback(args);
    });
  }
  }
}
// Test cases
const events = new Events();

const newUserNewsSubscription = events.subscribe(
  "new-user",
  function (payload) {
    console.log(`Sending Q1 News to: ${payload}`);
  }
);

events.publish("new-user", "Jhon");
//output: "Sending Q1 News to: Jhon"

const newUserNewsSubscription2 = events.subscribe(
  "new-user",
  function (payload) {
    console.log(`Sending Q2 News to: ${payload}`);
  }
);

events.publish("new-user", "Doe");
//output: "Sending Q1 News to: Doe"
//output: "Sending Q2 News to: Doe"

newUserNewsSubscription.remove(); // Q1 news is removed

events.publish("new-user", "Foo");
//output: "Sending Q2 News to: Foo"

events.subscribeOnce("new-user", function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once");
//output: "Sending Q2 News to: Foo Once" - normal event
//output: "I am invoked once Foo Once" - once event

events.publish("new-user", "Foo Twice");
//output: "Sending Q2 News to: Foo Twice" - normal event
// once event should not invoke for second time

events.subscribeOnceAsync("new-user").then(function (payload) {
  console.log(`I am invoked once ${payload}`);
});

events.publish("new-user", "Foo Once Async");
