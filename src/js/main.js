//сумма квадратов элементов массива

const arr = [5, 8, 7, 6, 12, 5]

const arr_2 = arr.reduce((acc, number) => {

    return acc + number*number;    
}, 0)

console.log(arr_2);