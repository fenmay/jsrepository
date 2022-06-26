import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import {  apiService } from '../../api/api-handlers';
import { getUserLocal } from '../../shared/services/local-storage-service';
import { Modal } from '../../shared/modal';
import { MODAL_MESSAGES } from '../../shared/constants/modal-messages';
import { newTodo, TodoModel } from '../todo/todo.model';

export const mainPageHandler = async () => {
  const mainPage = document.querySelector('.main');
  const todoWrapper = document.querySelector('.main__todos');
  const title = document.getElementById('title') as HTMLInputElement;
  const description = document.getElementById('description') as HTMLTextAreaElement;
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  
  const newTodo: newTodo = {
    title: '',
    description: ''
  };

  let todos: TodoModel[] = [];
  let isEditMode = false;
  let editingTodoId = '';
  let deletingTodoId = '';

  const clearForm = (): void => {
    newTodo.title = ''
    newTodo.description = ''
    title.value = null;
    description.value = null;
  }

  const editTodoHandler = (todoId: string): void => {
    const findingTodo: TodoModel = todos.find(({id}: TodoModel) => id === todoId);

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

  const deleteSelectedTodo = async (): Promise<void> => {
    Spinner.showSpinner();
    await apiService.del(`todos/${deletingTodoId}`);
    await apiService.get('todos').then((todosArr: {[key: string]: TodoModel}) => renderTodos(todosArr));
  }

  const deleteTodoHandler = (todoId: string): void => {
    deletingTodoId = todoId;
    new Modal(MODAL_MESSAGES.deleteTodo, deleteSelectedTodo).showModal();
  }

const setIsComplete = (isComplete: boolean, todoId: string): void => {
  const findingTodo: TodoModel = todos.find((todo: TodoModel) => todo.id === todoId);

  delete findingTodo.id;
  updateCurrentTodo({...findingTodo, isComplete}, todoId);
}

  const renderTodos = (todosArr: {[key: string]: TodoModel}): void => {
    if (todosArr) {
      const id: string = getUserLocal().authId;
      
      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map(key => {
        const todo: TodoModel = {id: key, ...todosArr[key]};
        
        if (todo.userId === id) {
          todoWrapper.append(
            new Todo(
              todo, 
              editTodoHandler, 
              deleteTodoHandler,
              setIsComplete
              ).getTodo());        
        } 
        
        return todo;
      });
    } else todoWrapper.innerHTML = null;
  }

  const checkIsFormValid = (): void => Object.values(newTodo).every(value => !!value) ?
    submitBtn.removeAttribute('disabled') : submitBtn.setAttribute('disabled', 'true'); 

  const createNewTodo = async (): Promise<void> => {
    Spinner.showSpinner();
    
    const todo: TodoModel = {
      ...newTodo, 
        date: new Date(), 
        userId: getUserLocal().authId, 
        isComplete: false,
        comments: []
    }
    await apiService.post('todos', todo).then(() => clearForm());
    await apiService.get('todos').then((todosArr: {[key: string]: TodoModel}) => renderTodos(todosArr));
  }

  const updateCurrentTodo = async (todo: TodoModel, id: string): Promise<void> => {
    Spinner.showSpinner();
    await apiService.put(`todos/${id}`, todo).then(() => clearForm());
    await apiService.get('todos').then((todosArr: {[key: string]: TodoModel}) => renderTodos(todosArr));
  }

  title.oninput = (): void => {
    newTodo.title = title.value;
    checkIsFormValid();
  }
  
  description.oninput = (): void => {
    newTodo.description = description.value;
    checkIsFormValid();
  }

  submitBtn.onclick = async (): Promise<void> => {
    if (isEditMode) {
      const findingTodo: TodoModel = todos.find((todo: TodoModel) => todo.id === editingTodoId);
      const todoToRequest: TodoModel = {...findingTodo, ...newTodo, date: new Date(), userId: getUserLocal().authId};
      updateCurrentTodo(todoToRequest, editingTodoId);
    } else createNewTodo();
   
  }

  cancelBtn.onclick = (): void => {
    clearForm();
    isEditMode = false;
    cancelBtn.style.display = 'none';
    submitBtn.innerText = 'Create Todo';
  }

  Header.getHeader(mainPage);
  Spinner.showSpinner();
  await apiService.get('todos').then((todosArr: {[key: string]: TodoModel}) => renderTodos(todosArr));
}
