function ToDoElement(value){
  this.element = document.createElement("div");
  const txtElement = document.createTextNode(value);
  this.element.appendChild(txtElement);
}

ToDoElement.prototype = {
  render: function(){
    return this.element;
  }
}

function Form(){
  this.element = document.createElement("input");
  this.element.setAttribute("type", "text");
  this.element.setAttribute("value", "");

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
});
