// 1 - Diseña un algoritmo que cuente las veces que aparece una determinada letra en una frase.


function findCharacter(phrase, letter) {

    // Comprobar que viene dato
    while (phrase === "" || letter === "") {
        if (phrase === "" && letter === "") {
            alert("Debes insertar una frase y una letra !");
            phrase = prompt("Inserta una frase: ");
            letter = prompt("Inserta una letra: ");
        } else if (phrase === "") {
            alert("Debes insertar una frase!");
            phrase = prompt("Inserta una frase: ");
        } else if (letter === "") {
            alert("Debes insertar una letra!");
            letter = prompt("Inserta una letra: ");
        }
    }
    console.log("Han insertado Frase y Letra");



    // Contar caracteres de la frase (>1)
    let phraseNumCharacters = phrase.length;
    console.log("Numero de caracteres de la Frase: ", phraseNumCharacters);

    while(phraseNumCharacters === 1) {
        console.warn("%cFrase Incorrecta: " + phrase, "padding: 0.1rem 0.2rem; background-color: tomato; color: #fff;");
        alert("Debes insertar una frase con mas de un caracter!");
        phrase = prompt("Inserta una Frase: ");

        phraseNumCharacters = phrase.length;
    }
    console.info("%cFrase Aceptada: " + phrase, "padding: 0.1rem 0.2rem; background-color: teal; color: #fff;");
    console.log("Numero de caracteres de la Frase: ", phraseNumCharacters);



    // Contar caracteres de la letra  (1)
    let letterNumCharacters = letter.length;
    console.log("Numero de caracteres de la Letra: ", letterNumCharacters);

    while(letterNumCharacters > 1) {
        console.warn("%cLetra Incorrecta: " + letter, "padding: 0.1rem 0.2rem; background-color: tomato; color: #fff;");
        alert("Solo puedes insertar un caracter a buscar!");
        letter = prompt("Inserta una letra: ");

        letterNumCharacters = letter.length;
    }
    console.info("%cLetra Aceptada: " + letter, "padding: 0.1rem 0.2rem; background-color: teal; color: #fff;");
    console.log("Numero de caracteres de la Letra: ", letterNumCharacters);



    // Buscar letra
    var counter = 0;
    for (let index = 0; index < phrase.length; index++) {
        console.info("%cFrase: " + phrase, "padding: 0.1rem 0.2rem; background-color: #ecbd04; color: #454545;");
        console.info("%cLetra a buscar: " + letter, "padding: 0.1rem 0.2rem; background-color: #ecbd04; color: #454545;");
        console.info("%cBuscando... " + phrase[index], "padding: 0.1rem 0.2rem; background-color: #797979; color: #c5c5c5;");
        console.info("%cHa encontrado: " + counter, "padding: 0.1rem 0.2rem; background-color: teal; color: #fff;");

        if(phrase[index] === letter){
            counter++;
        }
    }

    return counter;
}



let init = confirm("Cuenta las veces que parece una letra en una frase");
if (init) {
    let phrase = prompt("Inserta una frase: ");
    let letter = prompt("Inserta una letra: ");

    alert("Hay " + findCharacter(phrase, letter) + " " + "'"+ letter + "'");
} else {
    alert("Has salido de la aplicacion!");
}