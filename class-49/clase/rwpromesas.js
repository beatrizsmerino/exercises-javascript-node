//import fs from 'fs';
const fs = require('fs');

// Con CallBacks!
fs.readFile("./files/file-read.txt", (error, content) => {
    console.log("Leyendo el archivo...");
    fs.writeFile("./files/file-lenght.txt", content.length, error => {
        if (error) {
            console.log("error! ", error);
        } else {
            console.log("Terminado... hemos almacenado una cadena que vale ", content.length);
        }
    });
});

// Con Promesas!
function leerArchivo(nombre) {
    return new Promise((resolver, rechazar) => {
        fs.readFile(nombre, (error, contenido) => {
            console.log("Empezando la lectura de ", nombre);
            if (error) {
                console.log("Error en la lectura");
                return rechazar(error);
            }
            console.log("Lectura finalizada en ", nombre);
            resolver(contenido);
        });
    });
}

function escribirArchivo(nombre, contenido) {
    return new Promise((resolver, rechazar) => {
        fs.writeFile(nombre, contenido, error => {
            if (error) {
                console.log("Error en la escritura de ", nombre);
                rechazar(error);
            } else {
                console.log("Escritura Termianda en ", nombre);
                resolver();
            }
        });
    });
}

//Opción1
leerArchivo("./files/file-read.txt")
    .then(contenido => {
        escribirArchivo("./files/file-lenght.txt", contenido);
    })
    .catch(error => {
        console.log("Promesas con errores: ");
        console.log(error);
    });

//Opción2
Promise.all([
    leerArchivo("./file-read.txt"),
    leerArchivo("./file-write.txt"),
    leerArchivo("./file-lenght.txt")
]).then(respuestas => {
    console.log(`Tenemos un total de ${respuestas.length} respuesta/s.`);
    console.log(`El primero tiene ${respuestas[0].length} caracteres`);
    console.log(`El segundo tiene ${respuestas[1].length} caracteres`);
    console.log(`El tercero tiene ${respuestas[2].length} caracteres`);
});


//Opcion3
Promise.race([
    leerArchivo("./file-read.txt"),
    leerArchivo("./file-write.txt"),
    leerArchivo("./file-lenght.txt")
]).then(respuesta => {
    console.log(`El más rápido tiene solo ${respuesta.length} caracteres.`);
});