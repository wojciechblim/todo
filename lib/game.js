function ToDoElement(value){
  this.element = document.createElement("div");
  const txtElement = document.createTextNode(value);
  this.checkBox = document.createElement("input");
  this.checkBox.setAttribute("type", "checkBox");
  this.label = document.createElement("label");
  this.label.appendChild(txtElement);
  this.element.appendChild(this.checkBox);
  this.element.appendChild(this.label);

  this.checkBox.addEventListener("click", event=>{
    if(this.checkBox.checked == true){
      this.label.style.textDecoration = "line-through";
    }else{
      this.label.style.textDecoration = "none";
    }
  });

  this.events = {};
}

ToDoElement.prototype = {
  render: function(){
    return this.element;
  },
  /*remove: function(){
    const parent = this.element.parentNode;
    parent.removeChild(this.element);
  }*/
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
}

function Form(){

  this.element = document.createElement("input");
  this.element.setAttribute("type", "text");
  this.element.setAttribute("value", "");
//keep all the toDoElements
  this.retain = [];

  this.element.addEventListener("keydown", event => {
    if(event.key == "Enter"){
      createAndAddToDoEl(this.element.value);
      this.element.value = "";
    }

  });

}

Form.prototype = {
  render: function(){
    return this.element;
  }
}

function createAndAddToDoEl(value){
  const toDo = new ToDoElement(value);
  document.body.appendChild(toDo.render());
}


document.addEventListener("DOMContentLoaded",()=>{
  const form = new Form();
  document.body.appendChild(form.render());
  const btn = new Button();
  document.body.appendChild(btn.render());
});

function Button(){
  this.element = document.createElement("button");
  const textBtn = document.createTextNode("delete");
  this.element.appendChild(textBtn);
}

Button.prototype = {
  render: function(){
    return this.element;
  }
}
