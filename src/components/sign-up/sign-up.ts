import * as moment from 'moment';

import { 
    signInRequest,
    createUserAuthRequest, 
    createUserDataRequest,
    apiService
} from '../../api/api-handlers';
import { setToken, setUserLocal } from '../../shared/services/local-storage-service';
import { ROUTES } from '../../shared/constants/routes';
import { emailValidator, showErrorMessage, hideErrorMessage } from '../../shared/validators';
import { Spinner } from '../../shared/spinner';
import { errorTagsIds } from '../../shared/validators';
import { SignUpUserData} from './signUp.model';
import { signInResponse, User } from '../../components/sign-in/sign-in.model';
import { MainKeyValueItem } from '../../shared/models/main.model';

export const signUpHandler = () => {
    const firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement;
    const lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement;
    const birthInput = document.getElementById('birthInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    const passInput1 = document.getElementById('passInput1') as HTMLInputElement;
    const passInput2 = document.getElementById('passInput2') as HTMLInputElement;
    const signUpBtn = document.getElementById('signUpBtn') as HTMLInputElement;
    const userData: SignUpUserData  = {
        firstName: '',
        lastName: '',
        birth: '',
        email: '',
        password_1: '',
        password_2: '',
    }

    firstNameInput.oninput = (): void => {
        userData.firstName = firstNameInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
    }

    firstNameInput.onblur = (): void => {
        if (!firstNameInput.value) {
            firstNameInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('first_name'));
        } else {
            firstNameInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
        }
    }

    lastNameInput.oninput = (): void => {
        userData.lastName = lastNameInput.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
    }

    lastNameInput.onblur = (): void => {
        if (!lastNameInput.value) {
            lastNameInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('last_name'));
        } else {
            lastNameInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('last_name'));
        }
    }

    birthInput.oninput = (): void => {
        userData.birth = moment(birthInput.value).format();
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('birth'));
    }

    birthInput.onblur = (): void => {
        if (!birthInput.value) {
            birthInput.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('birth'));
        } else {
            birthInput.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('birth'));
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
            showErrorMessage('required_show', errorTagsIds.get('required_email'));
            hideErrorMessage('email_hide', errorTagsIds.get('email'));
            emailInput.classList.add('invalid-input');
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

    passInput1.oninput = (): void => {
        userData.password_1 = passInput1.value;
        checkFormValid();
        hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
    }

    passInput1.onblur = (): void => {
        if (!passInput1.value) {
            passInput1.classList.add('invalid-input');
            showErrorMessage('required_show', errorTagsIds.get('pass1'));
        } else {
            passInput1.classList.remove('invalid-input');
            hideErrorMessage('required_hide', errorTagsIds.get('pass1'));
        }
    }

    passInput2.oninput = (): void => {
        userData.password_2 = passInput2.value;
        checkFormValid();
        hideErrorMessage('passwords_hide', errorTagsIds.get('pass2'));
    }

    passInput2.onblur = (): void => {
        if (passInput1.value !== passInput2.value) {
            passInput2.classList.add('invalid-input');
            showErrorMessage('passwords_show', errorTagsIds.get('pass2'));
        } else {
            passInput1.classList.remove('invalid-input');
            hideErrorMessage('passwords_hide', errorTagsIds.get('pass2'));
        }
    }

    signUpBtn.onclick = async (): Promise<void> => {
        const { email, password_1: password } = userData;
        
        let requestCount: number = 0;
        let authId: string = '';
        let userId: string = '';

        Spinner.showSpinner();
        await createUserAuthRequest(userData)
            .then((response: signInResponse | any) => {
                authId = response.user.uid;
                requestCount++;
            })
            
        await createUserDataRequest({...userData, authId})
            .then((res: MainKeyValueItem) => {
                userId = res.name;
                requestCount++;
            })
            
        await signInRequest({email, password})
            .then(({ user: { accessToken }}: signInResponse | any) =>  {
                setToken(accessToken);
                requestCount++;
            })
            
        await apiService.get(`/users/${userId}`)
            .then((res: User) => {
                setUserLocal(res);
                requestCount++;
            })

        if (requestCount === 4) {
            window.location.href = ROUTES.main;
        }
    }

    const checkFormValid = (): void => {
        const isFormValid: boolean = Object.values(userData).every(value => !!value);
        const isPasswordEqual: boolean = userData.password_1 === userData.password_2;

        isFormValid && isPasswordEqual ?
            signUpBtn.removeAttribute('disabled') : 
            signUpBtn.setAttribute('disabled', 'true');
        }
}
