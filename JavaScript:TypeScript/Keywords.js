//Q. What is the difference between var, const, and let? Explain with an example.

//'var' data type is function-scoped, global-scoped. it can be re=declared and updated
function varExample(){
var x = 1;
    a= "by default i'm var"
if(true)
{
var x=2;
console.log(x);//2
}
console.log(x);//2
console.log(a);//by default i'm var"
}
varExample();
/**************/

// let is block scoped and can be updated but not re-declared within same scope

function letExample(){
let y = 1;
if(true)
{
let y = 2;
console.log(y);//2
}
y=3;
console.log(y);//3
}
letExample()

/**************/

// const is block scoped and it cannot be updated or re-declared

function constExample(){
const c = 1;
if(true)
{
const c = 2;
console.log(c);//2
}
c = "trying to modify const value"; //throw error, not acceptable
console.log(c);//1
}
constExample()


