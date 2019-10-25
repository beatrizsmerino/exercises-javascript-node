var machine = {};
var products = [];
var clients = [
    {
        "nombre": "Beatriz",
        "usuario": "beatrizsmerino",
        "pass": "admin",
        "tipo": "admin",
        "presupuesto": "50"
    }, {
        "nombre": "Noelia",
        "usuario": "n.sopena",
        "pass": "1234",
        "tipo": "usuario",
        "presupuesto": "510"
    }, {
        "nombre": "Miguel",
        "usuario": "miguel_anguel",
        "pass": "1234",
        "tipo": "usuario",
        "presupuesto": "20"
    }
];




// Máquina expendedora:
var maquinaExpendedora = {
    admin: {
        secreto: "ficticiaMola" // clave admin
    },
    herramientas: {
        esUsuario: function (usuario) {
            //Solución aquí
            for (let index = 0; index < clients.length; index++) {
                const client = clients[index];
                const clientUser = client["usuario"];

                if (clientUser == usuario) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    gestionClientes: {
        agregar: function (clave, objeto) {
            //Solución aquí

            if(clave === null){
                console.log("ERROR - Property undefined !");
            }else{
                if(maquinaExpendedora.admin.secreto !== clave){
                    console.log("ERROR - Contraseña Erronea!");
                }else{
                    if(objeto === null){
                        if( 
                            objeto["usuario"] == null ||
                            objeto["nombre"] == null ||
                            objeto["pass"] == null ||
                            objeto["tipo"] == null ||
                            objeto["presupuesto"] == null
                            ){
                            console.log("ERROR - Faltan datos!");
                        }else{
                            for (let index = 0; index < clients.length; index++) {
                                const client = clients[index];
                                const clientUser = client["usuario"];
                                if(objeto["usuario"] !== clientUser){
                                    clients.push(objeto);
                                }else{
                                    console.log("ERROR - El usuario ya existe!");
                                }
                            }
                        }
                    } else{
                        console.log("ERROR - Property undefined !");
                    }
                }
            }
        },
        eliminar: function (clave, usuario) {
            //Solución aquí
            for (let index = 0; index < clients.length; index++) {
                const client = clients[index];
                const clientUser = client["usuario"];
                const clientPassword = client["pass"];

                if (clientUser == usuario && clientPassword == clave) {
                    clients.splice(index, 1);
                }
            }
        },
        saldoTotal: function (clave, usuario) {
            //Solución aquí
            for (let index = 0; index < clients.length; index++) {
                const client = clients[index];
                const clientUser = client["usuario"];
                const clientPassword = client["pass"];

                if (clientUser == usuario && clientPassword == clave) {
                    return client["presupuesto"];
                }
            }
        },
        gastoTotal: function (clave, usuario) {
            //Solución aquí
        }
    }
};

// Demo Producto:
//Solución aquí

// Demo Cliente:
//Solución aquí




// Testeando esUsuario:
// maquinaExpendedora.herramientas.esUsuario("ulises"); // true
// maquinaExpendedora.herramientas.esUsuario("yo mismo"); // false

// Testeando agregar:
// maquinaExpendedora.gestionClientes.agregar(); // ERROR - Contraseña Erronea!
// maquinaExpendedora.gestionClientes.agregar("hola"); // ERROR - Contraseña Erronea!
// maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
//     usuario: "Ulises"
// }); // ERROR - El usuario ya existe!
// maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
//     usuario: "Ulises2",
//     presupuesto: 1000
// }); // ERROR - Faltan datos! 
// maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
//     usuario: "ulises2",
//     presupuesto: 1000,
//     tipo: "admin",
//     pass: "pass2",
//     nombre: "Ulises2"
// }); // usuario Agregado con exito

// Testeando borrar:
// maquinaExpendedora.gestionClientes.eliminar(); // ERROR - Contraseña Erronea!
// maquinaExpendedora.gestionClientes.eliminar("ficticiaMola"); // ERROR - El usuario no existe!
// maquinaExpendedora.gestionClientes.eliminar("ficticiaMola", "Yo mismo"); // ERROR - El usuario no existe!
// maquinaExpendedora.gestionClientes.eliminar("ficticiaMola", "ulises2"); // Usuario Eliminado con exito

// Testeando Saldo:
// maquinaExpendedora.gestionClientes.saldoTotal(); // -1
// maquinaExpendedora.gestionClientes.saldoTotal("pass", "ulises"); // 1000

// Testrando Gasto:
// maquinaExpendedora.gestionClientes.gastoTotal(); // false
// maquinaExpendedora.gestionClientes.gastoTotal("pass", "ulises"); // []