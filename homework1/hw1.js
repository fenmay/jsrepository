// '123456' -> '654321'

const str1 = '123456';
const str2 = str1.split('').reverse().join('');

console.log(str2);


// 'http:// ..... .html'

const str = 'http://vgghg.html';


if (str.indexOf(".html") === str.length - 5 && str.indexOf("http://") === 0) {
    console.log('Строка соответствует заданным требованиям');
  } 
  else  {
      console.log('Строка не соответствует заданным требования');
  };


// 1-7 пн-вс

const week = ['0', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье',];
let day = 3;

switch (day) {
    case 1:
        console.log('Понедельник');
        break;
    case 2:
        console.log('Вторник');
        break;
    case 3:
        console.log('Среда');
        break;
    case 4:
        console.log('Четверг');
        break;
    case 5:
        console.log('Пятница');
        break;
    case 6:
        console.log('Суббота');
        break;
    case 7:
        console.log('Воскресенье');
        break;

    default:
        console.log('Не день недели');
        break;
}
  