import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { FIREBASE_CONFIG, DB_URL } from './api-config';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const createUserAuthRequest = ({ email, password_1 }) => {
    return createUserWithEmailAndPassword(auth, email, password_1);
}

export const createUserDataRequest = user => {
    return fetch(
        `${DB_URL}/users.json`,
        {
            method: 'POST',
            body: JSON.stringify(user)
        }
    );
}