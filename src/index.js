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
            <input type="text" placeholder="What's next?" name="todo" v-on:keydown.enter="$event.stopPropagation()">
        </form>
        <ul class="todos-list"></ul>
    </div>
`;

// state
let todos = [];

// selectors
const form = document.forms.todos;
const input = form.elements.todo;

// functions
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
    console.log(todos);
    input.value = '';
}

// initialization
function init(){
    // Add Todo
    form.addEventListener('submit', addTodo);
}

init();
