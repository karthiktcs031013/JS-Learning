const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    taskForm.addEventListener('submit',addItem);
    taskList.addEventListener('click',removeItem);
    clearButton.addEventListener('click',clearTaskList);
    filter.addEventListener('keyup',showTaskItem);
}

function addItem(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    const liElement = document.createElement('li');
    liElement.className = 'collection-item';
    liElement.appendChild(document.createTextNode(taskInput.value));
    const linkElement = document.createElement('a');
    linkElement.className = 'delete-item secondary-content';
    linkElement.innerHTML='<i class="fa fa-remove"/>Remove';
    liElement.appendChild(linkElement);
    taskList.appendChild(liElement);
    taskInput.value = '';
    e.preventDefault();
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure to delete?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTaskList() {
    //Faster Approach
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // taskList.innerHTML='';
}

function showTaskItem(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);
    // console.log(taskList);
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent.toLowerCase();
        // console.log(item);
        // console.log(task);
        if(item.indexOf(text) != -1 ) {
            task.style.display = 'display';
            console.log('display');
        } else {
            task.style.display = 'none';
            console.log('none');
        }
    });
}