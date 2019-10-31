// 2 - Hagamos la web del Metro más divertida.
// Saca el estado actual de todas las líneas del metro de Madrid por consola.
// Antes de Diciembre de 2018
// Después de Diciembre de 2018

// https://www.metromadrid.es/es

function subway() {
  let array = [];
  let lines = document.querySelectorAll(".list__otraslineas .list__lineas__element");

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    console.log(line);
    let lineName = array.push(line.querySelectorAll("a img")[0].class);
    let lineStatus = array.push(line.querySelectorAll("a span[class*=state]")[0]);

    array.push({
      "name": lineName,
      "status": lineStatus
    });
  }
  console.log(array);

}

subway();