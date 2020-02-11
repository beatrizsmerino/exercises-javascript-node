/**
 * @file Main file.
 * Exercise 2. Use 'Leaflet API' for geolocate the user.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
* @external geolocation
* @see {@link ./js/geolocation.js}
*/
import * as geolocation from './geolocation.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link geolocation.set}
 */
(function () {
	/**
	 * @event click
	 */
	document.getElementById("getGeolocation").addEventListener("click", geolocation.set);
})();