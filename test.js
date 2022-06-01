// const user = {
//     name: 'Test',
//     age: 45,
//     sayHello() {
//         console.log(`Hello! I'm ${this.name}! I'm ${this.age} y.o.`);
//         console.log('x: ', x);
//     }
// }

// import { fn } from "moment";

// // console.log(user.name);
// user.sayHello()

// const petya = {
//     name: 'Petya',
//     age: 78,
    
// }

// const arr = [10, 5]
// user.sayHello.apply(petya, arr)
// // const logger = user.sayHello.bind(petya, 24);
// // logger();
// //и будет Hello! I'm Petya! I'm 78 y.o. x: 24

// class User {
//     static myStaticValue = 100;

//     #name;
//     #age;

//     constructor(name, age) {
//         this.#name = name;
//         this.#age = age;
//     }

//     get name() {
//         return this.#name;
//     }

//     set name(value) {
//         if (typeof value === 'string') {
//             this.#name = value;
//         }
//     }

//     sayHello() {
//         console.log(`Hello! I'm ${this.#age}. I'm ${this.#age} y.o.`);
//     }

//     logStaticValue() {
//         console.log(User.myStaticValue);
//     }

//     static logStatic() {
//         console.log(User.myStaticValue);
//     }
// }

// const gena = new User('Gena', 45);
// const vasya = new User('Vasya', 26);

// console.log(gena.name); //Gena
// gena.name = 'GGG'; //перезадали значение поля name у gena
// console.log(gena.name); //GGG

// gena.sayHello();
// gena.logStatic();
// vasya.sayHello();

// console.log(User.myStaticValue);


//Н А С Л Е Д О В А Н И Е
// class Pets {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }

// class Dog extends Pets { //Dog наследуется от Pets
    
//     constructor(name, age) {
//         super(name, age); //какие значения у родителя - у Pets
//     }

//     sayGau() {
//         console.log(`Gau gau, ${this.name}, ${this.age}`);
//     }
// }

// class Cat extends Pets { //Cat наследуется от Pets
//     constructor(name, age) {
//         super(name, age); //какие значения у родителя - у Pets
//     }

//     sayMeow() {
//         console.log(`Meow meow, ${this.name}, ${this.age}`);
//     }
// }

// const murzik = new Cat('Murzik', 5); //созд. кота с именем Мурзик возрастом 5
// const bobik = new Dog('Bobik', 10); //созд. пса с именем Бобик и возрастом 10

// murzik.sayMeow(); //Meow meow, Murzik, 5
// bobik.sayGau(); //Gau gau, Bobik, 10


// const first = (x) => {
//     console.log('first', x);
// }

// const second = fn => {
//     console.log('second');
//     fn(23);
// }

// second(first);

const obj = {
    name: 'Alex',
    age: 28
};

const field = 'name';

console.log(obj.field); // undefined
console.log(obj[field]); // Alex