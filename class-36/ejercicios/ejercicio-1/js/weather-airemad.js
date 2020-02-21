/**
 * @file Weather with the 'Open Weather API'
 * @module airemad
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// Need API key 'Airemad'
/**
 * @const module:airemad~API
 * @description API root of 'Airemad'
 * @type {String}
 */
const API = "http://airemad.com/api/v1/";





/**
 * @function module:airemad.getStation
 * @description Get data of the list of stations of 'Airemad'
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getStation = async () => {
	const getData = await fetch(`${API}station`);
	let getDataResponse = getData.json();

	return getDataResponse;
}





/**
 * @function module:airemad.getWeather
 * @description Get data weather of 'Airemad'
 * @param {String} id
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export const getWeatherById = async (id) => {
	const getData = await fetch(`${API}weather/${id}`);
	let getDataResponse = getData.json();

	return getDataResponse;
}