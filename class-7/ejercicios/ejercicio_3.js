// 3 - Diseña un algoritmo que imprima los numeros del 100 al 0.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:






// - Resuelto con for:
/*
console.group("Numeros del 1-100 con for: ");
for (let index = 100; index >= 0; --index) {
  console.log("Numero " + (index));
}
console.groupEnd("Numeros del 1-100 con for: ");
*/



// - Resuelto con while:
console.group("Numeros del 1-100 con while: ");
let counter = 100;
while (counter >= 0) {
  console.log("Numero " + counter);
  counter--;
}
console.groupEnd("Numeros del 1-100 con while: ");


