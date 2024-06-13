class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNodes(node) {
    // console.log(node);
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, []);
    }
  }

  // Directed Graph
  addEdges(u, v) {
    if (this.adjacencyList.has(u) && this.adjacencyList.has(v)) {
      this.adjacencyList.get(u).push(v);
    } else {
      throw new Error("Invalid Edges", u, v);
    }
  }

  topologicalSort() {
    const queue = [];
    const result = [];
    const indegree = new Map();
    const adjListKeys = this.adjacencyList.keys();
    const adjValues = this.adjacencyList.values();
    console.log("-adjListKeys-", adjListKeys);
    console.log("-adjValues-", adjValues);

    // Set keys to 0
    for (const key of adjListKeys) {
      indegree.set(key, 0);
    }

    // calculate indegree
    for (const values of adjValues) {
      for (const i of values) {
        indegree.set(i, indegree.get(i) + 1);
      }
    }

    for (const [node, degree] of indegree.entries()) {
      if (degree == 0) {
        queue.push(node);
      }
    }

    while (queue.length > 0) {
      const currNode = queue.shift();
      result.push(currNode);
      for (const node of this.adjacencyList.get(currNode)) {
        indegree.set(node, indegree.get(node) - 1);
        if (indegree.get(node) === 0) {
          queue.push(node);
        }
      }
    }
    return result;
  }
}

function executeTasks(taskSchedules) {
  const graph = new Graph();

  // instialising Nodes
  taskSchedules.forEach((task) => {
    graph.addNodes(task.id);
    if (task.dependencies.length > 0) {
      task.dependencies.forEach((dependency) => {
        graph.addNodes(dependency);
      });
    }
  });

  // Adding Nodes [Directed Graph] u > v

  taskSchedules.forEach((task) => {
    if (task.dependencies.length > 0) {
      task.dependencies.forEach((dependency) =>
        graph.addEdges(dependency, task.id)
      );
    }
  });

  // Topologicalsort [BFS]
  const executeTasks = graph.topologicalSort();

  return executeTasks;
}
const schedules = [
  { id: "a", dependencies: ["b", "c"] },
  { id: "b", dependencies: ["d"] },
  { id: "c", dependencies: ["e"] },
  { id: "d", dependencies: [] },
  { id: "e", dependencies: ["f"] },
  { id: "f", dependencies: [] },
];

console.log(executeTasks(schedules));
// -----------------------------------------------------------------------------------------------------------------------------------------

// Approach 2
class Task {
  // accept the dependencies list
  // and the callback
  constructor(dependencies = [], job) {
    debugger;
    // filter the dependencies that are not yet completed
    this.dependencies = dependencies
      ? dependencies.filter(
          (dependency) => dependency instanceof Task && !dependency.isCompleted
        )
      : [];
    this.currentDependencyCount = this.dependencies.length;

    // the callback
    this.job = job;

    // if current task is done
    this.isCompleted = false;

    // store the dependencies list callback
    // to execute is sequence
    this.subscribedList = [];

    // start the job
    this.processJob();
  }

  processJob() {
    // if there is dependency
    // subsribe to each of them
    if (this.dependencies && this.dependencies.length) {
      for (let dependency of this.dependencies) {
        dependency.subscribe(this.trackDependency.bind(this));
        /**
         * Let's say A is dependent on C
         * So during the execution of A, inside C's subscription SubscribedList
         * The trackDependencyof A is pushed.
         * So when C finished execution, during done,
         * the trackDependency of A is called
         * What does track dependency do? Reduces the count of dependent
         * As C is already executed
         * If A has no other dependency, A is executed
         */
      }
    }
    // else invoke the callback directly
    else {
      /**
       * Callback function
       */
      this.job(this.done.bind(this));
    }
  }

  // if all the dependecies are excuted
  // invoke the callback
  trackDependency() {
    this.currentDependencyCount--;
    if (this.currentDependencyCount === 0) {
      /**
       * This is expected as the callback takes done as a parameter
       */
      this.job(this.done.bind(this));
    }
  }

  // push the callback to the list
  subscribe(cb) {
    /**
     * This subscribedList stores the trackDependency of dependency
     * It is filled when the task has a dependency
     * Initially a task, at the time of construction has no dependency
     * The moment processJOb function is executed, a furthur fucntion
     * will populate subscribedList
     *
     * The subscribedList has the trackDependency function
     * When the trackDependency is invoked? - in done
     *
     * Then it marks the isCompleted for itself as true
     *          It is simply invoke trackDependency function as
     */
    /**
     * C->A
     *
     */
    this.subscribedList.push(cb);
  }

  // if the current task is done
  // mark it as complete
  // invoke all the dependecy callbacks.
  // to print it in sequence
  done() {
    this.isCompleted = true;
    /**
     * SubscribedList: If a task
     */
    // console.log(JSON.stringify(this.subscribedList));
    for (const callback of this.subscribedList) {
      callback();
    }
  }
}

/**
 * Take a parameter in
 */
const processC = new Task(null, (done) => {
  setTimeout(() => {
    console.log("Process C");
    done();
  }, 1000);
});
/**
 * A dependent task that has a very high duration
 * Even if it has dependenies on few other task.
 * It has a dependency, it has already resolved.
 */
const processB = new Task([processC], (done) => {
  setTimeout(() => {
    console.log("Process B");
    done();
  }, 1500);
});
const processA = new Task([processB], (done) => {
  setTimeout(() => {
    console.log("Process A");
    done();
  }, 100);
});

// Output:
// "Process A"
// "Process C"
// "Process B"
// "Process D"
// "Process E"
// "All is done!"

