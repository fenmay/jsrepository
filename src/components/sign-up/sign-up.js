import { createUserAuthRequest, createUserDataRequest } from '../../api/api-handlers';

export const signUpHandler = () => {
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const birthInput = document.getElementById('birthInput');
    const emailInput = document.getElementById('emailInput');
    const passInput1 = document.getElementById('passInput1');
    const passInput2 = document.getElementById('passInput2');
    const signUpBtn = document.getElementById('signUpBtn');
    const userData = {
        firstName: '',
        lastName: '',
        birth: '',
        email: '',
        password_1: '',
        password_2: '',
    }

    firstNameInput.oninput = () => {
        userData.firstName = firstNameInput.value;
        checkFormValid();
    }

    lastNameInput.oninput = () => {
        userData.lastName = lastNameInput.value;
        checkFormValid();
    }

    birthInput.oninput = () => {
        userData.birth = birthInput.value;
        checkFormValid();
    }

    emailInput.oninput = () => {
        userData.email = emailInput.value;
        checkFormValid();
    }

    passInput1.oninput = () => {
        userData.password_1 = passInput1.value;
        checkFormValid();
    }

    passInput2.oninput = () => {
        userData.password_2 = passInput2.value;
        checkFormValid();
    }

    signUpBtn.onclick = async () => {
        await createUserAuthRequest(userData)
            .then(response => console.log(response));
        await createUserDataRequest(userData)
            .then(res => res.json())
            .then(res => console.log(res))
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        const isPasswordEqual = userData.password_1 === userData.password_2;

        console.log(isPasswordEqual);
        
        isFormValid ?
            signUpBtn.removeAttribute('disabled') : 
            signUpBtn.setAttribute('disabled', true);
        }
}