export class Todo {
    #id;
    #description;
    #title;
    #fn;

    constructor({ id, description, title }, fn) {
        this.#id = id;
        this.#description = description;
        this.#title = title;
        this.#fn = fn;
    }

    getTodo() {
        const todoWrapper = document.createElement('div');
        const title = document.createElement('h4');
        const description = document.createElement('p');
        const icon = document.createElement('div');

        icon.onclick = () => this.#fn(this.#id);
        
        icon.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        todoWrapper.className = 'todo';
        title.innerText = this.#title;
        description.innerText = this.#description;

        todoWrapper.append(title, description, icon);
        
        return todoWrapper;
    }
}