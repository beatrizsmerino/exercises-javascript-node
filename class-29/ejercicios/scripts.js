//1 - $http es una librería que crearemos para poder funcionar con promesas usando XMLHttpRequest y devolviendo el JSON ya parseado
// Funcionamiento esperado:


function $http(url) {
    // Crear un objeto que trate la petición
    // Debe tratar la petición y hacerla
    // Hacer uso de promesas para la petición
    // Debe devolver el JSON ya parseado

    // Hacer uso de un Patrón Adaptador, que sea el que haga la llamada a la petición get()

    return {
        'get': function (args) {
            return elresultadodehacerlapeticionaqui
        }
    };
};


$http("http://airemad.com/api/v1/station")
    .get()
    .then(data => {
        let content = ""
        data.forEach(element => {
            content += `<li>La estación ${element.nombre_estacion} (${element.id}) está en ${element.direccion}</li>`
        })
        document.body.innerHTML = `<ul>${content}</ul>`
    })
    .catch(console.log("Error"));