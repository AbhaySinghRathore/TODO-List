//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', action);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    event.preventDefault();
    //making a new div
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');

    //making li
    const newListItem = document.createElement('li');

    //making input tag
    const inpTag = document.createElement('input');
    inpTag.type = 'text';
    const valueOfInp = todoInput.value;
    inpTag.value = valueOfInp;
    inpTag.classList.add('addedInput');

    //appending input to list item
    newListItem.appendChild(inpTag);

    // saving value of input to local storage
    saveLocalTodos(todoInput.value);

    //creating a checked button
    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fa fa-check-square"></i>';
    checked.classList.add('check-btn');

    //creating a delete button
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fa fa-trash"></i>';
    trash.classList.add('delete-btn');

    newDiv.appendChild(newListItem);
    newDiv.appendChild(checked);
    newDiv.appendChild(trash);

    //appending newDiv to ul
    todoList.appendChild(newDiv);
    todoInput.value = "";
}

function action(e) {
    const target = e.target;
    // console.log(target);
    if (target.classList[0] === 'delete-btn') {
        const parent = target.parentElement;
        // console.log("Hey")
        parent.classList.add("fall");
        removeLocalTodos(parent);
        parent.addEventListener('transitionend', () => {
            parent.remove();
        })
    }
    if (target.classList[0] === 'check-btn') {
        const parent = target.parentElement;
        const asd = parent.querySelectorAll("input");
        const a = asd[0];
        a.classList.toggle('done');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    const len = todos.length;
    for (let i = 1; i <= len; i++) {
        switch (e.target.value) {
            case 'all':
                todos[i].style.display = "flex";
                break;
            case 'completed':
                // console.log(todos[i]);
                const t = todos[i].getElementsByTagName('INPUT');
                const list = t[0].classList;
                console.log(list.contains('done'));
                if (list.contains('done')) {
                    todos[i].style.display = "flex";
                }
                else {
                    todos[i].style.display = "none";
                }
                break
            case 'incompleted':
                // console.log(todos[i]);
                const ta = todos[i].getElementsByTagName('INPUT');
                const lista = ta[0].classList;
                console.log(lista.contains('done'));
                if (!lista.contains('done')) {
                    todos[i].style.display = "flex";
                }
                else {
                    todos[i].style.display = "none";
                }
                break
        }
    }

}


function saveLocalTodos(todo) {
    let todos;
    //checking any todos exists already?
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// this function shows all the elements we have in our 
// local storage in todos.(even after refreshing the page
//  they will remain in the UI if they exist in the local storage)
function getTodos() {
    let todos;
    //checking any todos exists already?
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        //making a new div
        const newDiv = document.createElement('div');
        newDiv.classList.add('todo');

        //making li
        const newListItem = document.createElement('li');

        //making input tag
        const inpTag = document.createElement('input');
        inpTag.type = 'text';
        // const valueOfInp = todoInput.value;
        inpTag.value = todo;
        inpTag.classList.add('addedInput');

        //appending input to list item
        newListItem.appendChild(inpTag);

        //creating a checked button
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fa fa-check-square"></i>';
        checked.classList.add('check-btn');

        //creating a delete button
        const trash = document.createElement('button');
        trash.innerHTML = '<i class="fa fa-trash"></i>';
        trash.classList.add('delete-btn');

        newDiv.appendChild(newListItem);
        newDiv.appendChild(checked);
        newDiv.appendChild(trash);

        //appending newDiv to ul
        todoList.appendChild(newDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    //checking any todos exists already?
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let op=todo.firstChild.firstChild.value;
    // console.log(todos.indexOf(op));
    let indexOfElementToBeRemoved=todos.indexOf(op);
    todos.splice(indexOfElementToBeRemoved,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}