import * as moment from "moment";
import { Header } from "../header/header";
import { Spinner } from "../../shared/spinner";
import { getUser, getTodos } from "../../api/api-handlers";
import { getCurrentUserData } from "../../shared/services/local-storage-service";
import { showNotification} from '../../shared/notifications';

export const userDetailsHandler = async () => {
    const userDetails = document.querySelector('.user-details');
    const firstNameTag = document.getElementById('firstName');
    const lastNameTag = document.getElementById('lastName');
    const emailTag = document.getElementById('email');
    const birthTag = document.getElementById('birth');
    const photoWrapper = document.querySelector('.user-details__info__photo');

    const renderTodos = todosObj => {
        const userId = getCurrentUserData().authId;
        const todos = 
            Object.keys(todosObj)
            .map(key => ({id: key, ...todosObj[key]}))
            // .filter(todo => );
        console.log(todos);
        // users = Object.keys(response).map(userId => ({ ...response[userId], userId }));
    }

    Header.getHeader(userDetails);
    Spinner.showSpinner();
    await getUser(getCurrentUserData().userId)
    .then(({ firstName, lastName, email, birth }) => {
        const userPhoto = document.createElement('img');

        Spinner.hideSpinner();
        firstNameTag.innerText = firstName;
        lastNameTag.innerText = lastName;
        emailTag.innerText = email;
        birthTag.innerText = moment(birth).format('LL');
        userDetails.style.display = 'block';
        userPhoto.setAttribute('src', 'src/assets/img/no-avatar.png');
        photoWrapper.append(userPhoto);
        })
        .catch(error => {
            Spinner.hideSpinner();
            showNotification(error.message);
        });
    Spinner.showSpinner();
    await getTodos()
        .then(todos => {
        Spinner.hideSpinner();
        renderTodos(todos);
        })
        .catch(error => {
            Spinner.hideSpinner();
            showNotification(error.message);
        });
}