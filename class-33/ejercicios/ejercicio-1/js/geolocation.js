/**
 * @file
 * @module geolocation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @see {@link ./js/clipboard.js}
 */
import * as clipboard from './clipboard.js';


/**
 * @see {@link ./js/loader.js}
 */
import * as loader from './loader.js';


/**
 * @see {@link ./js/google-maps.js}
 */
import * as googleMaps from './google-maps.js';





/**
 * @function geolocation.printCoords
 * @description Insert the coordinates in a 'clipboard' component and this in the html.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @param {Function} callback - Function for after print the coordinates
 * @see Used inside:
 * @see - 'clipboard.js' -> {@link module:clipboard.create}
 * @see Used in:
 * @see - 'clipboard.js' -> {@link module:clipboard.set}
 */
function printCoords(coords, callback) {
	const coordsDom = document.getElementById("coords");
	const position = `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
	const element = clipboard.create(position);
	coordsDom.innerHTML = element;
	callback();
}



/**
 * @function geolocation.get
 * @description Get your geolocation in this moment with the 'API HTML5'.
 * @return {Promise}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link geolocation.set}
 */
function get() {
	if ("geolocation" in navigator) {
		// console.log("You can use Geolocation! :-) ");
		return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
	} else {
		alert("Geolocation is not supported by this browser. :-( ");

		// return false; // Console Error: La propiedad 'then' no existe en el tipo 'false | Promise<any>'.
		return new Promise(
			resolve => resolve({})
		)
	}
}



/**
 * @function module:geolocation.set
 * @description If find your geolocation, print this coordinates, show a map and image of the street with the 'API Google Maps'.
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link geolocation.get}, {@link geolocation.printCoords}
 * @see - 'loader.js' -> {@link module:loader.add}, {@link module:loader.remove}
 * @see - 'google-maps.js' -> {@link module:googleMaps.setMap}, {@link module:googleMaps.setImage}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function set() {
	loader.add();

	get()
		.then(position => {
			// console.log(position);

			let coords = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};

			loader.remove();
			printCoords(coords, clipboard.afterCreate);
			googleMaps.setMap(coords);
			googleMaps.setImage(coords, "350x350", undefined, 120, undefined, 100, "outdoor");
		})
		.catch(
			error => {
				// console.warn(`Code of error: ${error}`);

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