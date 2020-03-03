/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires loader
 * @requires geolocation
 * @requires openweather
 * @requires graphicChart
 */
import * as tool from './tools.js';
import * as loader from './loader.js';
import * as geolocation from './geolocation.js';
import * as openweather from './weather-openweather.js';
import * as airemad from './weather-airemad.js';
import * as graphicChart from './graphic-chart.js';





/**
 * @function functionAnonimAutoExecuted
 * @description Anonymous auto executed function
 * @see Used inside:
 * @see - 'geolocation.js' -> {@link module:geolocation.get}
 * @see - 'openweather.js' -> {@link module:openweather.get}
 */
(function () {
	loader.add();

	geolocation.get()
		.then(position => {
			let coords = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
			// console.table(coords);

			openweather.getDataByCoords(coords)
				.then(response => {
					// console.info(response);

					openweather.setWidget({ widgetType: 5 }, "España", ".page__content");
					openweather.setWidget({ widgetType: 2 }, coords, ".page__content");

					return airemad.getStation();
				})
				.then(stationResponse => {
					const dataGraphic = stationResponse.map(station => {
						return {
							id: station.id,
							name: station.nombre_estacion
						};
					});

					const promises = dataGraphic.map(station => {
						return airemad.getWeatherById(station.id)
							.then(weatherResponse => {
								return weatherResponse;
							});
					});

					return Promise.all(promises)
						.then(stationsWeather => ({ dataGraphic, stationsWeather }))
				})
				.then(({ dataGraphic, stationsWeather }) => {
					console.log(stationsWeather);

					const listWeather = stationsWeather.map(stationsWeatherItem => {
						let dataGraphicWeather = {
							time: [],
							temperature: [],
							temperature_max: [],
							temperature_min: [],
							humidity: []
						};

						tool.insertTagScript({ src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js", async: "async", defer: null }, function () {
							stationsWeatherItem.list.map(forecastItem => {
								dataGraphicWeather.time.push(moment(forecastItem.dt_txt).format('D/M/YY HH:mm'));
								dataGraphicWeather.temperature.push(forecastItem.main.temp);
								dataGraphicWeather.temperature_max.push(forecastItem.main.temp_max);
								dataGraphicWeather.temperature_min.push(forecastItem.main.temp_min);
								dataGraphicWeather.humidity.push(forecastItem.main.humidity);
							});
						});

						return dataGraphicWeather;
					});

					console.log(listWeather);

					listWeather.map(item => dataGraphic.map(dataGraphicStation => {
						dataGraphicStation.weather = item;
						return dataGraphicStation;
					}));

					return dataGraphic;
				})
				.then(dataGraphic => {
					loader.remove();
					graphicChart.set(dataGraphic, ".page__content");
				});

		})
		.catch(
			error => {
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
})();