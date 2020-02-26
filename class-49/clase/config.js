const datoPrivado = "Lo que pasa en Node... se queda en Node";
const datoCompartido = "Hola! desde Config.js"

function privada() {
    return datoPrivado;
}

exports.metodo = function () {
    console.log(datoCompartido);
    console.log(privada());
}
exports.mensaje = datoCompartido;