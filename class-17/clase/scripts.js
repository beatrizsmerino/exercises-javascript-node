function peticionAjax(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {

        if(xmlHttp.readyState === 1){
            let loadingElem = document.createElement("p");
            loadingElem.setAttribute("id", "loading");
            let loadingTextElem = document.createTextNode("...");

            loadingElem.appendChild(loadingTextElem);
            document.body.appendChild(loadingElem);
            
        }else if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let url = JSON.parse(xmlHttp.responseText);
            console.info(typeof url, url);
            console.info(typeof url.next, url.next);
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

function setData(api) {
    // 1.-
    // let template = "";

    for (let index = 0; index < api.results.length; index++) {
        let element = api.results[index];
        console.log(element.name);

        // 1.-
        // template += "<p>" + element.name + "</p>";
        // template += `<p>${element.name}</p>`;

        // 2.-
        let cardElem = document.createElement("div");
        cardElem.setAttribute("data-index", index);

        let templateElem = document.createElement("p");
        let templateTextElem = document.createTextNode("Name: " + element.name);
        templateElem.appendChild(templateTextElem);
        
        cardElem.appendChild(templateElem);
        document.body.appendChild(cardElem);
    }

    // 1.-
    // document.body.innerHTML = template;
}


let urlAPI = "https://swapi.co/api/people/";

buttonApi.addEventListener("click", function(){
    let requestAPI = peticionAjax(urlAPI);
});