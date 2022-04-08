import './src/styles/style.scss';

// // import { initializeApp } from "firebase/app";
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// // import { FIREBASE_CONFIG, DB_URL } from "./src/api/api-config";
 

// // const app = initializeApp(FIREBASE_CONFIG);
// // const auth = getAuth();

// // let mail = document.getElementById('mail');
// // let password = document.getElementById('password');
// // let sign = document.getElementById('sign');


// // sign.onclick = () => createUserWithEmailAndPassword(auth, mail.value, password.value)
// //   .then((userCredential) => {
// //     // Signed in 
// //     const user = userCredential.user;
// //     console.log(user);
// //     // ...
// //   })
// //   .catch((error) => {
// //     const errorCode = error.code;
// //     const errorMessage = error.message;
// //     // ..
// //     console.log(error);
// //   });

// // const createTodo = () => {
// //   fetch(
// //     `${DB_URL}/todos.json`,
// //     {
// //       method: 'POST',
// //       body: JSON.stringify({
// //         title: 'My todo 4',
// //         description: 'Do smth 4'
// //       })
// //     }
// //   )
// //     .then(response => response.json())
// //     .then(res => console.log('Response: ', res));
// // }

// // createTodo();

// const getTodo = () => {
//   fetch(`${DB_URL}/todos.json`)
//   .then(res => res.json())
//   .then(response => {
//     const arr = Object.keys(response).map(key => {
//       return {
//         ...response[key],
//         id: key
//       };
//     });

//     console.log(arr);
//   });
  
// }

// getTodo();

// // const updateTodo = () => {
// //   fetch(
// //     `${DB_URL}/todos/-MySloekn8qvP_FczoBc.json`,
// //     {
// //       method: 'PUT',
// //       body: JSON.stringify({
// //         title: 'Updated title',
// //         description: 'Updated description',
// //         testField: 'Hello world'
// //       })
// //     }
// //   );
// // }

// // updateTodo();

// // const deleteTodo = () => {
// //   fetch(`${DB_URL}/todos/-MySloekn8qvP_FczoBc.json`,
// //   {
// //     method: 'DELETE'
// //   });
// // }

// // deleteTodo();

// //это были CRUD

import { PATHNAMES, ROUTES } from './src/shared/constants/routes.js';
import { signInHandler } from './src/components/sign-in/sign-in.js';
import { signUpHandler } from './src/components/sign-up/sign-up'
import { getToken, getUser } from './src/shared/services/local-storage-service';

const routerMap = new Map([
    [PATHNAMES.home, () =>  window.location.href = ROUTES.sign_in],
    [PATHNAMES.sign_in, () => signInHandler()],
    [PATHNAMES.sign_up, () => signUpHandler()],
    [PATHNAMES.main, () => {
        !getToken() && !getUser() ? window.location.href = ROUTES.sign_in : null;
    }],
]);

window.onload = () => {
    const pathname = window.location.pathname;

    routerMap.get(pathname)();
}
