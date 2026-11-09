//Q. Create an inheritance relationship between a parent and child class. Invoke the parent constructor from the child class. Create main.js to call parent class methods from a child class object.

//Q. From the above code, explain how the super and these keywords help achieve the solution.

import Master from "./Master";

//defining the child class that inherits parent class
class Student extends Master{

    constructor(name, age, grade){

        //call the parent calss constructor using 'super' keyword
        super(name, age);
        this.grade = grade;
    
    }

    //method to get the student details
    getStudentinfo(){

        //call the parent class method with 'super' keyword
        const masterinfo = super.getDetails();
        return `${masterinfo}`, `${this.grade}`;
    }

}
export default Student;