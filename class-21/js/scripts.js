// https://developer.github.com/v3/users/
// https://github.com/octocat
// https://api.github.com/users/%5Bnombre_usuario%5D/events

let urlAPI = "https://api.github.com/users/";
let urlEventsAPI = "/events";
let searchDom = document.getElementById("search");
let searchButtonDom = document.getElementById("button");

let color = {
    "color_brand_1": "#eba764",
    "color_brand_2": "#514e51",
    "color_brand_3": "#e7dfdd",
    "color_brand_4": "#f1c28f",
    "color_brand_5": "#fd7667",
    "color_brand_6": "#c48344",
};

let stylesConsole = `
    padding: 0.4rem .8rem;
    color: ${color.color_brand_2};
    background-color: ${color.color_brand_1};
`;


let user = {
    "name": "",
    "login": "",
    "email": ""
}


// TOOLS
//////////////////////////////////
function delay(fn, ms) {
    let timer = 0;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
    };
}

function svgMe() {
    let images = document.querySelectorAll("img.svgMe");

    // console.info("Array of images -> ", images);

    images.forEach(image => {
        let imgId = image.getAttribute("id");
        let imgClass = image.getAttribute("class");
        let imgUrl = image.getAttribute("src");

        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                // console.info("request in xml -> ", request.responseXML);
                callback(request.responseXML);
            }
        };

        function callback(requestXML) {
            let imgSvg = requestXML.querySelector("svg");

            // console.info("data type of 'data' -> ", typeof requestXML);
            // console.info("'data' -> ", requestXML);
            // console.info("images with svgMe -> ", imgSvg);

            if (typeof imgId !== "undefined") {
                // console.info(imgId);
                imgSvg.setAttribute("id", imgId);
            }

            if (typeof imgClass !== "undefined") {
                // console.info(imgClass);
                imgSvg.setAttribute("class", imgClass);
                imgSvg.classList.add("svgMe--replaced");
            }

            imgSvg.removeAttribute("xmlns:a");
            if (
                !imgSvg.getAttribute("viewBox") &&
                imgSvg.getAttribute("height") &&
                imgSvg.getAttribute("width")
            ) {
                imgSvg.setAttribute(
                    "viewBox",
                    "0 0 " + imgSvg.getAttribute("height") + " " + imgSvg.getAttribute("width")
                );
            }

            image.replaceWith(imgSvg);
        }

        request.open("GET", imgUrl);
        request.send();
    });
}
svgMe();


// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url, action) {
    // console.info(url);

    addLoader();

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let timer = setInterval(function () {
                removeLoader();
                setAction(action, data);
                clearInterval(timer);
                return data;
            }, 5000);
        })
        .catch(function (error) {
            console.warn(error);
        });
}

// LOADER
//////////////////////////////////
function addLoader() {
    let loader = document.getElementById("loader");
    if (!loader) {
        let loader = document.createElement("div");
        loader.setAttribute("id", "loader");
        loader.setAttribute("class", "loader");
        loader.style.backgroundImage = "url('images/loader.gif')";
        document.body.appendChild(loader);
    }
}

function removeLoader() {
    let loader = document.getElementById("loader");
    if (loader) {
        document.body.removeChild(loader);
    }
}

// INSERT DATA
//////////////////////////////////
function setAction(action, responseData) {
    switch (action) {
        case "setUserData":
            setUserData(responseData);
            break;
        case "getUserEmail":
            getUserEmail(responseData);
            break;
        default:
            break;
    }
}

function templatePopup() {
    let popup = document.createElement("div");
    popup.setAttribute("id", "popup");

    let template = `
        <div class="popup">
            <div class="popup__inner">
                <div id="popupClose" class="popup__close"></div>
                    <div class="popup__content"></div>
                </div>
            </div>
        </div>
	`;

    popup.innerHTML = template;
    document.body.appendChild(popup);

    document.getElementById("popupClose").addEventListener("click", function () {
        removeData();
    });
}

