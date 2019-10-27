// 5 - Diseña un algoritmo que imprima los números impares entre un número dado por el usuario y los siguientes 50 números.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:




// - Resuelto con for:
function getOdd50(num) {
  console.group("Numeros pares del " + num + "-" + (num + 50) + " con for: ");

  for (let index = num; index <= (num + 50); index++) {
    //console.log(index);

    if (index % 2 !== 0) {
      console.log("Numero " + index);
    }
  }

  console.groupEnd("Numeros pares del " + num + "-" + (num + 50) + " con for: ");
}

getOdd50(50);
