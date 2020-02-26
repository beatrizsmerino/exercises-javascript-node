/*
import http from 'http';
import url from 'url';
*/

const http = require('http'),
    url = require('url');
const process = require('./address');

http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Index!');
    } else if (pathname === '/otro') {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        res.end('sencillamente otra página');
    } else if (pathname === '/alindex') {
        res.writeHead(301, {
            'Location': '/'
        });
        res.end();
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Querido... 404!');
    }
}).listen(process.env.PORT, process.env.IP);
console.log(`Servidor funcionando en http://${process.env.IP}:${process.env.PORT}/`);