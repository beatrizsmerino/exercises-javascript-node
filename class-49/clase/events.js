const http = require("http");
const process = require('./address');

const server = http.createServer().listen(process.env.PORT);
server.on('request', (request, response) => {
    // Leer HTML
    fs.readFile('./files/index.html', (error, data) => {
        if (!error) {
            // Escribir HTML en DOM
            response.writeHand(200, { 'Content-Type': 'text/html' });
            response.write(data);
        } else {
            response.writeHand(200, { 'Content-Type': 'text/plain' });
            response.write("Hubo un error !!!");
        }
        resoponse.end();
    });
});