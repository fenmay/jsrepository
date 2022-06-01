import './src/styles/style.scss';

import { PATHNAMES, ROUTES } from './src/shared/constants/routes.js';
import { signInHandler } from './src/components/sign-in/sign-in.js';
import { signUpHandler } from './src/components/sign-up/sign-up'
import { getToken, getUserLocal } from './src/shared/services/local-storage-service';
import { mainPageHandler } from './src/components/main/main';
import { findUsersHandler } from './src/components/find-users/find-users';
import { userDetailsHandler } from './src/components/user-details/user-details';

const routerMap = new Map([
    [PATHNAMES.home, () =>  {
        getToken() && Object.values(getUserLocal()).length ?
            window.location.href = ROUTES.main :
            window.location.href = ROUTES.sign_in
    }],
    [PATHNAMES.sign_in, () => signInHandler()],
    [PATHNAMES.find_users, () => findUsersHandler()],
    [PATHNAMES.sign_up, () => signUpHandler()],
    [PATHNAMES.user_details, () => userDetailsHandler()],
    [PATHNAMES.main, () => {
        !getToken() && !getUserLocal() ? window.location.href = ROUTES.sign_in : mainPageHandler();
    }],
]);

window.onload = () => {
    const pathname = window.location.pathname;

    routerMap.get(pathname)();
}
