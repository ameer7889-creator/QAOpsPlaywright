export class Master{

    constructor(name, age){

        this.name = name;
        this.age = age;
    }

    getDetails(){

        return `name: ${this.name}`, and, `age: ${this.age}`;
    }

}

export default Master;