
// PARAGRAPHS
var paragraphs = document.getElementsByTagName("p");

console.group("Paragraphs innerHTML");
for (let index = 0; index < paragraphs.length; index++) {
    const element = paragraphs[index];
    console.log("Paragraph " + index + element.innerHTML);
}
console.groupEnd();

// BODY
var body = document.getElementsByTagName("body")[0];
body.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
body.style.backgroundColor = "#2661ad"


// TITLE - ID
var title = document.getElementById("title");
title.style.padding = "1rem 2rem";
title.style.color = "#fcfcfc";
title.style.background = "#a21cc8";


// ARTICLE - CLASS
var article = document.getElementsByClassName("article");
console.group("Paragraphs innerHTML");
for (let index = 0; index < article.length; index++) {
    const element = article[index];
    element.style.padding = "1rem 2rem";
}
console.groupEnd();


// LINK 
console.info("%cHacktoberfest:" + document.getElementsByTagName("a")[0].href, "background-color: #a21cc8; color: #fcfcfc;");
var link1 = document.getElementsByName("link1")[0];
link1.style.fontWeight = "bold";
link1.style.display = "block";
link1.style.color = "#f8ed4e";


// QUERY SELECTOR ALL
console.info("***** QUERY SELECTOR ALL *****");
var section1articles = document.querySelectorAll("#section1 .article")[0];
section1articles.style.border = "2px solid white";


// QUERY SELECTOR 
// (deja de ser un array y coje solo el primer elemento)
console.info("***** QUERY SELECTOR *****");
var section1articles = document.querySelector("#section2 .article");
section1articles.style.border = "2px solid #fc4e4e";


// CONVERSION A ARRAYS
// var nodesArray = Array.prototype.slice.call(section1articles);
// console.log(section1articlesArr);


// Modificando estilos del DOM
document.getElementsByName("button1")[0].classList.add("button--hacktoberfest");

// ocultar parrafo
document.getElementById("p1").style.display = "none";
document.querySelector("#p4").classList.add("class2");
// añade clase
console.log("****");
var parrafo = document.getElementById("p2");
parrafo.classList.contains("class2"); // el elemento contiene clase 2?
// añade y quita la clase 2
document.getElementById("boton").addEventListener("click", function () {
    parrafo.classList.toggle("class2");
});


// Crear nuevo element en el DOM
var main = document.querySelector("body main");
var aside = document.createElement("aside");
//var asideContent = document.createTextNode("<h4>Aside</h4>"); // inserta las etiquetas como texto
var asideTitle = document.createElement("h4");
var asideTitleText = document.createTextNode("Aside");
asideTitle.appendChild(asideTitleText);
aside.appendChild(asideTitle);
main.appendChild(aside);
document.querySelector("aside h4").classList.add("aside__title");
var asideTitleCss = document.querySelectorAll(".aside__title")[0];
asideTitleCss.style.color = "#f8ed4e";
asideTitleCss.style.fontSize = "3rem";


// Crear una lista de ul li con js
function addList(where) {
    let content = document.createElement("div");
    //where.appendChild(content);
    content.classList.add("aside__content");

}
addList(document.getElementsByTagName("aside"));