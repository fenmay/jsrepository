import { getUser, clearUser, clearToken } from '../../shared/services/local-storage-service';
import { ROUTES } from '../../shared/constants/routes';

export class Header {
    constructor() {}

    static getHeader(place) {
        const { firstName, lastName, email } = getUser();
        const header = document.createElement('div');
        const headerLogo = document.createElement('div');
        const headerTitle = document.createElement('div');
        const headerUser = document.createElement('div');
        const headerUserInfo = document.createElement('div');
        const headerUserName = document.createElement('p');
        const headerUserEmail = document.createElement('p');
        const headerUserPhoto = document.createElement('div');
        const headerButtons = document.createElement('div');
        const headerFindUser = document.createElement('button');
        const headerLogOut = document.createElement('button');

        header.className = 'header';
        headerLogo.className = 'header__logo';
        headerUser.className = 'header__user';
        headerUserInfo.className = 'header__user__info';
        headerUserPhoto.className = 'header__user__photo';

        headerTitle.innerText = 'TODO LIST';
        headerUserName.innerText = `${firstName} ${lastName}`;
        headerUserEmail.innerText = email;
        headerFindUser.innerText = 'FIND USERS';
        headerLogOut.innerText = 'LOG OUT';

        headerLogo.append(headerTitle);
        headerUser.append(headerUserInfo, headerUserPhoto, headerButtons);
        headerUserInfo.append(headerUserName, headerUserEmail);
        headerButtons.append(headerFindUser, headerLogOut)
        header.append(headerLogo, headerUser);
        place.prepend(header); 

        headerLogOut.onclick = () => {
            clearUser();
            clearToken();
            window.location.href = ROUTES.sign_in;
          };

        headerFindUser.onclick = () => {
          window.location.href = ROUTES.find_users;
        };
    }
}
