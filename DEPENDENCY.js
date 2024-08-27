function taskA(done) {
  console.log("Calling A");
  console.log("Task A Completed");
  done();
}
function taskB(done) {
  console.log("Calling B");
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done) {
  console.log("Calling c");
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done) {
  console.log("Calling D");
  console.log("Task D Completed");
  done();
}
function taskE(done) {
  console.log("Calling E");
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};

// a
// a -> d
// a -> d -> b
// a -> d -> b -> c -> e

function runAsyncGraph(graph, callback) {
  const visited = new Set();
  const executionOrder = [];

  // Perform DFS to get the topological order
  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);

    const { dependency } = graph[node];
    if (dependency) {
      dependency.forEach((dep) => dfs(dep));
    }

    executionOrder.push(node);
  }

  // Execute tasks in topological order
  function executeTasks(index) {
    if (index >= executionOrder.length) {
      if (callback) callback();
      return;
    }

    const node = executionOrder[index];
    const task = graph[node].task;

    task(() => {
      executeTasks(index + 1);
    });
  }

  // Start DFS for each node to ensure all nodes are visited
  for (const node in graph) {
    dfs(node);
  }

  // Start executing tasks
  executeTasks(0);
}

// Example usage:
runAsyncGraph(asyncGraph, () => {
  console.log("All tasks completed");
});

// runAsyncGraph(asyncGraph, () => {
//   console.log("done");
// });
