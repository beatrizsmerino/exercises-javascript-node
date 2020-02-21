/**
 * @file Geolocation with the 'HTML5 API'
 * @module geolocation
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:geolocation~get
 * @description Get your geolocation in this moment with the 'API HTML5'.
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function get() {
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