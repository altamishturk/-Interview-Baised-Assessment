// Global context:
console.log(this); // Output: Window (or global object in Node.js)
// In the global scope, outside any function, this refers to the global object (Window in browsers or the global object in Node.js).

// Object method:

const person = {
  name: 'John',
  sayHello: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

person.sayHello(); // Output: Hello, John!
// When a function is called as a method of an object, this refers to the object itself (person in this case). It allows you to access and use the object's properties and methods.

// Constructor function:

function Car(make, model) {
  this.make = make;
  this.model = model;
}

const myCar = new Car('Tesla', 'Model 3');
console.log(myCar.make); // Output: Tesla
// In a constructor function, this refers to the newly created instance of the object (myCar in this case). It allows you to set and access instance-specific properties.



// Event handlers:

const button = document.querySelector('button');
button.addEventListener('click', function() {
  console.log(this); // Output: button element
});

// In event handlers, this refers to the element that triggered the event (button in this case). It allows you to perform actions on the specific element.

// Note that the value of this can be affected by how a function is invoked, such as using the call(), apply(), or bind() methods.
