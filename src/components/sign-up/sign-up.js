import { 
    signInRequest,
    createUserAuthRequest, 
    createUserDataRequest,
    getUser
} from '../../api/api-handlers';

import { setToken, setUser } from '../../shared/services/local-storage-service';
import { ROUTES } from '../../shared/constants/routes';

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
        const { email, password_1: password } = userData;
        let authId = '';
        let userId = '';

        await createUserAuthRequest(userData)
            .then(response => authId = response.user.uid);
        await createUserDataRequest({...userData, authId})
            .then(res =>  userId = res.name);
        await signInRequest({email, password})
            .then(({ user: { accessToken }}) => setToken(accessToken))
            .catch(err => console.log('Invalid credentials'));
        await getUser(userId).then((res) => {
            window.location.href = ROUTES.main
            setUser(res);
        });
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