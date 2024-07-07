// Function to create a task that returns a promise which resolves after a random delay
function createTask(id) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500ms and 1500ms
    setTimeout(() => {
      resolve(`Task ${id} completed in ${delay} ms`);
    }, delay);
  });
}

// Number of tasks to create
const numberOfTasks = 5;

// Generate an array of tasks
const tasks = [];
for (let i = 0; i < numberOfTasks; i++) {
  tasks.push(createTask(i + 1));
}

// Function to process tasks as they complete
async function processTasks(tasks) {
  const pendingTasks = new Set(tasks); // Use a set to track pending tasks

  while (pendingTasks.size > 0) {
    // Convert the set to an array and use Promise.race to get the first completed promise
    const firstCompleted = await Promise.race(pendingTasks);
    console.log(firstCompleted);

    // Find and remove the completed task from the set
    for (const task of pendingTasks) {
      task
        .then((result) => {
          if (result === firstCompleted) {
            pendingTasks.delete(task);
          }
        })
        .catch(() => {
          pendingTasks.delete(task); // Also handle rejected promises
        });
    }
  }
}

// Start processing tasks
processTasks(tasks);
