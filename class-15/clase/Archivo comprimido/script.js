// - Ejercicios Eventos 3
// Partiendo del ejemplo de geometría, crear un programa que nos permita borrar/añadir figuras a nuestro HTML por medio de JS
// - Si la figura ya se encuentra pintada en nuestro HTML, no se puede volver a añadir
// - Si la figura a añadir no está en nuestro CSS, no podemos añadirla al HTML
// - Si la figura no está, no se puede borrar

// Añadir links CSS
var linkStyle = document.createElement("link");
linkStyle.setAttribute("rel", "stylesheet");
linkStyle.setAttribute("href", "style.css");
linkStyle.setAttribute("TYPE", "text/css");

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
	"circle",
	"square",
	"diamond",
	"hexagon",
	"oval",
	"parallelogram",
	"pentagon",
	"rectangle",
	"trapezoid",
	"triangle"
];

let option1 = document.getElementById("option1Figures");
let option2 = document.getElementById("option2Figures");
let buttonAddFigure = document.getElementById("buttonAddFigure");
let myCanvas = document.getElementById("canvas");




function addStylesToSelect(){
	let selectDom = document.querySelectorAll("select option:first-child");

	let stylesSelect = `{
		font-style: italic;
		font-weight: 300;
		color: var(--color-gray-2);
	}`;
	selectDom.style = `; ${stylesSelect}`;
}




// GEOMETRIC FIGURE - CREATE SELECT
function createSelectFigures(select) {
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


// GET SELECT VALUE
function getSelectValue(select) {
	let selectValue = select.value;
	// console.info("Select Value: " + selectValue);
	return selectValue;
}


/*************************************************/


// GET INPUT VALUE
function getInputValue(input) {
	let inputValue = input.value;
	// console.info("Input Value: " + inputValue);
	return inputValue;
}


// GET INPUT VALUE
function checkValueFigure(figuresPermited, value) {
	let valueLowerCase = value.toLowerCase();
	let found = figuresPermited.includes(valueLowerCase);

	// console.info("Value ", value);
	// console.info(value, valueLowerCase);
	// console.log(found);

	let result;
	if (found) {
		result = true;
	} else {
		result = false;
	}

	return result;
}


/*************************************************/


// MESSAGE ERROR - CREATE
function createMessageError(inputError, message){
	let inputItem = document.getElementsByClassName("c-form__item");
	let messageDom = document.getElementById("messageError");

	let messageElem = document.createElement("span");
	let messageTextElement = document.createTextNode(message);
	messageElem.setAttribute("class", "c-message-error");
	messageElem.setAttribute("id", "messageError");
	// let template = `<span class="c-form__message-error">${message}</span>`;

	if(!messageDom){
		messageElem.appendChild(messageTextElement);
		// console.dir(messageElem);
		document.body.appendChild(messageElem);
	}else{
		// inputItem.parentNode.removeChild(messageDom);
		messageDom.innerHTML = message;
	}

	showMessageError();
}


// MESSAGE ERROR - REMOVE
function removeMessageError(){
	let inputItem = document.getElementsByClassName("c-form__item")[0];
	let messageDom = document.getElementById("messageError");

	if(messageDom){
		inputItem.parentNode.removeChild(messageDom);
	}
}


// MESSAGE ERROR - HIDE
function hideMessageError(){
	let messageDom = document.getElementById("messageError");

	if(messageDom){
		if(messageDom.classList.contains("is-show")){
			messageDom.classList.replace("is-show", "is-hide");
		}else{
			messageDom.classList.add("is-hide");
		}
	}
}


// MESSAGE ERROR - SHOW 
function showMessageError(){
	let messageDom = document.getElementById("messageError");

	if(messageDom){
		if(messageDom.classList.contains("is-hide")){
			messageDom.classList.replace("is-hide", "is-show");
		}else{
			messageDom.classList.add("is-show");
		}
	}
}


/*************************************************/


// GEOMETRIC FIGURE - ADD
function addFigure(figureSelected) {
	figureSelected.toLowerCase();
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
			figureButtonRemove.setAttribute(
				"class",
				"geometric-figure__button-remove icon-circle-with-cross"
			);

			figureElem.appendChild(figureDrawElem);
			figureElem.appendChild(figureButtonRemove);
			myCanvas.appendChild(figureElem);
		}
	}
}


// GEOMETRIC FIGURE - CHECK ADDED
function checkAddedFigure(nameFigure) {
	let figuresInCanvas = myCanvas.getElementsByClassName("geometric-figure");

	for (let index = 0; index < figuresInCanvas.length; index++) {
		const figureItem = figuresInCanvas[index];
		
		let result;
		let foundNameFigure = figureItem.getAttribute("id");
		if (foundNameFigure === nameFigure) {
			result = true;
		}else{
			result = false;
		}

		return result;
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


/*************************************************/


createSelectFigures(option1);
buttonAddFigure.addEventListener("click", function(){
	let selectValue = getSelectValue(option1);
	addFigure(selectValue)
});

option2.addEventListener("keyup", function () {
	let option2Value = getInputValue(option2);

	// console.info(option2Value);
	// console.assert(option2Value !== "", "Esta vacio");

	if(checkValueFigure(figuresArray, option2Value)){
		// console.info("Existe figure");
		if(checkAddedFigure(option2Value)){
			createMessageError(option2Value, "This figure '"+ option2Value + "' has already been added");
		}else{
			hideMessageError();
			addFigure(getInputValue(option2));
		}
	}else{
		// console.info("No existe figure");
		createMessageError(option2Value, "Figure '"+ option2Value + "' not available");
		if(option2Value == ""){
			hideMessageError();
		}
	}
});