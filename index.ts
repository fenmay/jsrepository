import './src/styles/style.scss';

import { PATHNAMES, ROUTES } from './src/shared/constants/routes';
import { signInHandler } from './src/components/sign-in/sign-in';
import { signUpHandler } from './src/components/sign-up/sign-up'
import { getToken, getUserLocal } from './src/shared/services/local-storage-service';
import { mainPageHandler } from './src/components/main/main';
import { findUsersHandler } from './src/components/find-users/find-users';
import { userDetailsHandler } from './src/components/user-details/user-details';
import { profileHandler } from './src/components/profile/profile';

const routerMap: Map<string, Function> = new Map([
    [PATHNAMES.profile, (): void => profileHandler()],
    [PATHNAMES.sign_in, (): void => signInHandler()],
    [PATHNAMES.find_users, (): Promise<void> => findUsersHandler()],
    [PATHNAMES.sign_up, (): void => signUpHandler()],
    [PATHNAMES.user_details, (): Promise<void> => userDetailsHandler()],
    [PATHNAMES.home, (): void =>  {
        getToken() && Object.values(getUserLocal()).length ?
            window.location.href = ROUTES.main :
            window.location.href = ROUTES.sign_in
    }],
    [PATHNAMES.main, (): void => {
        !getToken() && !getUserLocal() ? window.location.href = ROUTES.sign_in : mainPageHandler();
    }],
]);

window.onload = (): void => {
    const pathname: string = window.location.pathname;

    routerMap.get(pathname)();
}

//////////////////
/// TypeScript ///
//////////////////


// let a: number = 2; // a равен числу
// let b: number[] = [1, 2, 4, 8, 16] // b равен массиву чисел
// let c: any[] = [1, 2, 3, 4] // c равно массиву любых типов данных

// const sum = (c: number, d: number) => c + d; // сумма чисел x и y, не требует return

// const sum2 = (c: number, d: number): number => { // требует return
//     return c + d;
// } 

// interface Human {
//     isAlive: boolean
// }

// interface User extends Human { // интерфейс, как должно быть, унаследован от Human
//     name: string, // должно быть поле имя типа строка
//     age: number // должно быть поле возраст типа число
//     id: number | string, // id мб или числом, или строкой
    

//     job: Job,
//     // не обязательные поля:
//     isMarried?: boolean // может поле такое быть, а может не быть

// }

// interface Job {
//     position: string,
//     salary: number | string
// }

// const user: User = { // создаём user по типу User
//     isAlive: true,
//     name: 'Levi', // даём ему имя-строку
//     age: 35, // даём возраст-число
//     id: 'hhjhj', // даём id либо строкой, либо числом
//     job: {
//         position: 'frontend',
//         salary: 100500
//     }
// }

// const users: User[] = []; // массив интерфейсов User

// console.log(user);
