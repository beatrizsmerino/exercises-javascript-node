// Practicando Firebase

// 0. Datos para conectar con la base de datos de mi proyecto en Firebase
// Change this string 'XXXXXXXXXXXX' for yor data
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "XXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXX",
    appId: "XXXXXXXXXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);





// 1. CREATE -> Insertar un unico dato
// Get a reference to the database service
// var ref = firebase.database().ref("users/1");

// ref.set({
//     username: "Pepe Domenech",
//     email: "pepe.domenech@gmail.com",
//     username: "pepe"
// });





// 2. Insertar datos uno a uno con una funcion
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

// writeUserData(2, "Pepe Domenech", "pepe.domenech@gmail.com", "pepe.png");
// writeUserData(3, "Alberto", "alberto.domenech@gmail.com", "alberto.png");





// 3. Insertar datos de un json
const users = [
    {
        id: "4",
        nombre: "AAA",
        email: "aaa@gmail.com",
        imageUrl: "aaa.png"
    },
    {
        id: "5",
        nombre: "bbb",
        email: "bbb@gmail.com",
        imageUrl: "aaa.png"
    },
    {
        id: "6",
        nombre: "ddd",
        email: "ddd@gmail.com",
        imageUrl: "aaa.png"
    },
    {
        id: "7",
        nombre: "eee",
        email: "aaa@gmail.com",
        imageUrl: "aaa.png"
    },
    {
        id: "8",
        nombre: "fff",
        email: "aaa@gmail.com",
        imageUrl: "aaa.png"
    }
];

// users.map(user => writeUserData(user.id, user.nombre, user.email, user.imageUrl));





// 4. Guardar multiples datos en una tabla
// const users = [{
//  "mi-tabla": [
//     {
//         id: "9",
//         nombre: "AAA",
//         email: "aaa@gmail.com",
//         imageUrl: "aaa.png"
//     },
//     {
//         id: "10",
//         nombre: "bbb",
//         email: "bbb@gmail.com",
//         imageUrl: "aaa.png"
//     },
//     {
//         id: "11",
//         nombre: "ddd",
//         email: "ddd@gmail.com",
//         imageUrl: "aaa.png"
//     },
//     {
//         id: "12",
//         nombre: "eee",
//         email: "aaa@gmail.com",
//         imageUrl: "aaa.png"
//     },
//     {
//         id: "13",
//         nombre: "fff",
//         email: "aaa@gmail.com",
//         imageUrl: "aaa.png"
//     }
//  ]
// }];
// const userRef = firebase.database().ref("users");
// userRef.push(users);





// 5. Evento para escuchar cambio en la DB
// console -> writeUserData(4, "Alberto", "alberto.domenech@gmail.com", "alberto.png");
// const userRef = firebase.database().ref("users/4");
// userRef.on('value', snapshot => {
//     console.log(snapshot);
// });

// Solo la primera vez
// const userRef = firebase.database().ref("users/4");
// userRef.once('value', snapshot => {
//     console.log(snapshot.val());
// });





// 6. UPDATE -> Actualizar datos del usuario 2
// var updates = {
//     'timestamp': new Date().getTime()
// };

// updates[`users/2`] = {
//     username: "hacker",
//     email: "hacker@gmail.com",
//     profile_picture: "imagen.jpg"
// };

// firebase.database().ref().update(updates);





// 7. READ -> Lectutra de datos
// Escucha cuando cambian los datos de la tabla users

// Todos los usuarios
// var userRef = firebase.database().ref(`users`);

// El ultimo usuario
// var userRef = firebase.database().ref(`users`).limitToLast(1);

// function getUsers() {
//     userRef.on('value', (snapshot) => {
//         snapshot.forEach(index => {
//             const element = index.val();
//             console.log(element);

//             // console.log(`key: ${index.key}, Value: ${element.email}`);
//             console.log("key: ", index.key, ", Value: ", element);
//         });
//     });
// }

// getUsers();





// 8. DELETE -> Escucha si se elimina cualquier dato en la tabla usuarios
// consola -> firebase.database().ref(`users/7`).remove();
// var userRef = firebase.database().ref(`users`);

// function removeUser(user) {
//     user.on('child_removed', snapshot => {
//         const userRemoved = snapshot.val();
//         console.log("Usuario eliminado:", userRemoved);
//     });
// }

// removeUser(userRef);