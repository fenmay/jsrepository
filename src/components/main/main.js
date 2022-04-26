import { getUser } from '../../shared/services/local-storage-service';
import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';

export const mainPageHandler = async () => {
    const headerUserName = document.getElementById('userName');
    const headerEmail = document.getElementById('email');
    const todoWrapper = document.querySelector('.main__todos')
    const { firstName, lastName, email } = getUser();
    let todos = [];

    headerEmail.innerText = email;
    headerUserName.innerText = `${firstName} ${lastName}`;

    await getTodos().then(todosArr => {
      todos = Object.keys(todosArr).map(key => {
        const todo = {id: key, ...todosArr[key]};

        todoWrapper.append(new Todo(todo).getTodo());

        return todo;
      });
    });

  
    
  };
