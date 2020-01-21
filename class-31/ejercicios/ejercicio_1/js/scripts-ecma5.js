
/**
 * @class Person
 * @param {String} name 
 * @param {Number} age 
 * @param {String} gender 
 */
// ECMA5

var contador = 0;
function Person(name, age, gender) {

	this._id = contador++;
	this._name = name;
	this._age = age;
	this._gender = gender;
	this._details = function () {
		return console.log("Id: " + this._id + "\nNombre: " + this._name + "\nEdad: " + this._age + "\nGénero: " + this._gender);
	}

	function total() {
		var textPerson = "";

		if (contador === 1) {
			textPerson = "persona";
		} else {
			textPerson = "personas";
		}
		return console.log("Se ha creado " + contador + " " + textPerson);
	}

	total();
};

console.group("%cPerson", "padding: 0.2rem 0.5rem; background-color: #5E7489;");
console.log(Person.prototype, typeof Person.prototype);
var person1 = new Person("Beatriz", 26, "femenino");
person1._details();
var person2 = new Person("Miguel", 45, "masculino");
person2._details();
console.groupEnd();




/**
 * @class Student
 * @param {String} course 
 * @param {Number} group 
 */
// ECMA5
function Student(course, group) {
	this._course = course;
	this._group = group;
	this._register = function () {
		return console.log("Curso: " + this._course + "\nGrupo: " + this._group);
	};
	this._register();
};

console.group("%cStudent", "padding: 0.2rem 0.5rem; background-color: #7A7959;");
var student1 = new Person("Beatriz", 26, "femenino");
student1._details();
student1.prototype = new Student("Master Fullstack de Javascript y node.js", 1);

var student2 = new Person("Sara", 20, "femenino");
student2._details();
student2.prototype = new Student("Máster en UX, diseño de producto digital e interfaces", 3);
// not working
// student2.prototype._course = "Máster en UX, diseño de producto digital e interfaces";
// student2._group = 3;
console.groupEnd();




/**
 * @class Professor
 * @param {String} subject
 * @param {Number} level
 */
// ECMA5
var professor = function (subject, level) {
	this._subject = subject;
	this._level = level || 0;
	this._assing = function () {
		return console.log("Asignatura: " + this._subject + "\nNivel: " + this._level);
	};

	this._assing();
};

console.group("%cProfessor", "padding: 0.2rem 0.5rem; background-color: #597A5F;");
var professor1 = new Person("Ulises Gascón", 34, "masculino");
professor1._details();
professor1.prototype = new professor("Javascript", 1);

var professor2 = new Person("Mike Nøah", 30, "masculino");
professor2._details();
professor2.prototype = new professor("Diseño de productos digitales", 4);
console.groupEnd();