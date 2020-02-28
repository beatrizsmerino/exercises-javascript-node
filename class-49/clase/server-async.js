//import http from "http";
const http = require("http");
const process = require('./address');

function writeResponse(response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hola Mundo!");
    response.end();
    console.log("Se termino... ");
}

function sleepAsynch(seconds, response) {
    setTimeout(() => {
        writeResponse(response);
    }, Math.floor((Math.random() * 1000) + 100) * seconds);
}

var server = http.createServer((request, response) => {
    console.log("Empezo... ");
    sleepAsynch(10, response);
});





// Lanzar servidor
/*
console.log("Abriendo Node...");
server.listen(process.env.PORT);
console.log(`en puerto ->${process.env.PORT}`);
*/

/*
setTimeout(() => {
    console.log("Cerrando Node...");
    server.close();

    setTimeout(() => {
        console.log("Abriendo Node...");
        server.listen(process.env.PORT);
        console.log(`en puerto ->${process.env.PORT}`);
    }, 10000);

}, 10000);
*/


// Haciendo lo mismo que arriba con funciones asincronas
// https://alligator.io/js/async-functions/
// https://css-tricks.com/understanding-async-await/

function openNode() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Abriendo Node...");
            server.listen(process.env.PORT);
            console.log(`en puerto ->${process.env.PORT}`);
            resolve();
        }, 100);
    });
}

function closeNode() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Cerrando Node...");
            server.close();
            resolve();
        }, 10000);
    });
}


// Dos formas de hacer lo mismo...

// 1. Con una funcion
/*
async function openCloseNode() {
    await openNode();
    await closeNode();
}

openCloseNode();
*/

// 2. Con una funcion anonima auto ejecutada
(
    async () => {
        await openNode();
        await closeNode();
    }
)();