const person = {
    name: 'Joe',
    age: 67,
    greet() {
        console.log("Hi I'm " + this.name);
    }
};

const hobbies = ['Sports','Singing'];

hobbies.push('Home Renovation');

console.log(hobbies);

// deconstructing - like spread in that array ( [] ) or object ( {} ) context must be provided
//                - different in that you specify the members you want
//                - ojbect deconstruction - use property names
//                - array deconstruction - use position

const [, index1, index2] = hobbies; // this will get unwieldy with large arrays!
                                    // expecting 'Singing, Home Renovation'
console.log(index1, index2);
