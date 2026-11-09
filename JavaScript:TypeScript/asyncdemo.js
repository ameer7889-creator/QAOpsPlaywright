//!. is JavaScript asynchronuous? Prove with example

console.log("I am 1st program");
console.log("I am 2nd program");
console.log("I am 3rd program");
console.log("I am 4th program");

setTimeout(() => {
    console.log("I am 5th program");
}, 2000);
console.log("I am 6th program");

//JS dont wait for 5th prog to complete timeout. it will execute rest of the steps while waiting for 5th step 

/* Output:
I am 1st program
I am 2nd program
I am 3rd program
I am 4th program
I am 6th program
I am 5th program */