// 1 - Utiliza Google Maps para posicionar al usuario.

// Change the string for your API key of Google Maps
// Go to https://console.cloud.google.com/apis/credentials/ and generate key

const token = "xxxxxxxxxx";

const posicionaUsuario = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let coords = position.coords;
            // let coords = {
            //     latitude: position.coords.latitude.toFixed(4),
            //     longitude: position.coords.longitude.toFixed(4)
            // };

            console.log(coords.latitude, coords.longitude);

            //return coords;
            paintCoords(coords);
            initMap(coords);
        });
    } else {
        console.warn("Geolocation no soportado :-( ");
        return false;
    }
};



function paintCoords(coords) {
    //let coords = getCoords();
    console.log(coords);

    let paragraphElem = document.createElement("p");
    let paragraphTextElem = document.createTextNode(`${coords.latitude}, ${coords.longitude}`);

    paragraphElem.appendChild(paragraphTextElem);
    document.getElementById("coords").appendChild(paragraphElem);
}


function initMap(coords) {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: coords.latitude, lng: coords.longitude }
    });
}

posicionaUsuario();
console.log('fondo rojo');