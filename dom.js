// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  /*for rmove error msg when enter not valid value*/

  let field =   document.querySelector('input[name=description]');
  field.addEventListener('keyup',function(){
    /*for prevent error if the error*/
    if (document.querySelector('p.error') != null)
      document.querySelector('p.error').remove();
  });

  var state = []; // this is our initial todoList
  var sortodo = document.querySelector('.fas');
  sortodo.addEventListener('click', function() {
    var newState = todoFunctions.sortTodos(state, true);
    update(newState);
  });

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');

    // add span holding description
    let span = document.createElement('span');
    span.innerText = todo.description;

    /*start of editing*/
    span.setAttribute('id', todo.id);
    span.setAttribute('contenteditable', 'true');
    todoNode.appendChild(span);
    span.addEventListener('blur', function(e) {
      let id_element = e.target.id;
      let description_element = e.target.innerText;
      let new_array = todoFunctions.editTodo(state, id_element, description_element);
      update(new_array);
    })
    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    var item = document.createElement('i');
    item.classList.add('fa');
    item.classList.add('fa-trash-o');
    deleteButtonNode.appendChild(item);
    deleteButtonNode.addEventListener('click', function() {
      let dialog = document.getElementById('dialog');
      let button_ok = document.createElement('button');
      button_ok.textContent = "Delete";
      let button_cancel = document.createElement('button');
      button_cancel.textContent = "Cancel";
      dialog.textContent = "";
      let pragraph = document.createElement('p');
      pragraph.classList.add("delete_content");
      pragraph.innerText = " Are you sure to delete  ??";
      dialog.appendChild(pragraph);
      dialog.appendChild(button_ok);
      dialog.appendChild(button_cancel);
      dialog.showModal();
      button_cancel.addEventListener('click', function() {
        dialog.close();
      });
      button_ok.addEventListener('click', function() {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
        dialog.close();
      });
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement('button');
    var item = document.createElement('i');
    item.classList.add('fa');
    item.classList.add('fa-check');
    markButtonNode.appendChild(item);
    markButtonNode.addEventListener('click', function() {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);
    // add classes for css
    if (todo.done === true) {
      span.classList.add('finish');
    }
    return todoNode;
  };


  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      let description = document.querySelector('input[name=description]').value;
      let newState = todoFunctions.addTodo(state, description);
      if (newState === -1) {
        if (document.querySelector('p.error') != null)
          document.querySelector('p.error').remove();
        let error = document.createElement('p');
        error.classList.add('error');
        error.textContent = "Please Enter Valid Description .....";
        let parent = document.getElementById('add-todo');
        parent.appendChild(error);
      } else {
        document.querySelector('input[name=description]').value = '';
        update(newState);
      }
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');
    todoListNode.classList.add('list_todo')

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
