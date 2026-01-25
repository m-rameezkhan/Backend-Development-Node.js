const {addToCart} = require('./addToCart');

console.log("Hello, World!");
console.log("This is the index.js file.");
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
list.forEach((value, index)=>{
    console.log(`index: ${index}, value: ${value}`);
})

console.log(addToCart());