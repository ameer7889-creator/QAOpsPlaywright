"use strict";
let msg1 = "hello!";
msg1 = 2; //strict type followed in Typescript
console.log(msg1);
let age = 25;
console.log(age);
let isActive = true;
console.log(isActive);
let numbers1 = [1, 2, 3]; //array representation
console.log(numbers1);
//if you're not sure which type of object it is, u can use 'any'
let data = "this can be anything";
console.log(data);
//you can assign anything to data
data = 30;
// functions
function add(a, b) {
    return a + b;
}
add(4, 5);
let user = { name: "test", age: 20 };
user.location = "hyderabad"; //adding values dynamically not permitted in TS, because it's not in the contract. but still compile
console.log(user);
