//Q. What is the difference between == and ===?

console.log(5=='5') //True. because, here == won't care about the type of param. it simply compares the visual value

console.log(5==='5')// false. because, === care about the type of both of param.


//Q. What is the difference between null and undefined in JavaScript?

let a =null; //you'll see null only if you explicitly declare. this is helpful when u want to initilaise value later stages
console.log(a)
console.log(typeof a); //object

let b;
console.log(b); //undefined.
console.log(typeof b);//undefined.