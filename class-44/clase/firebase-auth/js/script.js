// Practicando Firebase

// 0. Datos para conectar con la base de datos de mi proyecto en Firebase
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





// AUTH - REGISTER user with email and password
function registerUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res);

            console.group("Register!");
            var user = firebase.auth().currentUser;
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("Provider-specific UID: " + profile.uid);
                console.log("Email: " + profile.email);
            });
            console.groupEnd();

            alert(`"Thanks for register!`);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            let mng = null;
            switch (errorCode) {
                case "auth/email-already-in-use":
                    mng = errorMessage;
                    break;
                default:
                    break;
            }


            if (mng !== null) {
                alert(mng);
            }
        });
}

// registerUser("usuario@gmail.com", "myPass12345");





// AUTH - LOGIN user with email and password
function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res);
            var user = firebase.auth().currentUser;

            console.group("Login!");
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("Provider-specific UID: " + profile.uid);
                console.log("Email: " + profile.email);
            });
            console.groupEnd();

            alert(`"Welcome! ${profile.email}`);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            let mng = null;
            switch (errorCode) {
                case "auth/wrong-password":
                    mng = errorMessage;
                    break;
                case "auth/user-not-found":
                    mng = errorMessage;
                default:
                    break;
            }

            if (mng !== null) {
                alert(mng);
            }
        });
}

// loginUser("usuario@gmail.com", "myPass12345");





// AUTH - LOGOUT user with email and password
function logoutUser(email, password) {
    console.log("Saliendo del sistema: " + firebase.auth().currentUser.email);

    firebase.auth().signOut(email, password)
        .then((res) => {
            console.log(res);
            var user = firebase.auth().currentUser;

            console.group("Logout!");
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("Provider-specific UID: " + profile.uid);
                console.log("Email: " + profile.email);
            });
            console.groupEnd();

            alert(`"Good bye! ${profile.email}`);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            console.log("Error deslogueado");
        });
}

// logoutUser("usuario@gmail.com", "myPass12345");




// Listenners of logins
// bug -> NOT WORKING
// functions.auth.user().onCreate((user) => {
//     const resgister = document.getElementById("register");
//     const login = document.getElementById("login");
//     const logout = document.getElementById("logout");

//     if (user) {
//         resgister.classList.remove("is-active");
//         login.classList.add("is-active");
//         logout.classList.remove("is-active");
//     }
// });

firebase.auth().onAuthStateChanged(function (user) {
    const resgister = document.getElementById("register");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");

    // console.log(resgister);
    // console.log(login);
    // console.log(logout);


    resgister.classList.add("is-active");
    login.classList.remove("is-active");
    logout.classList.remove("is-active");

    if (user) {
        // User signed in!
        var uid = user.uid;
        resgister.classList.add("is-active");
        login.classList.add("is-active");
        logout.classList.remove("is-active");
    } else {
        // User logged out
        resgister.classList.remove("is-active");
        login.classList.remove("is-active");
        logout.classList.add("is-active");
    }
});






(function () {
    // REGISTER
    document.getElementById("buttonRegister").addEventListener("click", function (e) {
        e.preventDefault();
        const formDom = document.getElementById("formRegister");
        const emailDom = document.getElementById("emailUserRegister").value;
        const passwordDom = document.getElementById("passwordUserRegister").value;

        if ((emailDom !== null && emailDom !== "") &&
            (passwordDom !== null && passwordDom !== "")) {

            registerUser(emailDom, passwordDom);
        }
    });

    // LOGIN
    document.getElementById("buttonLogin").addEventListener("click", function (e) {
        e.preventDefault();
        const formDom = document.getElementById("formLogin");
        const emailDom = document.getElementById("emailUserLogin").value;
        const passwordDom = document.getElementById("passwordUserLogin").value;

        if ((emailDom !== null && emailDom !== "") &&
            (passwordDom !== null && passwordDom !== "")) {

            loginUser(emailDom, passwordDom);
        }
    });

    // LOGOUT
    document.getElementById("buttonLogout").addEventListener("click", function (e) {
        e.preventDefault();
        const formDom = document.getElementById("formLogout");
        const emailDom = document.getElementById("emailUserLogout").value;
        const passwordDom = document.getElementById("passwordUserLogout").value;

        if ((emailDom !== null && emailDom !== "") &&
            (passwordDom !== null && passwordDom !== "")) {

            logoutUser(emailDom, passwordDom);
        }
    });
})();