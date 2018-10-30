const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded',getTasks);
    taskForm.addEventListener('submit',addItem);
    taskList.addEventListener('click',removeItem);
    clearButton.addEventListener('click',clearTaskList);
    filter.addEventListener('keyup',showTaskItem);
}

function getTasks() {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        createLiElement(task);
    })

}

function addItem(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    createLiElement(taskInput.value);
    storeInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

function createLiElement(task) {
    const liElement = document.createElement('li');
    liElement.className = 'collection-item';
    liElement.appendChild(document.createTextNode(task));
    const linkElement = document.createElement('a');
    linkElement.className = 'delete-item secondary-content';
    linkElement.innerHTML='<i class="fa fa-remove"/>Remove';
    liElement.appendChild(linkElement);
    taskList.appendChild(liElement);
    
}

function storeInLocalStorage(task) {
    let tasks ;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure to delete?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskItemFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskItemFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index) {
        if(taskItem.firstChild.textContent === task) {
            tasks.splice(index ,1);
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTaskList() {
    //Faster Approach
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
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