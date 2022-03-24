import './src/styles/style.scss';

// Это часы работы ресторана
// Вам надо написать метод, который будет принимать день недели и время. 
// И метод будем определять, сможете ли вы сделать заказ или нет. 
// Учитывайте тот факт, что за пол часа до закрытия или 
// перерыва заказ не может быть оформлен. Ну типа кухня закрывается

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

const newDay = openingHours.dayOfWeek;
const monThur = openingHours.periods[0];
const fri = openingHours.periods[4];

console.log(newDay);
console.log(monThur);
console.log(fri);

let arrTime = [];

const fourDays = Object.values(monThur);
const strDays = Object.values(fourDays[0]) + ' ' + Object.values(fourDays[1]) + ' ' + Object.values(fourDays[2]);
const newTimes = strDays.split(',').join();
// const omg = newTimes.split('');
// .join(' ');
// .split(' ');
console.log(newTimes);

// let slicedHours = [];
// for (let index = 0; index < newTimes.length; index++) {
//     slicedHours = slicedHours + newTimes[index].slice(0, 2).split(',');
    
// }
// console.log(slicedHours);

// let goodTimes = slicedHours.split('');
// console.log(goodTimes);
// for (let index = 0; index < finallyFourDays.length; index++) {
//     arrTime.push(finallyFourDays[index])
    
// }
// console.log(arrTime);


