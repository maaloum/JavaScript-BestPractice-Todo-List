import getTasks from './getTasks.js';

const addTask = (task) => {
  const todos = getTasks();
  todos.push(task);
  localStorage.setItem('todos', JSON.stringify(todos));
};

export default addTask;