function setUserData(responseData) {
    console.table("setUserData: ", responseData);

    if (!document.getElementById("popup")) {
        templatePopup();
    }

    if (responseData) {
        let userData = document.createElement("div");
        userData.classList.add("user-data");
        userData.setAttribute("id", "userData");
        document.getElementsByClassName("popup__content")[0].appendChild(userData);


        // Si el usuario existe
        let userLogin = "";
        if (responseData.login === null || responseData.login === "" || responseData.login === "undefined") {
            userLogin = "User not found";
        } else {
            userLogin = responseData.login;
        }
        user.login = userLogin;


        // Si el usuario existe buscamos su nombre y su email
        if (userLogin !== "") {
            // Si el nombre de usuario existe buscamos su nombre
            let userName = "";
            if (responseData.name === null || responseData.name === "" || responseData.name === "undefined") {
                userName = "Name not found";
            } else {
                userName = responseData.name;
            }
            user.name = userName;

            // Si el nombre de usuario existe buscamos su email
            let userEmail = "";
            if (responseData.email === null || responseData.email === "" || responseData.email === "undefined") {
                // Si no lo encuentra busca mas a fondo en los eventos del usuario
                userEmail = "Email not found";
                ajaxHandler(urlAPI + user.login + urlEventsAPI, "getUserEmail");
            } else {
                userEmail = responseData.email;
            }
            user.email = userEmail;
        }

        insertUserData();
    }
}

function removeData() {
    let popup = document.getElementById("popup");
    if (popup) {
        document.body.removeChild(popup);
    }

    user.name = "";
    user.login = "";
    user.email = "";
}

function getUserEmail(responseData) {
    console.table("getUserEmail: ", responseData);

    for (let i = 0; i < responseData.length; i++) {
        let element = responseData[i];
        // let userEmail = element.payload.commits[0].author.email;

        // console.log(user.email);
        if (user.email === "Email not found") {
            if (element.hasOwnProperty("payload")) {
                let payload = element.payload;
                if (payload.hasOwnProperty("commits")) {
                    for (let j = 0; j < element.payload.commits.length; j++) {
                        let commit = element.payload.commits[j];
                        if (commit.hasOwnProperty("author")) {
                            let author = commit.author;

                            if (author.hasOwnProperty("name")) {
                                let userName = "";
                                if (user.name === "Name not found") {
                                    if (author !== null || author !== "" || author !== "undefined") {
                                        userName = author.name;
                                    }
                                } else {
                                    userName = user.name;
                                }

                                if (author.hasOwnProperty("email")) {
                                    let userEmail = "";

                                    if (user.email === "Email not found") {
                                        if (userName == user.name || userName == user.login) {
                                            userEmail = author.email;

                                            // console.log(userEmail.search("noreply"));
                                            if (userEmail.search("noreply") == -1) {
                                                user.email = userEmail;
                                                break;
                                            } else {
                                                continue;
                                            }
                                        } else {
                                            continue;
                                        }
                                    }

                                } else {
                                    continue;
                                }

                            } else {
                                continue;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    continue;
                }

            } else {
                continue;
            }
        } else {
            break;
        }
    }

    insertUserData();
}

function insertUserData() {
    console.info("%cUser:", stylesConsole);
    console.info(user);

    let templateUserEmail = "";
    if (user.email !== "Email not found") {
        templateUserEmail = `<a href="mailto:${user.email}">
								${user.email}
							</a>`;
    } else {
        templateUserEmail = user.email;
    }

    let templateUser = `
					<div class="user-data__inner">
						<p class="user-data__login">
							<a href="http://github.com/${user.login}" target="_blank">
								${user.login}
							</a>
						</p>
						<p class="user-data__name">
							${user.name}
						</p>
						<p class="user-data__email">
							${templateUserEmail}
						</p>
					</div>
				`;

    let userData = document.getElementById("userData");
    userData.innerHTML = templateUser;
    error404(userData);
}

function error404(userData) {
    if (
        user.login === "User not found"
    ) {
        userData.classList.add("is-error404");
    }
}


function init(searchValue) {
    searchButtonDom.classList.add("is-searching");
    ajaxHandler(urlAPI + searchValue, "setUserData");
}

searchDom.addEventListener(
    "keyup",
    delay(function () {
        init(this.value);
    }, 2000)
);
searchButtonDom.addEventListener("click", function () {
    init(searchDom.value);
});
