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

// spread operator ... (three dot prefix) - copy array or object - deep copy, not new reference to orig array/object
// cf. slice operator, which returns a 'slice' of an array (which may be the entire array)

// spread with array context
const newHobbies = [...hobbies];
console.log(newHobbies);

// spread with object context
const newPerson = {...person};
console.log(person);
console.log(newPerson);

// spread in 'cross' contexts
// const arrayPerson = [...person];
// console.log(arrayPerson);  // error: TypeError: person is not iterable

const objectHobbies = {...hobbies};
console.log(objectHobbies);  // no error, but array elements are assigned numeric property names:
                             //  { '0': 'Sports', '1': 'Singing', '2': 'Home Renovation' }
