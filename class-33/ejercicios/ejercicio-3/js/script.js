/**
 * @file Main file.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires api
 * @requires googleMaps
 */
import * as api from './data-api.js';
import * as googleMaps from './google-maps.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link module:googleMaps.insertTagScript}, {@link module:googleMaps.API}, {@link module:googleMaps.API_KEY_MAP}
 */
(function () {
	if (
		googleMaps.insertTagScript(`${googleMaps.API}js?key=${googleMaps.API_KEY_MAP}`)
	) {
		api.getData("http://api.metro.net/agencies/lametro/vehicles/")
			.then(result => {
				// console.log(result);
				googleMaps.createMap(result);
			});
	}
})();