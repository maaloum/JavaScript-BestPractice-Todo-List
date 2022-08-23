import './style.css';
import getTasks from './getTasks.js';
import addTask from './addTask.js';

let editableID;
let editBoleen = false;
const submit = document.querySelector('.enter');
const input = document.querySelector('.input');
const btnCompleted = document.querySelector('.btnCompleted');
const displayTodo = () => {
  const taskContainer = document.querySelector('.task-box');
  const todos = getTasks();
  let li = '';
  todos.forEach((todo, id) => {
    li += `<li class="task">
                <label for="${id}">
                  <input class ="task-cls" type="checkbox" data-id = ${id}>
                  <p>${todo.description}</p>
                </label>
                <div class="settings">
                  <i class="uil uil-ellipsis-h"></i>
                  <ul class="task-menu">
                    <li class = "edit" data-id= "${todo.description}" id="${id}"><i class="uil uil-pen"></i>Edit</li>
                    <li class = "delete" id="${id}"><i class="uil uil-trash-alt"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
  });

  taskContainer.innerHTML = li;
  document.querySelectorAll('.task-cls').forEach((check) => {
    check.addEventListener('click', (e) => {
      const taskName = e.target.parentElement.lastElementChild;
      if (e.target.checked) {
        taskName.style.textDecoration = 'line-through';
        todos[e.target.dataset.id].completed = true;
        btnCompleted.addEventListener('click', () => {
          const completed = todos.filter((todo) => todo.completed === false);
          completed.forEach((todo, index) => {
            todo.index = index + 1;
          });
          localStorage.setItem('todos', JSON.stringify(completed));
          displayTodo();
        });
      } else {
        taskName.style.textDecoration = 'none';
      }
    });
  });
  document.querySelectorAll('.delete').forEach((deletable) => {
    deletable.addEventListener('click', (e) => {
      const newTodos = getTasks();
      newTodos.splice(e.target.id, 1);
      newTodos.forEach((todo, index) => {
        todo.index = index + 1;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      displayTodo();
    });
  });
  document.querySelectorAll('.edit').forEach((editable) => {
    editable.addEventListener('click', (e) => {
      input.value = e.target.dataset.id;
      editableID = e.target.id;
      editBoleen = true;
    });
  });
};

displayTodo();
submit.addEventListener('click', () => {
  const userInput = input.value.trim();
  const todos = getTasks();
  if (userInput) {
    if (!editBoleen) {
      const newTask = {
        description: userInput,
        completed: false,
        index: todos.length + 1,
      };
      addTask(newTask);
      displayTodo();
      input.value = '';
    } else {
      editBoleen = false;
      todos[editableID].description = userInput;
      localStorage.setItem('todos', JSON.stringify(todos));
      window.location.reload();
      input.value = '';
    }
  }
});
