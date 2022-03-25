import moment from 'moment';
import './src/styles/style.scss';

// Это часы работы ресторана
// Вам надо написать метод, который будет принимать день недели и время. 
// И метод будем определять, сможете ли вы сделать заказ или нет. 
// Учитывайте тот факт, что за пол часа до закрытия или 
// перерыва заказ не может быть оформлен. Ну типа кухня закрывается

const day = document.getElementById('day');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const tryBtn = document.getElementById('try');
const clear = document.getElementById('clear');
const for_result = document.getElementById('for_result');
const can = document.createElement('p');
const cannot = document.createElement('p');

const openingHours = {
    dayOfWeek: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    periods: [
      [
        {
          from: '10:00',
          to: '14:00'
        },
        {
          from: '15:00',
          to: '18:00'
        },
        {
          from: '18:30',
          to: '22:00'
        }
      ],
      [
        {
          from: '10:00',
          to: '14:00'
        },
        {
          from: '15:00',
          to: '18:00'
        },
        {
          from: '18:30',
          to: '22:00'
        }
      ],
      [
        {
          from: '10:00',
          to: '14:00'
        },
        {
          from: '15:00',
          to: '18:00'
        },
        {
          from: '18:30',
          to: '22:00'
        }
      ],
      [
        {
          from: '10:00',
          to: '14:00'
        },
        {
          from: '15:00',
          to: '18:00'
        },
        {
          from: '18:30',
          to: '22:00'
        }
      ],
      [
        {
          from: '08:00',
          to: '12:00'
        },
        {
          from: '13:00',
          to: '19:00'
        },
        {
          from: '19:30',
          to: '23:30'
        }
      ],
    ]
  };

// массив дней пн-чт
const baseDays = openingHours.dayOfWeek.slice(0, 4);

can.innerText = 'You can make an order';
cannot.innerText = 'You cannot make an order. Choose another time';

const baseTime = tryBtn.onclick = () => {
  moment().hours(hours.value).minutes(minutes.value) > moment().hours(10).minutes(0) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(13).minutes(30) ?
    for_result.append(can) : moment().hours(hours.value).minutes(minutes.value) > moment().hours(15).minutes(0) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(17).minutes(30) ?
      for_result.append(can) : moment().hours(hours.value).minutes(minutes.value) > moment().hours(18).minutes(30) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(21).minutes(30) ?
        for_result.append(can) : for_result.append(cannot);
}

const fridayTime = tryBtn.onclick = () => {
  moment().hours(hours.value).minutes(minutes.value) > moment().hours(8).minutes(0) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(11).minutes(30) ?
    for_result.append(can) : moment().hours(hours.value).minutes(minutes.value) > moment().hours(13).minutes(0) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(18).minutes(30) ?
      for_result.append(can) : moment().hours(hours.value).minutes(minutes.value) > moment().hours(19).minutes(30) && moment().hours(hours.value).minutes(minutes.value) < moment().hours(23).minutes(0) ?
        for_result.append(can) : for_result.append(cannot);
}

baseDays.includes(day.value.toUpperCase(), 0) ?
baseTime() : fridayTime();

clear.onclick = () => {
  for_result.innerHTML = '';
}
