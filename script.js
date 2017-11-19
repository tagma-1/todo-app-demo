let todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
}

let handlers = {
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.value);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
}

let view = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = ''
    for (let i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement('li');
      let todo = todoList.todos[i];
      let todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;  
      }

      todoLi.textContent = todoTextWithCompletion;
      todoLi.id = i;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function () {
    let todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event) {
      let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        todoPosition = parseInt(elementClicked.parentNode.id);
        handlers.deleteTodo(todoPosition);
      }
    });
  }
}

view.setupEventListeners();
