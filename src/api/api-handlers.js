import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_CONFIG, AUTH_URL, DB_URL } from './api-config';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUserAuthRequest = ({ email, password_1 }) => {
  return createUserWithEmailAndPassword(auth, email, password_1);
};

export const createUserDataRequest = (user) => {
  const userData = user;

  delete userData.password_1;
  delete userData.password_2;
  
  return fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};

export const getUsers = () => {
  return fetch(`${DB_URL}/users.json`).then((response) => response.json());
};

export const getUser = (id) => {
  return fetch(`${DB_URL}/users/${id}.json`).then((response) => response.json());
};

export const updateUser = (user, id) => {
  return fetch(
    `${DB_URL}/users/${id}.json`,
    {
      method: 'PUT',
      body: user
    }
    ).then((response) => response.json());
}

export const getTodos = () => {
  return fetch(`${DB_URL}/todos.json`).then(response => response.json());
}

export const createTodo = todo => {
  return fetch(
    `${DB_URL}/todos.json`,
    {
      method: 'POST',
      body: JSON.stringify(todo)
    }
  ).then(response => response.json());
}

export const updateTodo = (todo, id) => {
  return fetch(
    `${DB_URL}/todos/${id}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(todo)
    }
  ).then(response => response.json());
}

export const deleteTodo = id => {
  return fetch(
    `${DB_URL}/todos/${id}.json`,
    {
      method: 'DELETE'
    }
  ).then(response => response.json());
}

export const createComment = comment => {
  return fetch(
    `${DB_URL}/comments.json`,
    {
      method: 'POST',
      body: JSON.stringify(comment)
    }
  ).then(response => response.json());
}
