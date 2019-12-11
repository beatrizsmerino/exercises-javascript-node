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
const figuresArray = [
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


let select = document.getElementById("option1Figures");
let buttonAddFigure = document.getElementById("buttonAddFigure");
let myCanvas = document.getElementById("canvas");


// GEOMETRIC FIGURE - CREATE
function createSelectFigures() {
  for (let index = 0; index < figuresArray.length; index++) {
    let element = figuresArray[index];
    //console.log(element);

    let optionElem = document.createElement("option");
    let optionTextElem = document.createTextNode(element);
    optionElem.setAttribute("value", element);
    optionElem.appendChild(optionTextElem);

    select.appendChild(optionElem);
  }
  //console.log(select);
}


// GEOMETRIC FIGURE - SELECTED
function getSelectedFigure(selectDom) {
  let figureSelected = selectDom.value;
  // console.info("Has selecionado: " + figureSelected);
  return figureSelected;
}


// GEOMETRIC FIGURE - ADD
function addFigure() {
  let figureSelected = getSelectedFigure(select);

  for (let index = 0; index < figuresArray.length; index++) {
    const figureItem = figuresArray[index];

    if (figureItem === figureSelected) {
      let figureElem = document.createElement("div");
      figureElem.setAttribute("class", "geometric-figure");
      figureElem.setAttribute("id", figureSelected);
      figureElem.setAttribute("title", figureSelected);
      figureElem.addEventListener("click", removeFigure);

      let figureDrawElem = document.createElement("span");
      figureDrawElem.setAttribute("class", "geometric-figure__picture");

      let figureButtonRemove = document.createElement("i");
      figureButtonRemove.setAttribute("class", "geometric-figure__button-remove icon-circle-with-cross");

      figureElem.appendChild(figureDrawElem);
      figureElem.appendChild(figureButtonRemove);
      myCanvas.appendChild(figureElem);
    }
  }
}


// GEOMETRIC FIGURE - REMOVE
function removeFigure() {
  let figure = document.getElementsByClassName("geometric-figure");
  for (let index = 0; index < figure.length; index++) {
    const element = figure[index];
    element.addEventListener("click", function () {
      this.remove();
    });
  }
}


createSelectFigures();
buttonAddFigure.addEventListener("click", addFigure);