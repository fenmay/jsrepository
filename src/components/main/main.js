import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';

export const mainPageHandler = async () => {
  const mainPage = document.querySelector('.main');
  const todoWrapper = document.querySelector('.main__todos');
  let todos = [];
    
  Header.getHeader(mainPage);
  Spinner.showSpinner();
  await getTodos().then(todosArr => {
      todos = Object.keys(todosArr).map(key => {
        const todo = {id: key, ...todosArr[key]};

        todoWrapper.append(new Todo(todo).getTodo());
        Spinner.hideSpinner();
        
        return todo;
      });
    }).catch(error => Spinner.hideSpinner());
};
