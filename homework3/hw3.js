let display = document.querySelector('.display');
let numbers = document.querySelector('.numbers');
let clear = document.querySelector('.clear');
let action = document.querySelector('.actions');

let cache = [];

function numberClick(event) {
    let target = event.target;

    if (target.classList.contains('number')) {
        let number = target.dataset.value;

        if (number === '0' && !display.innerText) {
            return;
        }

        display.innerText = display.innerText + number;
    }
}

function clearClick(event) {
    display.innerText = '';
    cache = [];
}

function actionClick(event) {
    let target = event.target;
    
    if (target.classList.contains('action')) {

        switch (target.dataset.value) {
            case'+':
            case '-':
            case '*':
            case '/': {
                cache.push(+display.innerText);
                cache.push(target.dataset.value);
                display.innerText = '';
                break;
            }
            case '=': {
                cache.push(+display.innerText);
                display.innerText = calculator(cache);
                break;
            }
            default: {}
        }
    }
}

function sum(a, b) {
    return a + b;
}

function del(a, b) {
    return a - b;
}

function mult(a, b)
 {
     return a * b;
 }

 function dev(a, b) {
     return a / b;
 }

 const actMap = {
     '+': sum,
     '-': del,
     '*': mult,
     '/': dev
 }

 function calculator(arr) {
    for (i = 2; i < arr.length; i += 2) {
        arr[i] = actMap[arr[i - 1]](arr[i - 2], arr[i]);
    }
    return arr[arr.length - 1];
}

numbers.addEventListener('click', numberClick);
clear.addEventListener('click', clearClick);
action.addEventListener('click', actionClick);
