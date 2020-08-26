const person = {
    name: 'Joe',
    age: 67,
    greet() {
        console.log("Hi I'm " + this.name);
    }
};

person.greet();
