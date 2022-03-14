const number = document.getElementById('input');
const get = document.querySelector('.get');
const clear = document.querySelector('.clear');
const for_result = document.getElementById('for_result');

let todos = [];

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(result => {
      todos = result;
      });

get.onclick = render = () => {
    const todo = todos.find(item => item.id == number.value);
    const title = document.createElement('p');
    const id = document.createElement('p');
    const progress = document.createElement('p');

    title.innerText = 'Title: ' + todo.title;
    id.innerText = 'Id: ' + todo.id;
    progress.innerText = todo.completed ? 
        'Completed' : 'In progress';
    
    for_result.append(title);
    for_result.append(id);
    for_result.append(progress);
}

clear.onclick = reverse = () => {
    for_result.innerHTML = '';
}
