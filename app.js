

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event) {
    // Prevent form from submitting
  event.preventDefault();
  if (todoInput.value.length >= 1) {
    // Create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
    hideMessage();
    // Clear Todo INPUT VALUE
    todoInput.value = "";
    // event.stopPropagation();
  } else {
    document.getElementById('notasks').innerText = "Oops! You haven't typed anything yet.";
    // Create sanitize function later on for the innerHTML below
    function my_func() {
      document.getElementById('notasks').innerHTML = ("You're all caught up!</br><span>✓</span>");
    }
    setTimeout(my_func, 3000);
    hideMessage();
  }
}

// e.target is where the user clicks (button) > item.parentElement (div.todo) > becomes known as todo, passed into removeLocalTodos function
function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });
    removeLocalTodos(todo);
    hideMessage();
  }
  // Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    filterTodo();
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (filterOption.value) {
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "incomplete":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
        }
  });
}

// Save to local storage
function saveLocalTodos(todo) {
  // Check if I have anything in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Get from local storage
function getTodos() {
  let todos;
  // Check if I have anything in local storage
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(function (todo){
      // Create todo DIV
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      // Create LI
      const todoLi = document.createElement('li');
      todoLi.innerText = todo;
      todoLi.classList.add('todo-item');
      todoDiv.appendChild(todoLi);
      // Check Mark Button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
      // Trash Button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);
      // Append to list
      todoList.appendChild(todoDiv);
    });
  }
}

// Delete from local storage
function removeLocalTodos(todo) {
  let todos;
  // Check if I have anything in local storage
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function hideMessage() {
  const array = localStorage.getItem('todos');
  const showMessage = document.querySelector('.notasks');
  if (array === null || array.length <= 2) {
    showMessage.style.display = 'block';
  } else {
    showMessage.style.display = 'none';
  }
}

