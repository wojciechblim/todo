function TodoModel(label, finished) {
  this.id = "m" + Math.floor(Math.random() * 1000);
  this.label = label;
  this.finished = finished;
  this.events = {};
}
TodoModel.prototype = {
  on: function(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  },
  off: function(eventName, callback) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === callback) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(callback => {
        callback(data);
      });
    }
  }
};

function AppView(root) {
  this.input = document.createElement("input");
  this.input.setAttribute("type", "text");
  this.el = document.createElement("div");
  this.btn = document.createElement("button");
  const textBtn = document.createTextNode("AddToDo");
  this.el.appendChild(this.input);
  this.btn.appendChild(textBtn);
  this.el.appendChild(this.btn);
  this.root = root;
  this.todoModels = [];
  this.btn.addEventListener("click", () => {
    this.addTodo();
  });
}

AppView.prototype = {
  render: function() {
    //this.root.innerHTML = "";
    this.root.appendChild(this.el);
    //this.todoModels.forEach(model => this.root.appendChild(new TodoElement(model).render()));
  },
  addTodo: function() {
    const todoModel = new TodoModel(this.input.value, false);
    this.todoModels.push(todoModel);
    todoModel.on("finish", () => {
      this.finishTodo(todoModel.id);
    });
    todoModel.on("delete", () => {
      if (todoModel.finished == true) {
        this.root.removeChild(todoEl.element);
        //usunac model z todomodels
      }
    });
    const todoEl = new ToDoElement(todoModel);
    this.root.appendChild(todoEl.render());
    //this.root.appendChild(new ToDoElement(todoModel).render());
  },
  finishTodo(id) {
    const todo = this.todoModels.find(todo => todo.id === id);
    if (todo) {
      todo.finished = true;
    }
  }
};

function ToDoElement(model) {
  this.model = model;
  this.element = document.createElement("div");
  const txtElement = document.createTextNode(this.model.label);
  this.checkBox = document.createElement("input");
  this.checkBox.setAttribute("type", "checkBox");
  this.label = document.createElement("label");
  this.label.appendChild(txtElement);
  this.element.appendChild(this.checkBox);
  this.element.appendChild(this.label);
  this.btn = document.createElement("button");
  const textBtn = document.createTextNode("delete");
  this.btn.appendChild(textBtn);
  this.element.appendChild(this.btn);

  this.checkBox.addEventListener("click", event => {
    if (this.checkBox.checked == true) {
      this.label.style.textDecoration = "line-through";
      this.model.emit("finish");
    } else {
      this.label.style.textDecoration = "none";
      this.model.finished = false;
    }
  });

  this.btn.addEventListener("click", () => {
    this.model.emit("delete");
  });
}

ToDoElement.prototype = {
  render: function() {
    return this.element;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const env = document.querySelector("#environment");
  const appView = new AppView(env);
  appView.render();
});
