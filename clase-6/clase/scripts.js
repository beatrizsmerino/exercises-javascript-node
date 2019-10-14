console.time("Time conditional else if (ternario)");
var esMiembro = true;
var esAdulto = true;
console.info(esMiembro ? "El pago son 20.00€" : esAdulto ? "Puedes enviar la solicitud cuando quieras" : "Tines que esperar aún. Lo siento.");
console.timeEnd("Time conditional else if (ternario)");



console.time("Time conditional else if");
var esMiembro = true;
var esAdulto = true;

if (esMiembro) {
    console.info("El pago son 20.00€");
} else if (esAdulto) {
    console.info("Puedes enviar la solicitud cuando quieras");
} else {
    console.info("Tines que esperar aún. Lo siento.");
}
console.timeEnd("Time conditional else if");