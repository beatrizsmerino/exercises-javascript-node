// - Ejercicios Eventos 3
// Partiendo del ejemplo de geometría, crear un programa que nos permita borrar/añadir figuras a nuestro HTML por medio de JS
// - Si la figura ya se encuentra pintada en nuestro HTML, no se puede volver a añadir
// - Si la figura a añadir no está en nuestro CSS, no podemos añadirla al HTML
// - Si la figura no está, no se puede borrar

// Añadir links CSS
var linkStyle = document.createElement("link")
linkStyle.setAttribute("rel", "stylesheet")
linkStyle.setAttribute("href", "style.css")
linkStyle.setAttribute("TYPE", "text/css")

document.head.appendChild(linkStyle);

// Añadir circulo por JS
// var divCirculo= document.createElement("div")
// divCirculo.setAttribute("id","circulo")
// divCirculo.setAttribute("class","forma")
// 
// document.body.appendChild(divCirculo)

///////////////////////////////////////////////////////

// FIGURES
const figures = [
  "circulo",
  "cuadrado",
  "rombo",
  "hexagono",
  "ovalo",
  "paralelogramo",
  "pentagono",
  "rectangulo",
  "trapezoide",
  "triangulo"
];

let select = document.getElementById("selectFigure");
let buttonAddFigure = document.getElementById("buttonAddFigure");
let myCanvas = document.getElementById("canvas");


// ACTIONS
function createListFigures() {
  for (let index = 0; index < figures.length; index++) {
    let element = figures[index];
    //console.log(element);

    let optionElem = document.createElement("option");
    let optionTextElem = document.createTextNode(element);
    optionElem.setAttribute("value", element);
    optionElem.appendChild(optionTextElem);

    select.appendChild(optionElem);
  }
  //console.log(select);
}

function getFigureSelected() {
  let figureSelected = select.value;
  // console.info("Has selecionado: " + figureSelected);
  return figureSelected;
}

function addFigure() {
  let figureSelected = getFigureSelected();

  for (let index = 0; index < figures.length; index++) {
    const figure = figures[index];

    if (figure === figureSelected) {
      let figureElem = document.createElement("div");
      let stylesFigure = `
        margin: 1rem;
        position: relative;
        display: inline-block;
      `;
      figureElem.setAttribute("class", "figure");
      figureElem.setAttribute("id", figureSelected);
      figureElem.style += `; ${stylesFigure}`;
      figureElem.addEventListener("click", removeFigure);

      let figureDrawElem = document.createElement("span");
      let stylesFigureDraw = `
        display: inline-block;
      `;
      figureDrawElem.style += `; ${stylesFigureDraw}`;

      let buttonRemoveFigure = document.createElement("i");
      let stylesButtonRemoveFigure = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 3rem;
        color: white;
        cursor: pointer;
      `;
      buttonRemoveFigure.setAttribute("class", "figure__button-remove icon-circle-with-cross");
      buttonRemoveFigure.style += `; ${stylesButtonRemoveFigure}`;

      figureElem.appendChild(figureDrawElem);
      figureElem.appendChild(buttonRemoveFigure);
      myCanvas.appendChild(figureElem);
    }
  }
}

function removeFigure() {
  let figure = document.getElementsByClassName("figure");
  for (let index = 0; index < figure.length; index++) {
    const element = figure[index];
    element.addEventListener("click", function () {
      this.remove();
    });
  }
}

createListFigures();
buttonAddFigure.addEventListener("click", addFigure);