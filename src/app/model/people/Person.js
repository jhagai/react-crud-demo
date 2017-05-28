// @flow

class Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    sex:string;


    constructor(id: number, firstName: string, lastName: string, email: string, sex:string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.sex= sex;
    }
}

export default Person