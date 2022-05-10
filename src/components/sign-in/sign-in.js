import { signInRequest, getUsers } from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken, setUser } from '../../shared/services/local-storage-service';
import { getToken } from '../../shared/services/local-storage-service';
import { Spinner } from '../../shared/spinner';
import { 
    emailValidator, 
    showErrorMessage, 
    hideErrorMessage, 
    errorTagsIds 
} from '../../shared/validators';

export const signInHandler = () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const passInput = document.getElementById('passInput');
    const emailInput = document.getElementById('mailInput');
    const userData = {
        email: '',
        password: ''
    }

    passInput.oninput = () => {
        userData.password = passInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
    }

    passInput.onblur = () => {
        if (!passInput.value) {
            passInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('pass1'));
        } else {
            passInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
        }
    }

    emailInput.oninput = () => {
        userData.email = emailInput.value;
        checkFormValid();
        hideErrorMessage('email_hide', errorTagsIds.get('email'));
        hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }

    emailInput.onblur = () => {
        if (!emailInput.value) {
            emailInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('required_email'));
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
        } else if (!emailValidator(emailInput.value)) {
            emailInput.classList.add('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
            showErrorMessage('email_show', errorTagsIds.get('email'));
        } else {
            emailInput.classList.remove('invalid-input');
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
            hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
        }
    }

    signInBtn.onclick = async () => {
        let userId = '';

        Spinner.showSpinner();
        await signInRequest(userData)
            .then(({ user: { accessToken, uid }}) => {
                setToken(accessToken);
                userId = uid;
            })
            .catch(err => Spinner.hideSpinner());
        await getUsers()
            .then(response => {
                const users = 
                    Object.keys(response)
                    .map(userId => ({ ...response[userId], userId }));
                const user = users.find(user => user.authId === userId);
                
                setUser(user);
                Spinner.hideSpinner();
                window.location.href = ROUTES.main; 
            })
            .catch(err => Spinner.hideSpinner());
    }

    const checkFormValid = () => {
        const isFormValid = Object.values(userData).every(value => !!value);
        
        isFormValid ?
            signInBtn.removeAttribute('disabled') : 
            signInBtn.setAttribute('disabled', true);
    }
}
