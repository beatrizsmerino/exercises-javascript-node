
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
var nodesArray = Array.prototype.slice.call(section1articles);
console.log(section1articlesArr);