// BUCLES



// for
var meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

console.group("Meses");
for (var i = 0; i < meses.length; i++) {
    console.log(meses[i] + " en la posicion " + i);
}
console.groupEnd("Meses");




// for x in array
var frutas = ['Patatas', 'Pescado', 'Naranjas'];
console.group("Lista de la compra");
for (fruta in frutas) {
    console.log(frutas[fruta] + " en la posicion " + fruta);
}
console.groupEnd("Lista de la compra");




// for of
// array [] objetos json 
var clase = [
    {
        "nombre": "Alejandro",
        "puesto": "0",
    },
    {
        "nombre": "Juan",
        "puesto": "1",
    },
    {
        "nombre": "Joaquín",
        "puesto": "2",
    },
    {
        "nombre": "Aurora",
        "puesto": "3",
    },
    {
        "nombre": "Pedro",
        "puesto": "4",
    },
    {
        "nombre": "Emilio",
        "puesto": "5",
    },
    {
        "nombre": "Miguel",
        "puesto": "6",
    },
    {
        "nombre": "Ronald",
        "puesto": "7",
    },
    {
        "nombre": "Beatriz",
        "puesto": "8",
    }
];

console.group("Clase");
var text = "";
var pruebaVariableI = "";

for (var jsonObject in clase) {
    console.group("Alumno (grupo 1)");
        console.log("Posicion del objeto " + jsonObject);
        console.log(clase[jsonObject]);
    console.groupEnd("Alumno (grupo 1)");

    console.group("Alumno (grupo 2)");
        // la variable i es la cantidad de elementos del array meses
        pruebaVariableI += "cantidad de elementos del array meses: " + i;

        text += jsonObject + ".- " + clase[jsonObject]["nombre"] + " ocupa el puesto " + clase[jsonObject]["puesto"] + " en la clase " + "\n";
        console.log(text);
    console.groupEnd("Alumno (grupo 2)");

    // Diferencias entre el bucle:
    // for/of -> tradicional (posicion) objeto array
    // for/in -> asociativos (clave) objeto json

    // con el codigo siguiente no se puede acceder al dato porque no actua por posicion sino por clave
    // console.group("Alumno (grupo 3)");
    //     for(var i of alumno){
    //         console.log("alumno = " + alumno);
    //         console.log("i = " + i);

    //         text += alumno + ".- " + clase[alumno][i] + " en la posicion " + i + "\n";
    //         console.log(text);
    //     }
    // console.groupEnd("Alumno (grupo 3)");

    console.group("Data Alumno (grupo 4)");
        for(var atributo in jsonObject){
            console.log(atributo + ": " + jsonObject[atributo] + "\n");
        }
    console.groupEnd("Data Alumno (grupo 4)");
}
console.groupEnd("Clase");