// 2 - Diseña un algoritmo que imprima los numeros del 1 al 100.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:




// - Resuelto con for:
console.group("Numeros del 1-100 con for: ");
for (let index = 0; index < 100; index++) {
  console.log("Numero " + (index + 1));
}
console.groupEnd("Numeros del 1-100 con for: ");

// - Resuelto con while:
console.group("Numeros del 1-100 con while: ");
let counter = 0;
while (counter < 100) {
  console.log("Numero " + (counter + 1));
  counter++
}
console.groupEnd("Numeros del 1-100 con while: ");

