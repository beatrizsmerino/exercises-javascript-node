// 3 - Diseña un script que siga el siguiente proceso:

// Si el primero es negativo, debe sumar los otros dos

// Sino multiplicará los tres numeros

// Mostrar el resultado final incluyendo una referencia a la operación realizada.

// Usando if...else

// 	// Solución con if...else
// Usando Operador Ternario (?:)
// 	// Solución con operador ternario
// Usando Switch
// 	// Solución con switch


function process(num1, num2, num3) {
    if ((isNaN(num1) || num1 === "undefined" || num1 === null || num1 === "") &&
        (isNaN(num2) || num2 === "undefined" || num2 === null || num2 === "") &&
        (isNaN(num3) || num3 === "undefined" || num3 === null || num3 === "")) {
        console.info("Son numeros");

        alert("Inserta un numero");
    } else {
        num1 = Number(num1);
        num2 = Number(num2);
        num3 = Number(num3);

        // - Resuelto con if/else if
        if (num1 < 0) {
            var sumNumbersOperation = num2 + "+" + num3 + "=",
                sumNumbersResult = (num2 + num3);
            alert("El primer numero es negativo: " + num1);
            alert("La suma del numero 2 y 3 es: " + sumNumbersOperation + sumNumbersResult);
        } else {
            var productNumbersOperation = num1 + "*" + num2 + "*" + num3 + "=",
                productsNumberResult = (num1 * num2 * num3);
            alert("El primer numero no es negativo: " + num1);
            alert("El producto  2 y 3 es: " + productNumbersOperation + productsNumberResult);
        }

        // - Resuelto con Switch


        // - Resulto con el operador ternario
    }
}


alert("Inserta 3 numeros:");
var num1 = prompt("Numero 1:");
var num2 = prompt("Numero 2:");
var num3 = prompt("Numero 3:");

process(num1, num2, num3);