// https://developer.github.com/v3/users/
// https://github.com/octocat
// https://api.github.com/users/%5Bnombre_usuario%5D/events


let urlAPI = "https://api.github.com/users/";
let bodyDom = document.body;
let searchDom = document.getElementById("search");
let buttonDom = document.getElementById("button");




// TOOLS
//////////////////////////////////
function delay(fn, ms) {
    let timer = 0;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
    }
}





// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url) {
    addLoader(bodyDom);

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let timer = setInterval(function () {
                removeLoader(bodyDom);
                insertData(data);

                clearInterval(timer);
            }, 5000);
        })
        .catch(function (error) {
            console.warn(error);
        });
}





// LOADER
//////////////////////////////////
function addLoader(elementDom) {
    let loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "loader");
    loader.style.backgroundImage = "url('images/loader.gif')";
    elementDom.appendChild(loader);
}

function removeLoader(elementDom) {
    let loader = document.getElementById("loader");
    elementDom.removeChild(loader);
}





// INSERT DATA
//////////////////////////////////
function insertData(responseData) {
    let popup = document.createElement("div");
    popup.setAttribute("id", "popup");
    console.table(responseData);

    let content = document.createElement("div");
    content.setAttribute("class", "dataUser");

    for (const key in responseData) {
        const element = responseData[key];
        // console.log(element);

        let strong = document.createElement("strong");
        let strongText = document.createTextNode(key + ": ");
        let paragraph = document.createElement("p");
        let paragraphText = document.createTextNode(element);

        strong.appendChild(strongText);
        paragraph.appendChild(strong);
        paragraph.appendChild(paragraphText);
        content.appendChild(paragraph);
    }
    console.dir(content);

    let template = `
        <div class="popup">
            <div class="popup__inner">
                <div id="popupClose" class="popup__close"></div>
                <div class="scroll">
                    <div class="scroll__inner">
                        <div class="popup__content scroll__content">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    popup.innerHTML = template;
    bodyDom.appendChild(popup);
    
    document.getElementsByClassName("popup__content")[0].appendChild(content);
    document.getElementById("popupClose").addEventListener("click", function(){
        removeData();
    });
}

function removeData() {
    let popup = document.getElementById("popup");
    bodyDom.removeChild(popup);
}



searchDom.addEventListener("keyup", delay(function () {
    let thisValue = this.value;
    console.info(thisValue);

    buttonDom.classList.add("is-searching");
    ajaxHandler(urlAPI + thisValue);
}, 500));