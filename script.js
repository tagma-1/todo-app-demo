let todo_list = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your ToDos are empty!');
    } else {
      console.log('My Todos:');
      for (let i = 0; i < this.todos.length; i++) {
        let todo = this.todos[i];
        if (todo.completed === true) {
          console.log("(x)", todo.todoText);
        } else {
          console.log("( )", todo.todoText);
        }
      }
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    
    // Add up the toal number of completed todos
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    
    // If all the todos are completed, toggle all of them to uncompleted
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
      
    // Otherwise, toggle all of the todos to completed
    } else {
        for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
    
    this.displayTodos();
  }
}

let handlers = {
  displayTodos: function() {
    todo_list.displayTodos();
  },
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todo_list.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todo_list.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  deleteTodo: function() {
    let deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todo_list.deleteTodo(deleteTodoPositionInput.value);
    deleteTodoPositionInput.value = '';
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todo_list.toggleCompleted(toggleCompletedPositionInput.value);
    toggleCompletedPositionInput.value = '';
  },
  toggleAll: function() {
    todo_list.toggleAll();
  }
}