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

                    /*
                    'Open weather API' -> weather forecast available for paid subscriptions.
					openweather.getDataForecast({ by: "cityName", data: "Madrid" }, 10)
						.then(response => {
							loader.remove();
							graphicChart.set(response);
						});
                    */
					loader.remove();


					airemad.getStation()
						.then(stationResponse => {
							// console.log(response);

							let dataGraphic = [];
							stationResponse.map(station => {
								dataGraphic.push({
									id: station.id,
									name: station.nombre_estacion
								});
							});
							// console.log(dataGraphic);

							dataGraphic.map(station => {
								let dataGraphicWeatherObj = [];
								let dataGraphicWeatherArr = {
									time: [],
									temp_med: [],
									temp_max: [],
									temp_min: [],
									temp_hum: []
								};

								airemad.getWeatherById(station.id)
									.then(weatherResponse => {
										// console.log(weatherResponse);

										weatherResponse.list.map(weatherItem => {
											dataGraphicWeatherObj.push({
												time: weatherItem.dt_txt,
												temp_med: weatherItem.main.temp,
												temp_max: weatherItem.main.temp_max,
												temp_min: weatherItem.main.temp_min,
												humedity: weatherItem.main.humidity
											});

											dataGraphicWeatherArr.time.push(weatherItem.dt_txt);
											dataGraphicWeatherArr.temp_med.push(weatherItem.main.temp);
											dataGraphicWeatherArr.temp_max.push(weatherItem.main.temp_max);
											dataGraphicWeatherArr.temp_min.push(weatherItem.main.temp_min);
											dataGraphicWeatherArr.temp_hum.push(weatherItem.main.humidity);
										});
									});

								station.weatherObj = dataGraphicWeatherObj;
								station.weatherArr = dataGraphicWeatherArr;
							});

							console.group("%cData graphic", "padding: 0.2rem;background-color:#ededed;color:teal;");
							console.info(dataGraphic);
							console.groupEnd();

							graphicChart.set(dataGraphic, ".page__content");
						});
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