// callbacks - functions that take functions as arguments
const fetchData = callback => { //fetchData takes a function called callback as its argument
    setTimeout(() => {
        callback('Callback is done');   // callback is passed a text argument
    }, 1500);
}

const logText = someText => {
    console.log(someText);
}

setTimeout(( ) => {
    console.log('Timer is done');
    // fetchData(text => {             // fetchData is called with an anonymous function definition
    //     console.log(text);
    // });
    console.log('calling logText');
    fetchData(logText);                 // fetchData is called with an function reference
}, 1000);

setTimeout( ( ) => {
}, 1000);

console.log('Hello');
