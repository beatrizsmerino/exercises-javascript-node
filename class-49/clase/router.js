//import url from 'url';
const url = require('url');

// https://www.npmjs.com/package/query-string
const queryString = require('query-string');

const demoURL = "http://localhost:3000/ruta?parametro=dato#detalle";


console.log(`${url.parse(demoURL)}`);

console.log(`
El host: ${url.parse(demoURL).hostname}
El puerto: ${url.parse(demoURL).port}
La ruta: ${url.parse(demoURL).pathname}
La parametro: ${url.parse(demoURL).query}
El hash(#): ${url.parse(demoURL).hash}
`);

// Sacar el valor de un parametro
console.log(queryString.parse(url.parse(demoURL).query).parametro);