// import http from 'http';
const http = require('http');

const url = "fictizia.es";
// Change by: fictizia.com
// Respuesta Http 301 en fictizia.com

const tiempo = 3500;

setInterval(() => {
    http.get({ host: url }, res => {
        if (res.statusCode === 200) {
            console.log(`Sin errores en ${url}`);
        } else {
            console.log(`Respuesta Http ${res.statusCode} en ${url}`);
        }
    }).on('error', e => {
        console.log(`Con errores -> La respuesta de ${url} es ${e.message}`);
    });
}, tiempo);