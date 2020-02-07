/**
 * @file Canvas: Temperature and humidity evolution graph based on the weather forecast using the Open Weather Map API
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





import * as clipboard from './clipboard.js';
import * as loader from './loader.js';
import * as googleMaps from './google-maps.js';



export function printCoords(coords, callback) {
    const coordsDom = document.getElementById("coords");
    const position = `${coords.latitude}, ${coords.longitude}`;
    const element = clipboard.create(position);
    coordsDom.innerHTML = element;
    callback();
}



export function getGeolocation() {
    if ("geolocation" in navigator) {
        console.log("You can use Geolocation! :-) ");
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    } else {
        alert("Geolocation is not supported by this browser. :-( ");
        // La propiedad 'then' no existe en el tipo 'false | Promise<any>'.
        // return false;

        return new Promise(
            resolve => resolve({})
        )
    }
};



export function setGeolocation() {
    loader.add();

    getGeolocation()
        .then(position => {
            console.log(position);

            let coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            loader.remove();
            printCoords(coords, clipboard.addEventClick);
            googleMaps.setMap(coords);
            googleMaps.setImage(coords);
        })
        .catch(
            error => {
                console.log(`Code of error: ${error}`);

                loader.remove();

                var msg = null;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        msg = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        msg = "An unknown error occurred.";
                        break;
                }
                alert(msg);
            }
        );
}