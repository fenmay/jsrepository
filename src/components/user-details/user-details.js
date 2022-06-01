import * as moment from "moment";

import { Header } from "../header/header";
import { Spinner } from "../../shared/spinner";
import { apiService } from "../../api/api-handlers";
import { getCurrentUserData, getUserLocal } from "../../shared/services/local-storage-service";
import { responseMapper } from "../../shared/helpers";

export const userDetailsHandler = async () => {
    const userDetails = document.querySelector('.user-details');
    const firstNameTag = document.getElementById('firstName');
    const lastNameTag = document.getElementById('lastName');
    const emailTag = document.getElementById('email');
    const birthTag = document.getElementById('birth');
    const photoWrapper = document.querySelector('.user-details__info__photo');
    const todosContainer = document.querySelector('.user-details__todos');

    let comments;
    let users;
    const renderTodos = todosObj => {
        const authId = getCurrentUserData().authId;
        const todos = responseMapper(todosObj, 'id')
            .filter(todo => todo.UserId === authId);
        // const todos =
        // Object.keys(todosObj)
        //     .map(key => ({id: key, ...todosObj[key]}))
        //     .filter(todo => todo.UserId === authId);

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
                    const leftComments = document.createElement('div');

                    const filteredComments = comments.filter(comment => comment.todoId === id);

                    filteredComments.forEach(comment => {
                        const leftCommentWrapper = document.createElement('div');

                        leftCommentWrapper.className = 'user-details__todos__todo__left-comment-wrapper';
                        leftComments.append(leftCommentWrapper);
                    })

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
                    let newTodo;
                    let comments;
                    const comment = {
                        date: new Date(),
                        text: commentText.value,
                        todoId: id,
                        userId: getUserLocal().userId
                    };

                    await apiService.post('comments', comment)
                        .then(response => commentId = response.name);
                    comments = todo.comments || [];
                    comments.push(commentId);

                    newTodo = {...todo, comments};
                    await apiService.put(`todos/${id}`, newTodo)
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
                leftComments,
                commentContainer,
                );
            todosContainer.append(todoItem);

        });

    }

    Header.getHeader(userDetails);
    Spinner.showSpinner();
    await apiService.get(`users/${getCurrentUserData().userId}`)
    .then(({ firstName, lastName, email, birth }) => {
        const userPhoto = document.createElement('img');

        firstNameTag.innerText = firstName;
        lastNameTag.innerText = lastName;
        emailTag.innerText = email;
        birthTag.innerText = moment(birth).format('LL');
        userDetails.style.display = 'block';
        userPhoto.setAttribute('src', 'src/assets/img/no-avatar.png');
        photoWrapper.append(userPhoto);
        })
    Spinner.showSpinner();
    await apiService.get('comments').then(response => {
        // comments = Object.keys(response)
        //     .map(key => ({ id: key, ...response[key] }))
        //     .filter(comment => comment.userId === getCurrentUserData().userId);
        comments = responseMapper(response, 'id').filter(comment => comment.userId === getCurrentUserData().userId);
    })
    await apiService.get('todos').then(todos => renderTodos(todos));
    await apiService.get('users').then(response => {
        // users = Object.keys(response).map(key => ({...response[key], id: key}))
        users = responseMapper(response, 'id');
        console.log(users);
    })
        
}
