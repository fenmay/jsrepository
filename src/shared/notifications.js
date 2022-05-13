export const showNotification = (message = 'error text', isError = true) => {
    const body = document.getElementsByTagName('body')[0];

    
    body.insertAdjacentHTML(
        'afterbegin',
        `<div id="notification" class="notification ${isError ? 'error' : 'success'}">
            <p>${message}</p>
        </div>`
    );

    setTimeout(() => {
        const notification = document.getElementById('notification');

        notification.remove();
    }, 3000);
}
