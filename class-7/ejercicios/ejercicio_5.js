// 5 - Diseña un algoritmo que imprima los números impares entre un número dado por el usuario y los siguientes 50 números.

// - Usando for:
// - Usando while y break:
// - Usando Do...While:




// - Resuelto con for:
/*
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
*/


// - Resuelto con while:
/*
function getOdd50(num) {
  console.group("Numeros pares del " + num + "-" + (num + 50) + " con for: ");

  var index = num;

  while (index <= (num + 50)) {
    if (index % 2 !== 0) {
      console.log("Numero " + index);
    }
    index++;
  }

  console.groupEnd("Numeros pares del " + num + "-" + (num + 50) + " con for: ");
}

getOdd50(20);
*/



// - Resuelto con Do...While:
function getOdd50(num) {
  console.group("Numeros pares del " + num + "-" + (num + 50) + " con for: ");

  var index = num;

  do {
    if (index % 2 !== 0) {
      console.log("Numero " + index);
    }
    index++;
  } while (index <= (num + 50));

  console.groupEnd("Numeros pares del " + num + "-" + (num + 50) + " con for: ");
}

getOdd50(15);
