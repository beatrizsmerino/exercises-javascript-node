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
// let removeButton = document.getElementById("buttonRemoveFigure");
// console.log(select);
// console.log(addButton);

// ACTIONS
function createListFigures(){
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

function addFigure(event) {
    event.preventDefault();
    let valueSelected = select.value;
    console.log("Has selecionado: " + valueSelected);

    let figureElem = document.createElement("div");
    figureElem.setAttribute("class", "forma");
    figureElem.setAttribute("id", selectVal);


}

function removeFigure() {

}

createListFigures();
buttonAddFigure.addEventListener("click", addFigure);
// removeButton.addEventListener.onclick = removeFigure;

/*----------------------------------------------*/
// Como leer el input de insertar
// Solución JS aquí
