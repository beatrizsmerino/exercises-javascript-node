// Crear un servidor con Node
// control + c para para el servidor

// Importamos módulo HTTP
function server() {
    var http = require('http');
    // Código para arrancar el sevidor
    http.createServer(function (req, res) {
        // Devolver al DOM la respuesta que debe mostrar
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hola! Esta es la primera respuesta desde mi servidor :)');
        // Escuchando en puerto 8080
    }).listen(8080);
    // Mensaje a mostrar cuando arranque el servidor
    console.log("Servidor ejecutándose en localhost. http://127.0.0.1:8080");
}

server();