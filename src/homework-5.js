//creating objects via {}

const human = {
  name: 'Petro',
  age: 20,
  city: 'Lviv'
};

const secondHuman = {
  name: 'Ivan',
  age: 25,
  city: 'Kyiv'
};

const thirdHuman = {
  name: 'Vasyl',
  age: 30,
  city: 'Odesa'
};

//creating objects via Object

const otherPerson = new Object();
otherPerson.name = 'Petro';
otherPerson.age = 20;
otherPerson.city = 'Lviv' 

const olderPerson = new Object({
    name: 'Ivan',
    age: 25,
    city: 'Kyiv',
});

const theOldestPerson = ({
    name: 'Vasyl',
    age: 30,
    city: 'Odesa',
});


//create an object via Object.create()

const existingObject = {
    name: 'Petro',
    age: 20,
    city: 'Lviv',
    greet() {
      return `Hello, my name is ${this.name}, I'm ${this.age} years old, and I'm living in ${this.city}.`
    }
  };
  
  const newObj = Object.create(existingObject);
  
  newObj.name = 'Ivan'
  newObj.age = 25
  newObj.city = 'Kyiv'
  
  console.log(newObj.name)
  console.log(newObj.age)
  console.log(newObj.greet())


//create an object via prototype

const prototypeObject = {
    greet() {
      return 'Hello!'
    }
  };
  
  const newObj = {};
  Object.setPrototypeOf(newObj, prototypeObject)
  
  console.log(newObj.greet())


//create an object person -> engineer -> QA Engineer

const person = {
    name: 'Ivan',
    age: 25,
    city: 'Kyiv',
  }
  
  //engineer
  const engineer = Object.create(person);
  engineer.experience = 5;
  engineer.role = 'Engineer';
  
  //QA engineer
  const QA_engineer = Object.create(engineer)
  QA_engineer.additionalField = 'Specialization: Automation'
  
  console.log(person)
  console.log(engineer)
  console.log(QA_engineer)
  


