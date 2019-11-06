//- Ejercicios Eventos 3
//Partiendo del ejemplo de geometría, crear un programa que nos permita borrar/añadir figuras a nuestro HTML por medio de JS
//- Si la figura ya se encuentra pintada en nuestro HTML, no se puede volver a añadir
//- Si la figura a añadir no está en nuestro CSS, no podemos añadirla al HTML
//- Si la figura no está, no se puede borrar

// Añadir links CSS
var linkStyle= document.createElement("link")
linkStyle.setAttribute("rel","stylesheet")
linkStyle.setAttribute("href", "style.css")
linkStyle.setAttribute("TYPE","text/css")

document.head.appendChild(linkStyle);

// Añadir circulo por JS
var divCirculo= document.createElement("div")
divCirculo.setAttribute("id","circulo")
divCirculo.setAttribute("class","forma")

document.body.appendChild(divCirculo)



/*----------------------------------------------*/
// Como leer el input de insertar
// Solución JS aquí
