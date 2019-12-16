// Cambiar color
function cambiarFondo() {
	// color = 'rgb(0-255,0-255,0-255'
	var color = 'rgb(' + Math.floor((Math.random() * 255)) + ',';
	color += Math.floor((Math.random() * 255)) + ',';
	color += Math.floor((Math.random() * 255)) + ')';
	document.body.style.backgroundColor = color;
	console.info("Nuevo color:", color);
}

// Funcion anonima y actuando sobre el elemento
document.getElementById("button1").onclick = function () {
	document.body.style.backgroundColor = "lightblue";
};

// Function creada con JS
document.getElementById("button2").onclick = cambiarFondo;

// ADD EVENT LISTENER
function changeBorder() {
	document.getElementById("button3").style.border = "2px dotted #fff";
}
document.getElementById("button3").addEventListener("mouseover", changeBorder);

document.getElementById("button3").addEventListener("mouseover", function () {
	let button3 = document.getElementById("button3");
	button3.style.backgroundColor = "teal";
	button3.style.fontFamily = "Helvetica, sans-serif";
	button3.style.color = "rgba(255,255,255,0.5)";
});


// Hacer con mouseover que se muestre un parrafo escondidido,
// cuando pases el raton sobre el div de eventos

// Crear el parrafo
var paragraphElem = document.createElement("p");
var paragraphText = document.createTextNode("Mi parrafo");
paragraphElem.appendChild(paragraphText);
document.body.appendChild(paragraphElem);

// Darle un id
document.getElementsByTagName("p")[0].setAttribute("id", "paragraphGosht");
var paragraph = document.getElementById("paragraphGosht");

// Darle estilos
paragraph.style.visibility = "hidden";
paragraph.style.fontSize = "3rem";
paragraph.style.cursor = "pointer";

// Darle eventos
document.getElementById("button3").addEventListener("mouseover", function () {
	paragraph.style.visibility = "initial";
});
document.getElementById("button3").addEventListener("mouseout", function () {
	paragraph.style.visibility = "hidden";
});
