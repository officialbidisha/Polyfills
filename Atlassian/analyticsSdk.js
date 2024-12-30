class SDK {
  constructor() {
    this.events = [];
    this.count = 1; // Simulate the failure on every 5th send
    this.isProcessing = false; // To prevent concurrent execution
    this.maxRetries = 3; // Maximum retries for a failed event
  }

  log(data) {
    this.events.push(data);
  }

  send(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 !== 0) {
          resolve(data);
          this.count++;
        } else {
          reject(data);
          this.count = 1;
        }
      }, 1000);
    });
  }

  async processEvent(event) {
    let retries = 0;

    while (retries < this.maxRetries) {
      try {
        let result = await this.send(event);
        console.log(`Success: ${result}`); // Successfully sent
        return; // Exit on success
      } catch (err) {
        retries++;
        console.log(`---RETRYING ${retries}/${this.maxRetries}---`, event);
      }
    }

    console.error(
      `Failed to send event after ${this.maxRetries} retries:`,
      event
    );
    // Optionally, push the event to a "failed" queue for further analysis or retry later
  }

  async get() {
    if (this.isProcessing) return; // Avoid multiple invocations
    this.isProcessing = true;

    while (this.events.length > 0) {
      let event = this.events.shift();
      await this.processEvent(event); // Process one event at a time
    }

    this.isProcessing = false; // Mark processing as complete
  }
}

// Example usage
const sdk = new SDK();

sdk.log("event 1");
sdk.log("event 2");
sdk.log("event 3");
sdk.log("event 4");
sdk.log("event 5");
sdk.log("event 6");
sdk.log("event 7");
sdk.log("event 8");
sdk.log("event 9");
sdk.log("event 10");

sdk.get();
