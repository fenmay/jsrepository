export class Header {
    constructor() {}

    getHeader() {

        const header = document.createElement('div');
        const headerLogo = document.createElement('div');
        const headerTitle = document.createElement('div');
        const headerUser = document.createElement('div');
        const headerUserInfo = document.createElement('div');
        const headerUserName = document.createElement('p');
        const headerUserEmail = document.createElement('p');
        const headerUserPhoto = document.createElement('div');
        const headerFindUsers = document.createElement('button');
        const headerLogOut = document.createElement('button');

        header.classList.add = 'main__header';
        headerLogo.classList.add = 'main__header__logo';
        headerTitle.innerText = 'TODO LIST';
        headerUser.classList.add = 'main__header__user';
        headerUserInfo.classList.add = 'main__header__user__info';
        headerUserPhoto.classList.add = 'main__header__user__photo';

        headerTitle.append(headerLogo);
        headerUserInfo.append(headerUser);
        headerUserName.append(headerUserInfo);
        headerUserEmail.append(headerUserInfo);
        
        // <div class="main__header">
        //         <div class="main__header__logo">
        //             <p>TODO LIST</p>
        //         </div>
        //         <div class="main__header__user">
        //             <div class="main__header__user__info">
        //                 <p id="userName"></p>
        //                 <p id="email"></p>
        //             </div>
        //             <div class="main__header__user__photo"></div>
        //             <button id="find-user">FIND USERS</button>
        //             <button id="logout">LOG OUT</button>
        //         </div>
        //     </div>
    }
}
