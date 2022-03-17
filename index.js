import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_CONFIG } from "./src/api/api-config";
import './style.scss';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

let mail = document.getElementById('mail');
let password = document.getElementById('password');
let sign = document.getElementById('sign');


sign.onclick = () => createUserWithEmailAndPassword(auth, mail.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(error);
  });
