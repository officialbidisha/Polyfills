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
-----------------------------------------------------------------------------------------------------------------------------------------

// Approach 2

class Task {
    dependencies;
    job;
    currentDependencyCount;
    isCompleted;
    subscribedList;

    constructor(dependencies = [], job) {
        this.dependencies = dependencies ? dependencies.filter(dependency => dependency instanceof Task && !dependency.isCompleted) : [];
        this.currentDependencyCount = this.dependencies.length;
        this.job = job;
        this.isCompleted = false;
        this.processJob();
        this.subscribedList = [];
    }

    processJob() {
        if (this.dependencies && this.dependencies.length) {
            for (let dependency of this.dependencies) {
                dependency.subscribe(this.trackDependency.bind(this));
            }
        } else {
            this.job(this.done.bind(this));
        }
    }

    trackDependency() {
        this.currentDependencyCount--;
        if (this.currentDependencyCount === 0) {
            this.job(this.done.bind(this));
        }
    }

    subscribe(cb) {
        this.subscribedList.push(cb);
    }

    done() {
        this.isCompleted = true;
        for (const callback of this.subscribedList) {
            callback();
        }
    }
}

const processA = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process A');
        done();
    }, 100);
});

const processB = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process B');
        done();
    }, 1500);
});

const processC = new Task(null, (done) => {
    setTimeout(() => {
        console.log('Process C');
        done();
    }, 1000);
});

const processD = new Task([processA, processB], (done) => {
    setTimeout(() => {
        console.log('Process D');
        done();
    }, 1000);
})

const processE = new Task([processC, processD], (done) => {
    setTimeout(() => {
        console.log('Process E');
        done();
    }, 100);
});

const createAllDoneInstance = (allDoneCallback) => new Task([processA, processB, processC, processD, processE], allDoneCallback);

createAllDoneInstance((done) => {
    console.log('All is done!');
    done();
});
