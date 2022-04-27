//1. Реализуйте класс Student (Студент), который будет наследовать от класса User. 
//Этот класс должен иметь следующие свойства: name (имя, наследуется от User), 
//surname (фамилия, наследуется от User), year (год поступления в вуз). 
//Класс должен иметь метод getFullName() (наследуется от User), 
//с помощью которого можно вывести одновременно имя и фамилию студента. 
//Также класс должен иметь метод getCourse(), который будет выводить текущий курс студента (от 1 до 5). 
//Курс вычисляется так: нужно от текущего года отнять год поступления в вуз. Текущий год получите самостоятельно.
//P.S. по желанию можете добавить больше функционала и классов
const studName = document.getElementById('name');
const surname = document.getElementById('surname');
const year = document.getElementById('year');
const get_info = document.getElementById('get_info');
const clear = document.getElementById('clear');
const result = document.getElementById('result');
const fullName = document.createElement('p');
const whatYearStudy = document.createElement('p');

class User {
  constructor(studName, surname) {
    this.studName = studName;
    this.surname = surname;
  }
}

class Student extends User {
  constructor(studName, surname, year) {
    super(studName, surname);
    this.year = year;
  }

  getFullName() {
    fullName.innerHTML = '';
    fullName.append(`Student's name is ${this.studName.value}, surname is ${this.surname.value}.`);
    result.append(fullName);
  }

  getCourse() {
    const date = new Date();
    const calcYear = date.getFullYear() - this.year.value;
    let studyYear = '';
    const whatYear = new Map([
      [0, studyYear = 'first'],
      [1, studyYear = 'second'],
      [2, studyYear = 'third'],
      [3, studyYear = 'fourth'],
      [4, studyYear = 'fifth'],
    ]);

    whatYearStudy.innerHTML = '';
    studyYear = whatYear.get(calcYear);
    calcYear <= 4 && calcYear >= 0 ?
      whatYearStudy.append(`${this.studName.value} ${this.surname.value} is ${studyYear} year student.`) :
      whatYearStudy.append(`Strange. Is ${this.studName.value} ${this.surname.value} a timelord?`);
    
    result.append(whatYearStudy);
  }
}

const stud = new Student(studName, surname, year);

get_info.onclick = () => {
  result.innerHTML = '';
  stud.getFullName();
  stud.getCourse();
}

clear.onclick = () => result.innerHTML = '';

// 2. bind/call/apply (выберите сами)
// написать объект, поля которого будут методы:
// getFullName - полное имя
// getFullJob - Название компании и в скобках должность
// getBySalary - зп в бел.рублях
// И несколько объектов типа
// obj = {
//  firstname
//  lastname
//  salary
//  job = {
//   company
//   position
//  }
// }
// Привязываем контекст каждого объекта к методам объекта с функциями и выводим
const choose_object = document.getElementById('choose_object');
const get_obj = document.getElementById('get_obj');
const clear_obj = document.getElementById('clear_obj');
const obj_result = document.getElementById('obj_result');
const objName = document.createElement('p');
const objJob = document.createElement('p');
const objSalary = document.createElement('p');

const totalObj = {
  getFullName() {
    objName.innerHTML = '';
    objName.append(`Full name: ${this.firstname} ${this.lastname}`);
    obj_result.append(objName);
  },

  getFullJob() {
    objJob.innerHTML = '';
    objJob.append(`Job: "${this.job.company}" (${this.job.position})`);
    obj_result.append(objJob);
  },

  getBySalary() {
    objSalary.innerHTML = '';
    objSalary.append(`Salary: ${this.salary} BYN`);
    obj_result.append(objSalary);
  }
}

const firstObj = {
  firstname: 'Petr',
  lastname: 'Petrov',
  salary: 100500,
  job: {
    company: 'Cool Company',
    position: 'Cool worker'
  }
}

const secondObj = {
  firstname: 'Ivan',
  lastname: 'Ivanov',
  salary: 100200,
  job: {
    company: 'Another Cool Company',
    position: 'Still Cool worker'
  }
}

const thirdObj = {
  firstname: 'Klim',
  lastname: 'Klimov',
  salary: 100100,
  job: {
    company: 'Coolest Company',
    position: 'More Cool worker'
  }
}

get_obj.onclick = () => {
  switch (choose_object.value) {
    case 'noValue':
      obj_result.innerHTML = '';
      obj_result.innerHTML = 'Error! You did not choose an object!'
      
      break;
    case 'first':
      obj_result.innerHTML = '';
      totalObj.getFullName.call(firstObj);
      totalObj.getFullJob.call(firstObj);
      totalObj.getBySalary.call(firstObj);

      break;
    case 'second':
      obj_result.innerHTML = '';
      totalObj.getFullName.call(secondObj);
      totalObj.getFullJob.call(secondObj);
      totalObj.getBySalary.call(secondObj);
      
      break;
    case 'third':
      obj_result.innerHTML = '';
      totalObj.getFullName.call(thirdObj);
      totalObj.getFullJob.call(thirdObj);
      totalObj.getBySalary.call(thirdObj);
      
      break;
  };
};

clear_obj.onclick = () => obj_result.innerHTML = '';
