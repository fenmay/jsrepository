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

function dayWeek(num) { }

const day = week.find((item, index, array) =>  {
    return index > 0 && index < 8
});


dayWeek(5);
console.log(day);

