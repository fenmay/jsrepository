import { REGEX } from "../../shared/regex";

export class PasswordStrenght {

    static checkPasswordInput(checkIsPasswordValid: Function): void {
        const passwordInput = document.getElementById('passInput1') as HTMLInputElement;
        const password_strength: HTMLElement = document.getElementById('password_strength');

        if (!!passwordInput.value) {
            password_strength.style.display = 'block';
        } else {
            password_strength.style.display = 'none';
        }
        
        passwordInput.oninput = (): void => {            
            const state_filler: HTMLElement = document.querySelector('.password-strength__state__filler') as HTMLInputElement;

            if (!!passwordInput.value) {
                const status_counter: number = 
                    +PasswordStrenght.searchRegexMatch(passwordInput.value, REGEX.upperCase, 'upper_case') +
                    +PasswordStrenght.searchRegexMatch(passwordInput.value, REGEX.lowerCase, 'lower_case') +
                    +PasswordStrenght.searchRegexMatch(passwordInput.value, REGEX.character, 'character') +
                    +PasswordStrenght.searchRegexMatch(passwordInput.value, REGEX.number, 'number') + 
                    +PasswordStrenght.searchRegexMatch(passwordInput.value, REGEX.passwordLength, 'length')

                checkIsPasswordValid(status_counter === 5);
                state_filler.style.width = `${status_counter / 5 * 100}%`;
            } else {
                checkIsPasswordValid(false);
            }
        };
    }

    static searchRegexMatch(str: string, regex: RegExp, tagId: string): boolean { 
        const matchResult: boolean = str.search(regex) !== -1;   
        const findingTag: HTMLElement = document.getElementById(tagId);
        
        matchResult ?
            findingTag.classList.add('active') :
            findingTag.classList.remove('active');
        
        return matchResult;
    }
}
