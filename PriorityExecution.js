function resolvePromisesWithPriority(promises) {
  // sort the promises based on priority
  promises.sort((a, b) => a.priority - b.priority);

  // track the rejected promise
  let rejected = {};

  // track the result
  let result = {};

  // track the position of the most priority
  let mostPriority = 1;

  // track the no of promises executed
  let taskCompleted = 0;

  // return a new promise
  return new Promise((resolve, reject) => {
    // run each task in parallel
    promises.forEach(({ task, priority }, i) => {
      // if the task is done
      // store it in the result
      task
        .then((value) => {
          result[priority] = value;
          mostPriority = Math.min(mostPriority, i + 1);
          console.log("MOST", mostPriority);
        })
        .catch((error) => {
          // if the promise is rejected
          // track the rejected promises just for reference
          rejected[priority] = true;

          // if the rejected task is the most priority one
          // move to the next most priority
          if (priority === promises[mostPriority - 1].priority) {
            mostPriority++;
          }
        })
        .finally(() => {
          // if the value priority is not reject
          // and is the least priority
          //resolve with these value
          if (
            !rejected[priority] &&
            priority === promises[mostPriority - 1].priority
          ) {
            resolve(priority);
          }

          // track the no of tasks completed
          taskCompleted++;

          // if all the tasks are finished and none of them have been resolved
          // reject with custom error
          if (taskCompleted === promises.length) {
            reject("All Apis Failed");
          }
        });
    });
  });
}
function createAsyncTask(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 7) {
        reject();
      } else {
        resolve(value);
      }
    }, value * 100);
  });
}

const promises = [
  { task: createAsyncTask(1), priority: 1 },
  { task: createAsyncTask(4), priority: 4 },
  { task: createAsyncTask(3), priority: 3 },
  { task: createAsyncTask(2), priority: 2 },
];

resolvePromisesWithPriority(promises).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);
