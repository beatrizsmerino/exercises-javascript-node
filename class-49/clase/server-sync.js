//import http from "http";
const http = require("http");
const process = require('./address');

let numeroPeticion = 1;
function writeResponse(response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(`Hola Mundo!, numero de peticion ${numeroPeticion}`);
    response.end();
    console.log(`Se termino... ${numeroPeticion}`);
}

function sleepSynch(seconds, response) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + Math.floor((Math.random() * 1000) + 500) * seconds) {
        // Nada pasa....
    }
    writeResponse(response);
}

http.createServer((request, response) => {
    console.log(`Empezo... ${numeroPeticion}`);
    sleepSynch(10, response);
    numeroPeticion++;
}).listen(process.env.PORT);

console.log(`en puerto ->${process.env.PORT}`);