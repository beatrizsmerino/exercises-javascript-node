/**
 * @file Main file.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
* @see {@link ./js/tools.js}
*/
import * as tools from './tools.js';


/**
 * @see {@link ./js/geolocation.js}
 */
import * as geolocation from './geolocation.js';


/**
 * @see {@link ./js/google-maps.js}
 */
import * as googleMaps from './google-maps.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link googleMaps.insertTagScript},
 * @see - 'geolocation.js' -> {@link geolocation.set}
 */
(function () {
	googleMaps.insertTagScript();

	/**
	 * @event click
	 */
	document.getElementById("getGeolocation").addEventListener("click", geolocation.set);
})();