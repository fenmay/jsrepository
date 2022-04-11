const x = document.getElementById('firstNumber');
const y = document.getElementById('secondNumber');
const chooseAction = document.getElementById('chooseAction');
const calculate = document.getElementById('calculate');
const clear = document.getElementById('clear');
const result = document.getElementById('result');

const noValue = () => result.innerHTML = 'Your result: error! You did not choose an action!';
const plus = (x, y) => (+x.value) + (+y.value);
const minus = (x, y) => (+x.value) - (+y.value);
const multiply = (x, y) => (+x.value) * (+y.value);
const divide = (x, y) => (+x.value) / (+y.value);
const power = (x, y) => Math.pow((+x.value), (+y.value));
const squareRoot = (x) => Math.sqrt((+x.value));

calculate.onclick = () => {
  const calc = new Map([
    ['noValue', noValue],
    ['plus',  plus],
    ['minus',  minus],
    ['multiply',  multiply],
    ['divide',  divide],
    ['power',  power],
    ['squareRoot',  squareRoot]
  ]);

  result.innerHTML = '';
  chooseAction.value === 'noValue' ? 
    noValue() : result.innerHTML = 'Your result: ' + calc.get(chooseAction.value)(x, y);
};

clear.onclick = () => result.innerHTML = '';
