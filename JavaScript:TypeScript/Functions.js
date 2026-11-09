//Q. Can a JavaScript object hold a function as a property? Explain with an example.

const person = { 
    name: "testser", 
    age: 25, 

    greet: function(){
        console.log("Hi, I am " + this.name)
    }
}
person.greet();

//Q. What are anonymous functions in JavaScript? Define their syntax and implementation.

function hiFun(){

    return "I am not anonymous fucntion";
}
const message = hiFun();
console.log(message)

//*********

const greet = (name)=>{

    return "Hi "+name+" I am an anonymous fucntion";
}
console.log(greet("test"));














