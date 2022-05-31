import * as moment from "moment";

import { Header } from "../header/header";
import { Spinner } from "../../shared/spinner";
import { getUser, getTodos, createComment, updateTodo } from "../../api/api-handlers";
import { getCurrentUserData, getUserLocal } from "../../shared/services/local-storage-service";
import { showNotification} from '../../shared/notifications';

export const userDetailsHandler = async () => {
    const userDetails = document.querySelector('.user-details');
    const firstNameTag = document.getElementById('firstName');
    const lastNameTag = document.getElementById('lastName');
    const emailTag = document.getElementById('email');
    const birthTag = document.getElementById('birth');
    const photoWrapper = document.querySelector('.user-details__info__photo');
    const todosContainer = document.querySelector('.user-details__todos')

    const renderTodos = todosObj => {
        const authId = getCurrentUserData().authId;
        const todos =
        Object.keys(todosObj)
        .map(key => ({id: key, ...todosObj[key]}))
        .filter(todo => todo.UserId === authId);
        console.log(todos);
                
                todos.forEach(todo => {
                    const {title, description, date, id} = todo;
                    const todoItem = document.createElement('div');
                    const todoItemTitle = document.createElement('p');
                    const todoItemDescription = document.createElement('p');
                    const todoItemDate = document.createElement('span');
                    const commentContainer = document.createElement('div');
                    const commentText = document.createElement('textarea');
                    const submitCommentBtn = document.createElement('button');
                    
                    todoItemTitle.innerText = title;
                    todoItemDescription.innerText = description;
                    todoItemDate.innerText = moment(date).format('LLLL');
                    submitCommentBtn.innerText = 'Comment';
                    
                    commentText.setAttribute('placeholder', 'Leave comment here...');
                    todoItem.className = 'user-details__todos__todo';
                    commentText.className = 'form-control';
                    commentContainer.className = 'user-details__todos__todo__comment';
                    submitCommentBtn.className = 'btn btn-primary';
                    
                    console.log(todo);
                    submitCommentBtn.onclick = async () => {
                if (commentText.value) {
                    let commentId;
                    const comment = {
                        date: new Date(),
                        text: commentText.value,
                        todoId: id,
                        userId: getUserLocal().userId
                    };
                    let newTodo;
                    let comments;

                    await createComment(comment)
                        .then(response => commentId = response.name);
                    comments = todo.comments || [];
                    comments.push(commentId);

                    newTodo = {...todo, comments};
                    await updateTodo(newTodo, id)
                        .then(response => console.log(response));
                }
            }

            commentContainer.append(
                commentText, 
                submitCommentBtn
                );
            todoItem.append(
                todoItemTitle, 
                todoItemDate,
                todoItemDescription,
                commentContainer
                );
            todosContainer.append(todoItem);

        });

        console.log(todos);
    }

    Header.getHeader(userDetails);
    Spinner.showSpinner();
    await getUser(getCurrentUserData().userId)
    .then(({ firstName, lastName, email, birth }) => {
        const userPhoto = document.createElement('img');

        Spinner.hideSpinner();
        firstNameTag.innerText = firstName;
        lastNameTag.innerText = lastName;
        emailTag.innerText = email;
        birthTag.innerText = moment(birth).format('LL');
        userDetails.style.display = 'block';
        userPhoto.setAttribute('src', 'src/assets/img/no-avatar.png');
        photoWrapper.append(userPhoto);
        })
        .catch(error => {
            Spinner.hideSpinner();
            showNotification(error.message);
        });
    Spinner.showSpinner();
    await getTodos()
        .then(todos => {
        Spinner.hideSpinner();
        renderTodos(todos);
        })
        .catch(error => {
            Spinner.hideSpinner();
            showNotification(error.message);
        });
}
