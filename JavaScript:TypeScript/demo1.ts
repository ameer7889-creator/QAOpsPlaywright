export {}; // Treat this file as a module to avoid global name collisions.

let msg1: string = "hello!"
msg1=2; //strict type followed in Typescript

console.log(msg1);

let age: number=25;
console.log(age);

let isActive: boolean = true;
console.log(isActive);


let numbers1: number[] = [1,2,3]; //array representation
console.log(numbers1);

//if you're not sure which type of object it is, u can use 'any'

let data: any = "this can be anything";
console.log(data);

//you can assign anything to data
data = 30;

// functions
function add(a:number,b:number):number
{
    
    return a+b;

}
add(4,5);

//Variables
let user:{name:string, age:number} = {name: "test", age:20};
user.location = "hyderabad"; //adding values dynamically not permitted in TS, because it's not in the contract. but still compile
console.log(user);

//Classes

