//# # # # 
// # # # #
//# # # # 
// # # # #
//# # # # 
// # # # #
//# # # # 
// # # # #

let str = '';

for (i = 0; i < 56; i += 7) {
    if (i % 2 === 0) {
        str = str + ' # # # #\n';
    } else str = str + '# # # # \n';
}

console.log(str);

//функция, считающая факториал от числа

function factorial(num) {
    if (num === 1) {
        return num;
    } else {
        return num * factorial(num - 1);
    }
}

console.log(factorial(3));

//сортировка массива методом пузырьков без использования Sort()

const arr = [7, 4, 10, 2, 29, 119, -65, 1, -1];

for (i = 0; i < arr.length; i++) {
    for (let k = i + 1; k < arr.length; k++) {
        if (arr[i] > arr[k]) {
            var temp = arr[i];
            arr[i] = arr[k];
            arr[k] = temp;
        }
    }
}

console.log(arr);

//В переменных size и unit хранятся размер и единицы измерения
//информации 120 и "Кб" соответственно. Зная, что могут быть заданные
//Кб, Мб, Гб (кило-, мега- и гигабайты) и 1 килобайт равен 1024 байта,
//найти количество байт в size

const size = 120;
const unit = 'б';

function sizeBite(size) {
    if (unit === 'Кб') {
        return size;
    } else if (unit === 'Мб') {
        return size / 1024;
    } else if (unit === 'Гб') {
        return size / 1048576;
    } else if (unit === 'б') {
        return size * 1024;
    }
}

console.log(sizeBite(size));
