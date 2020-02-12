/**
 * @file
 * @module geolocation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @see {@link ./js/loader.js}
 */
import * as loader from './loader.js';


/**
 * @see {@link ./js/google-maps.js}
 */
import * as googleMaps from './google-maps.js';





/**
 * @function module:geolocation.set
 * @description Get the geolocation of the transport vehicles of 'Los Angeles' (trains and buses) and set a map with the 'API Google Maps'.
 * @see Used inside:
 * @see - 'loader.js' -> {@link module:loader.add}, {@link module:loader.remove}
 * @see - 'google-maps.js' -> {@link module:googleMaps.setMap}
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
			googleMaps.setMap(coords);
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