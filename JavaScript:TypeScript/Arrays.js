//Q. Where are the push, pop, slice, shift, and unshift methods used when accessing array elements?

//Array examples and oprations

const fruits = ["Apple", "Banana", "grapes", "Mango"];

//access elements by index
console.log(fruits[3]);//mango
console.log(fruits[0]);//apple

//Add an element to the end of an array, Push is used to add an element to the end of an Array
fruits.push("Cherry");
console.log(fruits);//[ 'Apple', 'Banana', 'grapes', 'Mango', 'Cherry' ]

//"pop" method is used to remove the last element in the array

const deletelastfruit = fruits.pop();
console.log(deletelastfruit);//Cherry
console.log(fruits);// [ 'Apple', 'Banana', 'grapes', 'Mango' ]

// "unshift" method is used to add an element to the beginnig of an array
fruits.unshift("avacado");
console.log(fruits); //[ 'avacado', 'Apple', 'Banana', 'grapes', 'Mango' ]

//'shift' method is used to remove the first element from an array
const removefirstele = fruits.shift();
console.log(removefirstele);//avacado
console.log(fruits);//[ 'Apple', 'Banana', 'grapes', 'Mango' ]

//find the index of an element
const index = fruits.indexOf("grapes");
console.log(index);//2

//Remove by an element by index, for ex in the middle of an array
console.log(fruits);//[ 'Apple', 'Banana', 'grapes', 'Mango' ]
const exactRemove = fruits.splice(3); //exactly removes the ele from the index number
console.log(exactRemove); //[ 'Mango' ]
console.log(fruits); //[ 'Apple', 'Banana', 'grapes' ]

const rangeremove = fruits.splice(index, 2)// it will remove element from 0 to 1
console.log(fruits);

const removedfruit = fruits.splice(0,2);
console.log(removedfruit);

//Iterate over an array

fruits.forEach((fruits, index)=>
{
console.log(`${index}: ${fruits}`);
});
/* Output:
0: Apple
1: Banana
2: grapes
3: Mango*/