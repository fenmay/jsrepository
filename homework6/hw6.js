let number = document.getElementById('input');
const get = document.querySelector('.get');
const clear_res = document.querySelector('.clear_res');
const clear_request = document.querySelector('.clear_request');
const for_result = document.getElementById('for_result');
const title = document.createElement('p');
const id = document.createElement('p');
const progress = document.createElement('p');
const deleteTodo = document.createElement('button');
const end = +number.value + 30;


    
get.onclick = () => {
    let todos = [];

    for (index = +number.value; index < end; index++) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
        .then(response => response.json())
        .then(result => {
            todos = result;
            console.log(todos);
                
            title.innerText = 'TITLE: ' + todos.title + '; ';
            id.innerText = 'ID: ' + todos.id + '; ';
            progress.innerText = todos.completed ? 
                'STATE: Completed' : 'STATE: In progress';
            deleteTodo.className = 'delete_todo';
            deleteTodo.innerText = 'Delete Todo';
        });
        for_result.append(title, id, progress, deleteTodo);
    }
}

clear_res.onclick = () => {
    for_result.innerHTML = '';
}

clear_request.onclick = () => {
    number.value = '';
}

deleteTodo.onclick = () => {
    for_result.innerText = '';
}
