// https://developer.github.com/v3/users/
// https://github.com/octocat
// https://api.github.com/users/%5Bnombre_usuario%5D/events

let urlAPI = "https://api.github.com/users/";
let urlEventsAPI = "/events";
let bodyDom = document.body;
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
    padding: 0.5rem 1rem;
    color: ${color.color_brand_2};
    background-color: ${color.color_brand_1};
`;


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
    console.info(url);

    addLoader(bodyDom);

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let timer = setInterval(function () {
                removeLoader(bodyDom);
                setAction(action, data);
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
function setAction(action, responseData) {
    switch (action) {
        case "insertData":
            insertData(responseData);
            break;
        case "insertDataEvents":
            insertDataEvents(responseData);
            break;
        default:
            break;
    }
}

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

    // console.dir(content);

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
    document.getElementById("popupClose").addEventListener("click", function () {
        removeData();
    });
}

function removeData() {
    let popup = document.getElementById("popup");
    bodyDom.removeChild(popup);
}

function insertDataEvents(responseData) {
    console.log("%cfunction->insertDataEvents", `; ${stylesConsole}`);
    console.table(responseData);

    let popup = document.querySelector(".popup__content");

    let eventsDom = document.createElement("div");
    eventsDom.setAttribute("class", "dataEvents");

    for (const key in responseData) {
        const element = responseData[key];
        let eventItemDom = document.createElement("div");

        eventItemTextDom = document.createTextNode(element);
        eventItemDom.setAttribute("class", "dataEvents__item");

        for (const key in element) {
            const element2 = element[key];
            if (element.hasOwnProperty(key)) {

            }
        }

        eventItemDom.appendChild(eventItemTextDom);
        eventsDom.appendChild(eventItemDom);
    }

    popup.appendChild(eventsDom);
}

function init(searchValue) {
    searchButtonDom.classList.add("is-searching");
    ajaxHandler(urlAPI + searchValue, "insertData");

    let timerPopUp = setInterval(function () {
        let popup = document.querySelector(".popup__content");
        if (popup) {
            console.log("Existe popup");
            clearInterval(timerPopUp);
            ajaxHandler(urlAPI + searchValue + urlEventsAPI, "insertDataEvents");
        }
    }, 300);
}

searchDom.addEventListener(
    "keyup",
    delay(function () {
        init(this.value);
    }, 2000)
);
searchButtonDom.addEventListener("click", init(searchDom.value));
