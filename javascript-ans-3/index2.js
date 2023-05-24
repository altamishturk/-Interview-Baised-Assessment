const person = {
    name: 'John',
    greet: function(message) {
      console.log(`${message}, ${this.name}!`);
    }
  };
  
  const person2 = {
    name: 'Jane'
  };
  
  const greetPerson2 = person.greet.bind(person2);
  greetPerson2('Hola'); // Output: Hola, Jane!
  