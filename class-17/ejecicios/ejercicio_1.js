// 1. - Sacar en el html los datos de polen.



let urlAPI = "http://airemad.com/api/v1/pollen";

let resultBox = document.querySelectorAll("#ejercicio1 .content")[0];
let ejercicio1Button = document.querySelector("#ejercicio1Button");



function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {

        if (xmlHttp.readyState === 1) {
            let loadingElem = document.createElement("p");
            loadingElem.setAttribute("id", "loading");
            let loadingTextElem = document.createTextNode("...");

            loadingElem.appendChild(loadingTextElem);
            document.body.appendChild(loadingElem);

        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let url = JSON.parse(xmlHttp.responseText);
            setData(url);
            // remove element loading
            let loading = document.getElementById("loading");
            document.body.removeChild(loading);

        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function setData(object) {
    object.forEach((element) => {
        const locationName = element.name;
        const locationId = element.id;
        const locationLongitude = element.UTM_longitud;
        const locationLatitude = element.UTM_latitud;
        const locationHeight = element.altura;
        const locationParameters = element.parametros;

        // LOCATION
        let cardElem = document.createElement("div");
        cardElem.setAttribute("data-index", locationId);
        cardElem.setAttribute("class", "location");


        // NAME
        let nameElem = document.createElement("h2");
        let nameTextElem = document.createTextNode(locationName);


        // INFO (latitude, longitude, height)
        let infoElem = document.createElement("p");
        let infoTextElem = document.createTextNode("Latitude and Longitude (" + locationLongitude + ", " + locationLatitude + "), Height: " + locationHeight);


        // LOCATION (name and info)
        nameElem.appendChild(nameTextElem); // name
        cardElem.appendChild(nameElem);
        
        infoElem.appendChild(infoTextElem); // info
        cardElem.appendChild(infoElem);


        // PARAMETERS
        for (const key in locationParameters) {
            const element = locationParameters[key];

            const elementMiddle = element.medio;
            const elementHight = element.alto;
            const elementVeryHight = element.muy_alto;

            let parametersElem = document.createElement("ul");
            let parametersItemElem = document.createElement("li"); // parameter name
            let parametersItemNameElem = document.createElement("h3");
            let parametersItemNameTextElem = document.createTextNode(key);

            let parametersItemDataElem = document.createElement("ul"); // parameter list
            // -----------
            let parametersMiddleElem = document.createElement("li");
            let parametersMiddleTextElem = document.createTextNode(elementMiddle);
            // -----------
            let parametersHightElem = document.createElement("li");
            let parametersHightTextElem = document.createTextNode(elementHight);
            // -----------
            let parametersVeryHightElem = document.createElement("li");
            let parametersVeryHightTextElem = document.createTextNode(elementVeryHight);

            parametersItemNameElem.appendChild(parametersItemNameTextElem); 
            
            parametersMiddleElem.appendChild(parametersMiddleTextElem); // insert text li
            parametersHightElem.appendChild(parametersHightTextElem);
            parametersVeryHightElem.appendChild(parametersVeryHightTextElem);

            parametersItemDataElem.appendChild(parametersMiddleElem); // insert li
            parametersItemDataElem.appendChild(parametersHightElem);
            parametersItemDataElem.appendChild(parametersVeryHightElem);
            

            parametersElem.appendChild(parametersItemElem); // insert text name
            parametersItemElem.appendChild(parametersItemNameElem);


            parametersElem.appendChild(parametersItemDataElem); // insert ul

            cardElem.appendChild(parametersElem);
        }

        resultBox.appendChild(cardElem); // all
    });
}


ejercicio1Button.addEventListener("click", function () {
    let requestAPI = peticionAjax(urlAPI);
});