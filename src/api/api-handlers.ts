import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_CONFIG, DB_URL } from './api-config';

import { showNotification } from '../shared/notifications';
import { Spinner } from '../shared/spinner';
import { User } from '../components/sign-in/sign-in.model';
import { SignUpUserData } from '../components/sign-up/signUp.model';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }: {email: string, password: string}): Promise<any> => {
  return signInWithEmailAndPassword(auth, email, password)
  .catch((error) => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });
};

export const createUserAuthRequest = ({ email, password_1 }: {email: string, password_1: string}): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password_1);
};

export const createUserDataRequest = (user: SignUpUserData): Promise<any> => {
  const userData: SignUpUserData = user;

  delete userData.password_1;
  delete userData.password_2;
  
  return fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};

export const updateUser = (user: any, id: string): Promise<any> => {
  return fetch(
    `${DB_URL}/users/${id}.json`,
    {
      method: 'PUT',
      body: user
    }
    ).then((response) => response.json());
}

////////////////////////////////

const get = (url: string): Promise<any> => {
  return fetch(`${DB_URL}/${url}.json`)
  .then((response: Response) => {
    Spinner.hideSpinner();

    return response.json()
  })
  .catch(error => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });
}

const del = (url: string): Promise<any> => {
  return fetch(
    `${DB_URL}/${url}.json`,
    {
      method: 'DELETE'
    }
  ).then((response: Response) => {
    Spinner.hideSpinner();

    return response.json();
  })
  .catch(error => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });
}

const put = (url:string, body: any): Promise<any> => {
  return fetch(
    `${DB_URL}/${url}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(body)
    }
  ).then((response: Response) => {
    Spinner.hideSpinner();

    return response.json();
  })
  .catch(error => {
    Spinner.hideSpinner();
    showNotification(error.message);
  });
}

const post = (url: string, body: any): Promise<any> => {
  return fetch(
    `${DB_URL}/${url}.json`,
    {
      method: 'POST',
      body: JSON.stringify(body)
    }
  )
    .then((response: Response) => {
      Spinner.hideSpinner();

      return response.json();

    })
    .catch(error => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
}


export const apiService: {[key: string]: Function} = {
  get, 
  del,
  put,
  post
}
