// Hacer un botón que esconda/enseñe el texto de un parrafo cada vez que se pulsa el mismo boton. Por defecto, el párrafo debe estar visible// Hacer un botón que esconda/enseñe el texto de un parrafo cada vez que se pulsa el mismo boton. Por defecto, el párrafo debe estar visible// Hacer un botón que esconda/enseñe el texto de un parrafo cada vez que se pulsa el mismo boton. Por defecto, el párrafo debe estar visible

function buttonShowViewParagraph() {
    // Create button
    var body = document.getElementsByTagName("body")[0];
    var buttonElem = document.createElement("button");
    var buttonTextElem = document.createTextNode("Click Me");
    buttonElem.setAttribute("id", "myButton");
    buttonElem.appendChild(buttonTextElem);
    body.appendChild(buttonElem);

    // Create paragraph
    var paragraphElem = document.createElement("p");
    var paragraphTextElem = document.createTextNode("Paragraph");
    paragraphElem.setAttribute("id", "myParagraph");
    paragraphElem.appendChild(paragraphTextElem);
    body.appendChild(paragraphElem);

    var buttonDom = document.getElementById("myButton");
    var paragraphDom = document.getElementById("myParagraph");

    // Solved width classList.toggle()
    buttonDom.addEventListener("click", function() {
        paragraphDom.classList.toggle("is-view");
        console.log(paragraphDom);
    });
    

    // Solved variable state
    function showHide(element, targetEvent){
        function toggleClass(){
            var state = false;

            if(state){
                element.classList.remove("is-view");
                state = false;
                console.log(state);
            } else{
                element.classList.add("is-view");
                state = true;
                console.log(state);
            }
        }
        targetEvent.onclick = toggleClass;
    }

    showHide(paragraphDom, buttonDom);

}

buttonShowViewParagraph();