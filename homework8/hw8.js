const x = document.getElementById('firstNumber');
const y = document.getElementById('secondNumber');
const chooseAction = document.getElementById('chooseAction');
const calculate = document.getElementById('calculate');
const clear = document.getElementById('clear');
const result = document.getElementById('result');

calculate.onclick = () => {
  const calc = new Map([
    ['noValue', result.innerHTML = 'error! You did not choose an action!'],
    ['plus',  (+x.value) + (+y.value)],
    ['minus',  (+x.value) - (+y.value)],
    ['multiply',  (+x.value) * (+y.value)],
    ['divide',  (+x.value) / (+y.value)],
    ['power',  Math.pow((+x.value), (+y.value))],
    ['squareRoot',  Math.sqrt((+x.value))]
  ]);

  result.innerHTML = '';
  result.append('Your result: ' + calc.get(chooseAction.value));
};

clear.onclick = () => result.innerHTML = '';
