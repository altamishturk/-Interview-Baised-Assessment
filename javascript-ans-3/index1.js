const person = {
    name: 'John',
    greet: function(message) {
      console.log(`${message}, ${this.name}!`);
    }
  };
  
  const person2 = {
    name: 'Jane'
  };
  
  person.greet.call(person2, 'Hello'); // Output: Hello, Jane!
  person.greet.apply(person2, ['Hi']); // Output: Hi, Jane!
  