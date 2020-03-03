/**
 * @file Graphic canvas with the 'Chart API'
 * https://www.chartjs.org/
 * https://cdnjs.com/libraries/Chart.js
 * @module graphicChart
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';





/**
 * @function module:graphicChart.set
 * @description Set graphic of 'Chart API'
 * @param {Object} data - Data of the graphic
 * @param {String} elementDOM - Selector string of the element html
 * @see Used in:
 * - 'script.js' -> {@link functionAnonimAutoExecuted}
 */
export function set(data, elementDOM) {
	let content = document.createElement("div");
	let idContent = "chartList";
	let classContent = "chart__list";

	content.setAttribute("id", idContent);
	content.setAttribute("class", classContent);
	document.querySelector(elementDOM).appendChild(content);

	tool.insertTagScript({ src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js", async: "async", defer: null }, function () {
		createGraphic(data, `#${idContent}`);
	});
}


function createGraphic(data, elementDom) {
	function graphic(graphicId, graphicTitle, graphicLabels, graphicDataA1, graphicDataA2, graphicDataA3, graphicDataB) {
		if (!document.querySelector(`#${graphicId}`)) {
			document.querySelector(elementDom).innerHTML += `
				<div class="chart__item">
					<canvas id="${graphicId}" class="chart__canvas mixed-chart"></canvas>
				</div>
			`;

			let mixedChart = new Chart(document.getElementById(graphicId).getContext('2d'), {
				type: 'bar',
				data: {
					datasets: [
						{
							label: 'Humedity',
							data: graphicDataB,
							yAxisID: 'B',
							type: 'line',
							color: '#333333',
							backgroundColor: 'transparent',
							lineTension: 0.2,
							borderColor: '#333333'
						},
						{
							label: 'Temperature Max',
							data: graphicDataA1,
							backgroundColor: '#EA6D4A',
							yAxisID: 'A'
						}, {
							label: 'Temperature Min',
							data: graphicDataA2,
							backgroundColor: '#71DAE9',
							yAxisID: 'A'
						}, {
							label: 'Temperature Med',
							data: graphicDataA3,
							backgroundColor: '#E7F32B',
							yAxisID: 'A'
						}],
					labels: graphicLabels
				},
				options: {
					responsive: true,
					title: {
						display: true,
						text: graphicTitle
					},
					tooltips: {
						mode: 'index',
						intersert: false
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					scales: {
						yAxes: [{
							id: 'A',
							type: 'linear',
							position: 'left',
							ticks: {
								max: 100,
								min: 0
							}
						}, {
							id: 'B',
							type: 'linear',
							position: 'right',
							ticks: {
								max: 100,
								min: 0,
								callback: function (value, index, values) {
									return value + '%';
								}
							},
							gridLines: {
								display: false
							}
						}]
					}
				}
			});
			mixedChart.update();
		}
	}

	data.map(station => {
		graphic(
			station.id,
			station.name,
			station.weather.time,
			station.weather.temp_max,
			station.weather.temp_min,
			station.weather.temp_med,
			station.weather.temp_hum
		);
	});
}