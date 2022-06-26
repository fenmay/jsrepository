import { signInRequest, apiService } from '../../api/api-handlers';
import { ROUTES } from '../../shared/constants/routes';
import { setToken, setUserLocal } from '../../shared/services/local-storage-service';
import { Spinner } from '../../shared/spinner';
import { responseMapper } from '../../shared/helpers';
import { SignInUserData, signInResponse, UserResponse, User } from './sign-in.model';
import { 
    emailValidator, 
    showErrorMessage, 
    hideErrorMessage, 
    errorTagsIds 
} from '../../shared/validators';

export const signInHandler = (): void => {
    const signInBtn: HTMLElement = document.getElementById('sign-in-btn');
    const passInput = document.getElementById('passInput') as HTMLInputElement;
    const emailInput = document.getElementById('mailInput') as HTMLInputElement;
    const userData: SignInUserData = {
        email: '',
        password: ''
    };

    passInput.oninput = (): void => {
        userData.password = passInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
    }

    passInput.onblur = (): void => {
        if (!passInput.value) {
            passInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('pass1'));
        } else {
            passInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
        }
    }

    emailInput.oninput = (): void => {
        userData.email = emailInput.value;
        checkFormValid();
        hideErrorMessage('email_hide', errorTagsIds.get('email'));
        hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }

    emailInput.onblur = (): void => {
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

    signInBtn.onclick = async (): Promise<void> => {
        let userId: string = '';
        let requestCount: number = 0;

        Spinner.showSpinner();
        await signInRequest(userData)
            .then(({ user: { accessToken, uid }} : signInResponse | any): void => {
                setToken(accessToken);
                userId = uid;
                requestCount++;
            })
            
        await apiService.get('users')
            .then((response: UserResponse) => {
                const users: User[] = responseMapper(response, 'userId');
                const user: User = users.find(user => user.authId === userId);
                
                requestCount++;
                setUserLocal(user);
            })
            

            if (requestCount === 2) {
                window.location.href = ROUTES.main; 
            }
    }

    const checkFormValid = (): void => {
        const isFormValid: boolean = Object.values(userData).every(value => !!value);
        
        isFormValid ?
            signInBtn.removeAttribute('disabled') : 
            signInBtn.setAttribute('disabled', 'true');
    }
}
