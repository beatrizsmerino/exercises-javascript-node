// Alert
// alert("Hola mundo");


// Matemáticas Básicas (Agrupando operaciones)
var expresion1 = (3 + 7) * 10;
var expresion2 = (-56 * 6) - 74 * -25;
var expresion3 = (3 * 3) + 10 - 12 / 2;
var expresion4 = 44 + (83 % (33 + 100));
var expresion5 = -145 + (500 / 10 - 5) + 10 * 10 ;



function calcular1 (operacion) {
    console.log(operacion); // pinta por consola el valor que le pasas
};
var resultado1 = calcular1(expresion4); // es undefined, no guarda en la variable



function calcular2 (operacion) {
    console.log(operacion);
    return operacion; // devuelve un resultado
};

var resultado2 = calcular2(expresion2); // pinta el calor del console log y devielve el valor guardandolo en la variable



// Incremento/decremento

// Incremento -> numero = numero + 1
var numero = 5;

console.group("Incremento");
// Incrementa despues -> numero++
console.log(numero++);
console.log(numero);

// Incrementa antes -> ++numero
console.log(++numero);
console.log(numero);
console.groupEnd("Incremento");


// Decremento -> numero = numero - 1
var numero = 5;

console.group("Decremento");
// Incrementa despues -> numero++
console.log(numero++);
console.log(numero);

// Incrementa antes -> ++numero
console.log(--numero);
console.log(numero);
console.groupEnd("Decremento");



// Operadores de asignación
var x = 1;
var y = 10;

console.group("Operadores de asignación");
x = y;
console.info("\"x\" vale", x);

x += y;
console.info("\"x\" vale", x);

x -= y;
console.info("\"x\" vale", x);

x %= y;
console.info("\"x\" vale", x);
console.groupEnd();



// Jugando con variables
var empezoComo3 = 3;
era3();

empezoComo3 = 35;
era3();

empezoComo3 = empezoComo3 + 30;
era3();

empezoComo3 += 4;
era3();

empezoComo3++;
era3();

empezoComo3 -= 12;
era3();

empezoComo3--;
era3();

empezoComo3 *= 10;
era3();

empezoComo3 /= 11;
era3();

empezoComo3 += "texto";
era3();

console.info(typeof empezoComo3);

empezoComo3 += 20;
era3();

empezoComo3++;
era3();

console.info(typeof empezoComo3);

function era3 () {
    console.log("empezoComo3 debería ser 3, ahora su valor es " + empezoComo3);
};

// Convertir varibale de tipo string a number
console.group("%cString to number","padding: 0.1rem 0.5rem; background-color: #454545; color: gray;");
var string = "123";
console.info(typeof string);
console.info(typeof Number(string));
console.groupEnd();




// Funcion con use strict
function noEstrict(){
    var pi = Math.PI;
    console.log(pi);
}
noEstrict();


function noEstricto2(){
    pi = 3.14;
    console.group("%cDelete variable","padding: 0.1rem 0.5rem; background-color: #454545; color: gray;");
    console.log(pi);
    delete pi
    console.log("valor " + pi);
    console.groupEnd();
}

//noEstricto2();


// es necesario definir la variable pi con 'var'
function estricto1(){
    'use strict';

    pi = Math.PI;
    console.log(pi);
}
// estricto1();



function estricto2(){
    'use strict';
    eval ("var x = 2");
    eval ("console.log("+x+")");
}
estricto2();