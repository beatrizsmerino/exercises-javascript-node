/**
 * @file Weather with the 'Open Weather API'
 * @module openweather
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// Need API key 'Open Weather'
/**
 * @const module:openweather~API
 * @description API root of 'Airemad'
 * @type {String}
 */
const API = "http://api.openweathermap.org/data/2.5/";





/**
 * @const module:openweather~API_KEY
 * @description API key of 'Airemad'
 *  * Instrucctions of use:
 * 1. Go to https://home.openweathermap.org/api_keys and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 */
const API_KEY = "XXXXXXXXXXX";





/**
 * @function module:openweather.getDataByCoords
 * @description Get data weather of the coords
 * @param {Object} coords
 * @return {Promise}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export async function getDataByCoords(coords) {
	const url = `${API}weather?units=metric&lang=es&APPID=${API_KEY}&lat=${coords.latitude}&lon=${coords.longitude}`;

	try {
		const response = await fetch(url);

		switch (response.status) {
			case 200:
				let getData = response.json();
				return getData;
				break;
			default:
				console.warn(`Error: ${response.status}`);
				break;
		}
		// console.info(`Estado del servidor: ${response.status === 200 ? "OK" : "NOT OK"}`);

	} catch (e) {
		throw `Error: ${e}`;
	}
}





/**
 * @function module:openweather.getDataByCityName
 * @description Get data of the city
 * @param {String} cityName - Name of the city
 */
export const getDataByCityName = async (cityName) => {
	const url = `${API}weather?units=metric&lang=es&APPID=${API_KEY}&q=${cityName}`;
	const getData = await fetch(url);
	let response = getData.json();

	return response;
};




/**
 * @function module:openweather.getDataForecast
 * @description Get data forecast, searching by city name or city id or coords.
 * Call hourly/day/daily forecast data. It is only available for all paid accounts.
 * @param {Object} searchInfo - Search info
 * @param {String} searchInfo.by - Choose one search option: cityName | cityId | coords
 * @param {String|Number|Object} searchInfo.data - City name, id city or coords
 * @param {Number} numberForecast - Number of results
 */
export const getDataForecast = async (searchInfo, numberForecast) => {
	let url = `${API}forecast/daily?units=metric&lang=es&APPID=${API_KEY}&cnt=${numberForecast}`;

	switch (searchInfo.by) {
		case "cityName":
			url += `&q=${searchInfo.data}`;
			break;
		case "cityId":
			url += `&id=${searchInfo.data}`;
			break;
		case "coords":
			url += `&lat=${searchInfo.data.latitude}&lon=${searchInfo.data.longitude}`;
			break;
		default:
			break;
	}

	const getData = await fetch(url);
	let response = getData.json();

	return response;
}





/**
 * @function module:openweather.setWidget
 * @description Set widget of the city
 * @param {Object} widgetOptions 
 * @param {Object|String} location - Value to search (city name | coords)
 * @see Used inside:
 * - 'weather-openweather.js' -> {@link module:openweather~getDataByCityName}, {@link module:openweather~getDataByCoords}, {@link module:openweather~createWidget}
 * @see Used in:
 * @see - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function setWidget(widgetOptions, location, elementDom) {

	let idContentWidgets = "openWeatherWidgets";
	let classContentWidgets = "open-weather-widgets";

	if (!document.querySelector(`#${idContentWidgets}`)) {
		let content = document.createElement("div");
		content.setAttribute("id", idContentWidgets);
		content.setAttribute("class", classContentWidgets);
		document.querySelector(elementDom).appendChild(content);
	}

	switch (typeof location) {
		case "string":
			getDataByCityName(location)
				.then(data => {
					createWidget(widgetOptions, data.id, `#${idContentWidgets}`);
				});
			break;
		case "object":
			getDataByCoords(location)
				.then(data => {
					createWidget(widgetOptions, data.id, `#${idContentWidgets}`);
				});
		default:
			break;
	}
}





/**
 * @function module:openweather~createWidget
 * @description Create and insert widget of 'Open Weather'
 * @param {Number} cityId - Type widget style of 'Open Weather'
 * @param {Object} options - Type widget style of 'Open Weather'
 * @param {Number} options.widgetType - Type widget style of 'Open Weather'
 * Types widget:
 * Gold: 1 - 9 | Green: 11 - 19 | Black: 21 -24
 * The options 1 and 11:
 * Please note that the widget with chart and 8-days forecast available for paid subscriptions.
 * This widget will provide only current weather data for the Free account.
 * @param {String} elementDom - Selector string of the element html
 * @see Used in:
 * @see - 'weather-openweather.js' -> {@link module:openweather.setWidget}
 */
function createWidget(options, cityId, elementDom) {
	window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
	window.myWidgetParam.push({
		id: options.widgetType,
		cityid: cityId,
		appid: API_KEY,
		units: 'metric',
		containerid: `openweathermap-widget-${options.widgetType}`,
	});

	(function () {
		const scriptsUrl = [
			"//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js",
			"//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"
		];

		scriptsUrl.map(scriptUrl => {
			var script = document.createElement('script');
			script.async = true;
			script.charset = "utf-8";
			script.src = scriptUrl;
			document.querySelector("head").appendChild(script);
		});

		document.querySelector(elementDom).innerHTML += `<div id="openweathermap-widget-${options.widgetType}"></div>`;
	})();
}