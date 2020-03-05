function ajaxHandler2() {
    fetch('http://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            usuario: "Alejandro",
            password: 1234,
            userId: 123
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(function (response) {
        //Gestión de la respuesta
        return response.json();
    }).then(function (datos) {
        console.log(datos);
        alert("Se ha añadido a usuario " + datos.usuario);
    });
}
document.getElementById("button").addEventListener("click", ajaxHandler2);