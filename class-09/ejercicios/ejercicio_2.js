// Juntar array 1 con array 2

var arreglo1 = ["plátano", "fresa", "lima", "manzana"];
var arreglo2 = ["entrante", "primero", "segundo", "postre"];

var juntandoArreglos = [arreglo1, arreglo2];

function testArreglos() {
    // - cortar el ultimo elemento del array
    // - convertir una parte del array en string con comas
    // - concatenar una 'y'
    // - añadir el ultimo eleemnto cortado

    console.group("Menu: ");
    console.log(juntandoArreglos[1][3] + ": " + arreglo1.join(', '));
    console.groupEnd();
};