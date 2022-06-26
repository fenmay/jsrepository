export const showNotification = (message: string, isError: boolean = true) => {
    const body = document.getElementsByTagName('body')[0];

    
    body.insertAdjacentHTML(
        'afterbegin',
        `<div id="notification" class="notification ${isError ? 'error' : 'success'}">
            <p>${message}</p>
        </div>`
    );

    setTimeout((): void => {
        const notification = document.getElementById('notification');

        notification.remove();
    }, 3000);
}
