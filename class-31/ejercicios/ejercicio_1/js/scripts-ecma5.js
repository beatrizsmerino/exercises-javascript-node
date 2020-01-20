
/**
 * @class Person
 * @param {String} name 
 * @param {Number} age 
 * @param {String} gender 
 */
// ECMA5

var person = function (name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.details = function () {
        return console.log("Nombre: " + this.name + "\nEdad: " + this.age + "\nGénero: " + this.gender);
    }
};

var person1 = new person("Beatriz", 26, "femenino");
person1.details();





/**
 * @class Studient
 * @param {String} course 
 * @param {Number} group 
 */
// ECMA5
var studient = function (course, group) {
    this.course = course;
    this.group = group;
    this.register = function () {
        return console.log("Curso: " + this.course + "\nGrupo: " + this.group);
    }
};

studient.prototype = new person("Beatriz", 26, "femenino");
var studient1 = new studient("Master Fullstack de Javascript y node.js", 1);
studient1.register();