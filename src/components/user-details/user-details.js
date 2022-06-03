import * as moment from "moment";

import { Header } from "../header/header";
import { Spinner } from "../../shared/spinner";
import { apiService } from "../../api/api-handlers";
import { getCurrentUserData, getUserLocal } from "../../shared/services/local-storage-service";
import { responseMapper } from "../../shared/helpers";
import { Comment } from "../comment/comment";

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

    const likeHandler = async (userId, commentId, isLikeWasDone) => {
        const comment = comments.find(({id}) => id === commentId);
        let likes = comments.likes || [];

        if (isLikeWasDone) {
            likes = likes.filter(id => id !== userId);
        } else {
            likes.push(userId);
        }

        await apiService.put(`comments/${commentId}`, {...comment, likes})
            .then(response => console.log('response', response))

        console.log(comment);
    };

    const renderTodos = todosObj => {
        const authId = getCurrentUserData().authId;
        const todos = responseMapper(todosObj, 'id').filter(todo => todo.UserId === authId);
                
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

                    if (comments) {
                        const filteredComments = comments.filter(comment => comment.todoId === id);

                        filteredComments.forEach(comment => {
                            const user = users.find(user => user.id === comment.commentatorId)
                            

                            leftComments.append(Comment.getComment(user, comment, likeHandler));
                            console.log('comments', comments);
                        })
                    }

                    console.log('users', users);
                    console.log('comments', comments);

                    todoItemTitle.innerText = title;
                    todoItemDescription.innerText = description;
                    todoItemDate.innerText = moment(date).format('LLLL');
                    submitCommentBtn.innerText = 'Comment';
                    
                    commentText.setAttribute('placeholder', 'Leave comment here...');
                    todoItem.className = 'user-details__todos__todo';
                    commentText.className = 'form-control';
                    commentContainer.className = 'user-details__todos__todo__comment';
                    submitCommentBtn.className = 'btn btn-primary';
                    
                    // console.log(todo);
                    submitCommentBtn.onclick = async () => {
                        if (commentText.value) {
                    let commentId;
                    let newTodo;
                    let comments;
                    const comment = {
                        date: new Date(),
                        text: commentText.value,
                        todoId: id,
                        userId: getCurrentUserData().userId,
                        commentatorId: getUserLocal().userId
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
    await apiService.get('users').then(response => {
        users = responseMapper(response, 'id');
    })
    await apiService.get('comments').then(response => {
        if (response) {
            comments = responseMapper(response, 'id').filter(comment => comment.userId === getCurrentUserData().userId);
        }
    })
    await apiService.get('todos').then(todos => renderTodos(todos));
    // await apiService.get('users').then(response => {
    //     users = responseMapper(response, 'id');
    // })
        
}
