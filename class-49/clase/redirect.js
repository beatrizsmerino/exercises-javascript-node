//import http from 'http';
const http = require('http');
const process = require('./address');

http.createServer((req, res) => {
    res.writeHead(301, {
        'Location': 'http://www.fictizia.com/'
    });
    res.end();
}).listen(process.env.PORT, process.env.IP);

console.log(`Servidor funcionando en http://${process.env.IP}:${process.env.PORT}/`);
