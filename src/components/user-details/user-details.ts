import * as moment from "moment";

import { Header } from "../header/header";
import { Spinner } from "../../shared/spinner";
import { apiService } from "../../api/api-handlers";
import { getCurrentUserData, getUserLocal } from "../../shared/services/local-storage-service";
import { responseMapper } from "../../shared/helpers";
import { Comment } from "../comment/comment";
import { User } from "../sign-in/sign-in.model";
import { CommentModel } from "../comment/comment.model";
import { TodoModel } from "../todo/todo.model";

export const userDetailsHandler = async (): Promise<void> => {
    const userDetails = document.querySelector('.user-details') as HTMLElement;
    const firstNameTag = document.getElementById('firstName');
    const lastNameTag = document.getElementById('lastName');
    const emailTag = document.getElementById('email');
    const birthTag = document.getElementById('birth');
    const photoWrapper = document.querySelector('.user-details__info__photo');
    const todosContainer = document.querySelector('.user-details__todos');

    let comments: CommentModel[] = [];
    let users: User[] = [];

    const likeHandler = async (userId: string, commentId: string, isLikeWasDone: boolean): Promise<void> => {
        const comment: CommentModel = comments.find(({id}) => id === commentId);
        let likes: string[] = comment.likes || [];

        if (isLikeWasDone) {
            likes = likes.filter((id: string) => id !== userId);
        } else {
            likes.push(userId);
        }

        await apiService.put(`comments/${commentId}`, {...comment, likes});
    };

    const renderTodos = (todosObj: {[key: string]: TodoModel}) => {
        const authId = getCurrentUserData().authId;
        const todos = responseMapper(todosObj, 'id').filter((todo: TodoModel): boolean => todo.userId === authId);
                
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
                        const filteredComments: CommentModel[] = comments.filter((comment: CommentModel): boolean => comment.todoId === id);

                        filteredComments.forEach((comment: CommentModel): void => {
                            const user: User = users.find((user: User): boolean => user.id === comment.commentatorId)
                            

                            leftComments.append(Comment.getComment(user, comment, likeHandler));
                            console.log('comments', comments);
                        })
                    }

                    todoItemTitle.innerText = title;
                    todoItemDescription.innerText = description;
                    todoItemDate.innerText = moment(date).format('LLLL');
                    submitCommentBtn.innerText = 'Comment';
                    
                    commentText.setAttribute('placeholder', 'Leave comment here...');
                    todoItem.className = 'user-details__todos__todo';
                    commentText.className = 'form-control';
                    commentContainer.className = 'user-details__todos__todo__comment';
                    submitCommentBtn.className = 'btn btn-primary';
                    
                    submitCommentBtn.onclick = async (): Promise<void> => {
                        if (commentText.value) {
                    let commentId: string;
                    let newTodo: TodoModel;
                    let comments: string[];
                    const comment: CommentModel = {
                        date: (new Date()).toString(),
                        text: commentText.value,
                        todoId: id,
                        userId: getCurrentUserData().userId,
                        commentatorId: getUserLocal().userId
                    };

                    await apiService.post('comments', comment)
                        .then((response: {name: string}): string => commentId = response.name);
                    comments = todo.comments || [];
                    comments.push(commentId);

                    newTodo = {...todo, comments};
                    await apiService.put(`todos/${id}`, newTodo);
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
    .then(({ firstName, lastName, email, birth }: User) => {
        const userPhoto: HTMLElement = document.createElement('img');

        firstNameTag.innerText = firstName;
        lastNameTag.innerText = lastName;
        emailTag.innerText = email;
        birthTag.innerText = moment(birth).format('LL');
        userDetails.style.display = 'block';
        userPhoto.setAttribute('src', 'src/assets/img/no-avatar.png');
        photoWrapper.append(userPhoto);
        })
    Spinner.showSpinner();
    await apiService.get('users').then((response: {[key: string]: User}) => {
        users = responseMapper(response, 'id');
    })
    await apiService.get('comments').then((response: {[key: string]: CommentModel}) => {
        if (response) {
            comments = responseMapper(response, 'id').filter((comment: CommentModel): boolean => comment.userId === getCurrentUserData().userId);
        }
    })
    await apiService.get('todos').then((todos: {[key: string]: TodoModel}): void => renderTodos(todos));
    // await apiService.get('users').then(response => {
    //     users = responseMapper(response, 'id');
    // })
        
}
