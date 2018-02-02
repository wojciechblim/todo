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
