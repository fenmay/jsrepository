import { signInRequest } from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken } from '../../shared/services/local-storage-service';

export const signInHandler = () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const passInput = document.getElementById('passInput');
    const mailInput = document.getElementById('mailInput');
    const userData = {
        email: '',
        password: ''
    }

    passInput.oninput = () => {
        userData.password = passInput.value;
        checkFormValid();
    }

    mailInput.oninput = () => {
        userData.email = mailInput.value;
        checkFormValid();
    }

    signInBtn.onclick = () => {
        signInRequest(userData)
        .then(({ user: { accessToken }}) => {
            setToken(accessToken);
            window.location.href = ROUTES.main;
        })
        .catch(err => console.log('Invalid credentials'));
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        
        isFormValid ?
            signInBtn.removeAttribute('disabled') : 
            signInBtn.setAttribute('disabled', true);
    }
}
