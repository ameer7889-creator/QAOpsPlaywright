//Q. A classic programming interview question that involves using array methods (filter, map, reduce), and JavaScript objects.


/*Create an array of objects representing students with their names and scorestand get the below result with optimized solution.
1. Filters out students who passed in the exam with score more than 36.
2. Update Passed students names to uppercase.
3. total score of all passing students */

const students = [
    {name: "st1", score: 45}, 
    {name: "bob", score: 35},
    {name: "dan", score: 36},
    {name: "Psr", score: 25},
    {name:"John", score: 56}];

    const passedStudents = students.filter(student=> student.score>= 36);//filter method filters the students who passed

    console.log(passedStudents);

    const updatedMap = passedStudents.map(student=> student.name.toUpperCase()); //using map to shift the name to uppercase

    console.log(updatedMap);

    const totalscore = passedStudents.reduce(function(acc,student){ //accumilating the total value of passed students
        acc= acc+student.score;
        return acc;

    },0)
    console.log(totalscore);
