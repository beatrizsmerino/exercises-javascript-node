
/**
 * @class Person
 * @param {String} name 
 * @param {Number} age 
 * @param {String} gender 
 */
// ECMA6+
class Person {
    constructor(name, age, gender) {
        this._name = name;
        this._age = age;
        this._gender = gender;
    }
    details() {
        return console.log("Nombre: " + this._name + "\nEdad: " + this._age + "\nGénero: " + this._gender);
    }
}


let person1 = new Person("Beatriz", 26, "femenino");
person1.details();





/**
 * @class Studient
 * @param {String} course
 * @param {Number} group
 */
// ECMA6
class Studient {
    constructor() {

    }
}