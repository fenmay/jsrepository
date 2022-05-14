import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import { createTodo } from '../../api/api-handlers';
import { showNotification } from '../../shared/notifications';
import { getUser } from '../../shared/services/local-storage-service';

export const mainPageHandler = async () => {
  const mainPage = document.querySelector('.main');
  const todoWrapper = document.querySelector('.main__todos');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitBtn = document.getElementById('submitBtn');
  const newTodo = {
    title: '',
    description: ''
  };
  let todos = [];

  const renderTodos = todosArr => {
    if (todosArr) {
      const id = getUser().authId;

      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map(key => {
        const todo = {id: key, ...todosArr[key]};
        
        if (todo.UserId === id) {
          todoWrapper.append(new Todo(todo).getTodo());        
        } 
        
        return todo;
      });
    } 
  }

  const checkIsNewTodoValid = () => Object.values(newTodo).every(value => !!value) ?
    submitBtn.removeAttribute('disabled') : submitBtn.setAttribute('disabled', true); 
    
  Header.getHeader(mainPage);
  Spinner.showSpinner();
  await getTodos()
    .then(todosArr => {
      Spinner.hideSpinner();
      renderTodos(todosArr);
  })
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });

    title.oninput = () => {
      newTodo.title = title.value;
      checkIsNewTodoValid();
    }

    description.oninput = () => {
      newTodo.description = description.value;
      checkIsNewTodoValid();
    }

    submitBtn.onclick = async () => {
      Spinner.showSpinner();
      await createTodo({...newTodo, date: new Date(), UserId: getUser().authId})
      .then(response => {
        Spinner.hideSpinner();
        title.value = null;
        description.value = null;
      })
      .catch(error => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });
      await getTodos()
      .then(todosArr => {
        Spinner.hideSpinner();
        renderTodos(todosArr);
    })
      .catch(error => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });
  }
}
