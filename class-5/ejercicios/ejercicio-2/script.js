// 2 - Diseña un algoritmo para calcular el porcentaje de hombres y mujeres en nuestro curso.
// Trucos:
// Calcular porcentajes (segmento*100)/total


//document.getElementsByTagName("body").style.fontFamily = "sans-serif";



function ejercicio2(){

    function getData(){
        alert("Hola! Escribe el numero de mujeres y hombres que hay en el curso");
        var num1 = prompt("Numero de mujeres:");
        var num2 = prompt("Numero de hombres:");
        return num1,num2;
    }

    getData();

    console.log("num1: " + typeof num1);
    console.log("num1: " + typeof num2);

    if(!num1 && !num2){
        if(typeof num1 === "number" && typeof num2 === "number" ){
            var total = num1 + num2;
            var porcentajeMujeres = (num1 * 100)/total;
            var porcentajeHombres = (num2 * 100)/total;
        
            document.write("<p><strong>Mujeres: </strong> "+ num1 +"</p>");
            document.write("<p><strong>Hombres: </strong> "+ num2 +"</p>");
        
            document.write("<p><strong>Porcentaje de  Mujeres: </strong> " + Number(porcentajeMujeres.toFixed(2)) + "% " + "(" + porcentajeMujeres + ")" + "</p>");
            document.write("<p><strong>Porcentaje de  Hombres: </strong> " + Number(porcentajeMujeres.toFixed(2)) + "% " +"(" + porcentajeHombres + ")" + "</p>");
        }else{
            alert("No es un numero!!");
            getData();
        }
    }else{
        alert("Inserta algun dato!!");
        getData();
    }
}

ejercicio2();