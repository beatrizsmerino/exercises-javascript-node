// Practicando Firebase

// Datos para conectar con la base de datos de mi proyecto en Firebase
// Change this string 'XXXXXXXXXXXX' for yor data
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "XXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXX",
    projectId: "fXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXX",
    appId: "XXXXXXXXXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);






// FIREBASE - STORAGE
// Create and upload file with a message
function uploadMessage(message) {
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child("messages/hola-mundo.txt");

    ref.putString(message).then(function (snapshot) {
        console.log("Archivo con string subido con exito!");
        console.log(snapshot);
    });
}
// uploadMessage("Hola mundo desde Firebase!");



// FIREBASE - STORAGE
// Upload Blob
// https://developer.mozilla.org/es/docs/Web/API/Blob
function uploadBlob() {
    const aFileParts = ['<a id="a"><b id="b">Hey!</b></a>']; // Array
    const file = new Blob(aFileParts, { type: 'text/html' }); // Blob
    const storageRef = firebase.storage().ref();
    const ref = storageRef.child("html/hola-mundo.html");
    ref.put(file).then(function (snapshot) {
        console.log("Archivo con html subido con exito!");
        console.log(snapshot);
    });
}
// uploadBlob();


function readFileHTML(url) {
    firebase
        .storage()
        .ref()
        .child(url)
        .getDownloadURL()
        .then((url) => {
            // Leer fichero
            fetch(url)
                .then(response => {
                    // Devuelve el fichero -> Formatear objecto tipo file
                    return response.blob();
                })
                .then(file => {
                    // Leer fichero
                    const reader = new FileReader();

                    reader.addEventListener("loadend", function (e) {
                        const contentFile = e.srcElement.result;
                        console.log(contentFile);

                        // Dibujarlo en el DOM
                        document.getElementById('myFile').innerHTML += contentFile;
                    });

                    // Lectura del fichero
                    reader.readAsText(file);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

// readFileHTML("html/hola-mundo.html");



// FIREBASE - STORAGE
// Upload image
// https://firebase.google.com/brand-guidelines/?hl=es
function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
function uploadImage(rootImage) {

    fetch(rootImage)
        .then(image => {
            return image.blob();
        })
        .then(file => {
            // console.log(file);

            const storageRef = firebase.storage().ref();
            const ref = storageRef.child(rootImage);

            const extensionFile = getFileExtension3(rootImage);
            console.log(extensionFile);

            let contentType = "";
            switch (extensionFile) {
                case 'jpeg':
                    contentType = 'image/jpeg';
                    break;
                case 'jpg':
                    contentType = 'image/jpg';
                    break;
                case 'png':
                    contentType = 'image/png';
                    break;
                case 'svg':
                    contentType = 'image/svg+xml';
                    break;
                default:
                    break;
            }

            let metadata = {
                contentType: contentType
            };
            console.log(contentType);

            ref.put(file, metadata).then(function (snapshot) {
                console.log(`Imagen ${extensionFile} subida con exito!`);
                console.log(snapshot);
            });
        })
        .catch(e => console.log(e));
}

uploadImage("img/logo.jpeg");
uploadImage("img/logo.jpg");
uploadImage("img/logo.png");
uploadImage("img/logo.svg");



// FIREBASE - STORAGE
// Download image
function downloadImage(rootImage) {
    // Create a root reference
    const storageRef = firebase.storage().ref();

    storageRef.child(rootImage).getDownloadURL().then((url) => {
        // Insert into an <img> element:
        let contentImage = document.getElementById('myimg');
        let image = new Image;
        image.src = url;
        contentImage.appendChild(image);
    }).catch(function (error) {
        // Handle any errors
        console.log(error);
    });
}

// downloadImage("img/logo.png");




// FIREBASE - STORAGE
// Remove image
function removeImage(rootImage) {
    firebase
        .storage()
        .ref()
        .child(rootImage)
        .delete()
        .then(() => console.log("File deleted successfully"))
        .catch(error => console.log("Uh-oh, an error occurred!", error));
}

// removeImage("img/logo.png");