export class Spinner {
    static showSpinner(): void {
        const body: HTMLElement = document.getElementsByTagName('body')[0];

        body.insertAdjacentHTML(
            'afterbegin',
            `<div id="spinner" class="spinner">
                <div class="spinner-border text-primary" role="status"></div>
            </div>`
        )
    }

    static hideSpinner(): void {
        const spinner: HTMLElement = document.getElementById('spinner');

        spinner ? spinner.remove() : null;
    }
}