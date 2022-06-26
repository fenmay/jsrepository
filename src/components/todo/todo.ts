import { TodoModel } from "./todo.model";

export class Todo {
    private readonly id: string;
    private readonly description: string;
    private readonly title: string;
    private readonly isComplete: boolean;

    private readonly editFn: Function;
    private readonly deleteFn: Function;
    private readonly setIsComplete: Function;

    constructor(
        { id = '', description = '', title = '', isComplete = false }: TodoModel, 
        editFn:Function, 
        deleteFn: Function, 
        setIsComplete: Function
    ) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.isComplete = isComplete;
        this.editFn = editFn;
        this.deleteFn = deleteFn;
        this.setIsComplete = setIsComplete;
    }

    getTodo(): HTMLElement {
        const todoWrapper = document.createElement('div');
        const title = document.createElement('h4');
        const description = document.createElement('p');
        const editIcon = document.createElement('div');
        const deleteIcon = document.createElement('div');
        const togglerWrapper = document.createElement('div');
        const toggler = document.createElement('input');
        const togglerLabel = document.createElement('span');

        editIcon.onclick = () => this.editFn(this.id);
        deleteIcon.onclick = () => this.deleteFn(this.id);
        
        editIcon.innerHTML = '<i class="fa-solid fa-pen-to-square edit-icon"></i>';
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
        todoWrapper.className = 'todo';
        togglerWrapper.className = 'form-check form-switch toggler';
        toggler.className = 'form-check-input';
        toggler.setAttribute('type', 'checkbox');
        title.innerText = this.title;
        description.innerText = this.description;
        togglerLabel.innerText = 'Set TODO as complited';

        if (this.isComplete) {
            toggler.setAttribute('checked', 'true');
            todoWrapper.classList.add('active');
        } else {
            toggler.removeAttribute('checked');
        }


        toggler.onclick = (event: PointerEvent): void => {
            this.setIsComplete((event.target as HTMLInputElement).checked, this.id)
        };

        togglerWrapper.append(toggler, togglerLabel);

        todoWrapper.append(title, description, togglerWrapper, editIcon, deleteIcon);
        
        return todoWrapper;
    }
}