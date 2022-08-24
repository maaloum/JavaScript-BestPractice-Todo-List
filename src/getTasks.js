const getTasks = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  return todos;
};
export default getTasks;
