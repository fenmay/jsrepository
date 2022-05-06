import { REGEX } from "./regex";

const errorsMessages = new Map([
    ['email', 'Invalid email template. Please, correct it.']
]);

const tagsHandler = (id) => {
    const error_tag = document.getElementById(id);
    error_tag.style.display = 'block';
    error_tag.innerText = errorsMessages.get('email');
}

const errorTagsHandlers = new Map([
    ['email', () => tagsHandler(errorTagsIds.get('email'))]
]);

const errorTagsIds = new Map([
    ['email', 'emailInputError']
]);

export const emailValidator = email => REGEX.email.test(email);

export const showErrorMessage = (error_type) => {
    errorTagsHandlers.get(error_type)();
}
