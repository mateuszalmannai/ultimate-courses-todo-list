import '../assets/css/style.css';

const app = document.getElementById('app');

app.innerHTML = `
    <div class="todos">
        <div class="todos-header">
            <h3 class="todo-title">Todo List</h3>
            <div>
                <p>You have <span class="todos-count"></span></p>
                <button type="button" class="todos-clear" style="display: none;">
                    Clear Completed
                </button>
            </div>
        </div>
        <form class="todos-form" name="todos">
            <input type="text" placeholder="What's next?" name="todo">
        </form>
        <ul class="todos-list"></ul>
    </div>
`;

// state
let todos = [];

// selectors
const root = document.querySelector('.todos');
const list = root.querySelector('.todos-list');
const count = root.querySelector('.todos-count');
count.innerText = "0 Items";
const form = document.forms.todos;
const input = form.elements.todo;

// functions
function renderTodos(todos){
    // <li>
    let todoString = '';
    todos.forEach((todo, index) => {
        todoString +=`
            <li data-id="${index}"${todo.complete ? ' class="todos-complete"':''}>
                <input type="checkbox"${todo.complete ? ' checked':''}>
                <span>${todo.label}</span>
                <button type="button"></button>
            </li>
        `;
    });
    list.innerHTML = todoString;
    count.innerText = todos.filter(todo => !todo.complete).length;
    let todosCount = parseInt(count.innerText, 10);
    count.innerText += `${ todosCount > 1 ? " Items"  : " Item"}`;
}

function addTodo(event){
    event.preventDefault();
    const label = input.value.trim();
    const complete = false;

    todos = [
        ...todos, 
        {
            label, 
            complete
        }
    ];
    renderTodos(todos);
    input.value = '';
}

function updateTodo(event){
    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);
    const complete = event.target.checked;
    todos = todos.map((todo, index) => {
        if(index === id){
            return {
                ...todo,
                complete
            };
        }
        return todo;
    });
    console.log(todos);
    renderTodos(todos);
}

// initialization
function init(){
    // Add Todo
    form.addEventListener('submit', addTodo);
    // Update Todo
    list.addEventListener('change', updateTodo);
}

init();
