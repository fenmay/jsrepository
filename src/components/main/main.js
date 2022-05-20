import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import { createTodo, updateTodo } from '../../api/api-handlers';
import { showNotification } from '../../shared/notifications';
import { getUser } from '../../shared/services/local-storage-service';

export const mainPageHandler = async () => {
  const mainPage = document.querySelector('.main');
  const todoWrapper = document.querySelector('.main__todos');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  
  const newTodo = {
    title: '',
    description: ''
  };

  let todos = [];
  let isEditMode = false;
  let editingTodoId = '';

  const clearForm = () => {
    newTodo.title = ''
    newTodo.description = ''
    title.value = null;
    description.value = null;
  }

  const iconClickHandler = todoId => {
    const findingTodo = todos.find(({id}) => id === todoId);

    editingTodoId = todoId;
    cancelBtn.style.display = 'inline';
    isEditMode = true;
    submitBtn.innerText = 'Save';
    title.value = findingTodo.title;
    newTodo.title = findingTodo.title;
    description.value = findingTodo.description;
    newTodo.description = findingTodo.description;
    checkIsFormValid();
  };

  const renderTodos = todosArr => {
    if (todosArr) {
      const id = getUser().authId;
      
      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map(key => {
        const todo = {id: key, ...todosArr[key]};
        
        if (todo.UserId === id) {
          todoWrapper.append(new Todo(todo, iconClickHandler).getTodo());        
        } 
        
        return todo;
      });
    } 
  }

  const checkIsFormValid = () => Object.values(newTodo).every(value => !!value) ?
    submitBtn.removeAttribute('disabled') : submitBtn.setAttribute('disabled', true); 

  const createNewTodo = async () => {
    Spinner.showSpinner();
    await createTodo({...newTodo, date: new Date(), UserId: getUser().authId})
    .then(response => {
      Spinner.hideSpinner();
      clearForm();
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

  const updateCurrentTodo = async () => {
    Spinner.showSpinner();
    await updateTodo({...newTodo, date: new Date(), UserId: getUser().authId}, editingTodoId)
      .then(response => {
        clearForm();
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

  title.oninput = () => {
    newTodo.title = title.value;
    checkIsFormValid();
  }
  
  description.oninput = () => {
    newTodo.description = description.value;
    checkIsFormValid();
  }

  submitBtn.onclick = async () => {
    isEditMode ? updateCurrentTodo() : createNewTodo();
  }

  cancelBtn.onclick = () => {
    clearForm();
    isEditMode = false;
    cancelBtn.style.display = 'none';
    submitBtn.innerText = 'Create Todo';
  }

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

}
