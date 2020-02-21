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
	if (tool.insertTagScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js")) {
		let content = document.createElement("div");
		let idContent = "chartjsGraphics";
		let classContent = "chartjs-graphics";

		content.setAttribute("id", idContent);
		content.setAttribute("class", classContent);
		document.querySelector(elementDOM).appendChild(content);

		createGraphic(data, `#${idContent}`);
	}
}


function createGraphic(data, elementDom) {

	function graphic(id, title, labels, a1, a2, a3, b) {
		console.log(id, title, labels, a1, a2, a3, b);

		if (!document.querySelector(`#${id}`)) {
			document.querySelector(elementDom).innerHTML += `<canvas id="${id}" class="mixed-chart"></canvas>`;
		}

		let mixedChart = new Chart(document.querySelector(`#${id}`), {
			type: 'bar',
			data: {
				datasets: [
					{
						label: 'Humedity',
						data: b,
						yAxisID: 'B',
						type: 'line',
						color: '#333333',
						backgroundColor: 'transparent',
						lineTension: 0.2,
						borderColor: '#333333'
					},
					{
						label: 'Temperature Max',
						data: a1,
						backgroundColor: '#EA6D4A',
						yAxisID: 'A'
					}, {
						label: 'Temperature Min',
						data: a2,
						backgroundColor: '#71DAE9',
						yAxisID: 'A'
					}, {
						label: 'Temperature Med',
						data: a3,
						backgroundColor: '#E7F32B',
						yAxisID: 'A'
					}],
				labels: labels
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: title
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
		console.log(mixedChart);
	}

	for (let index = 0; index < data.length; index++) {
		let station = data[index];
		let graphicId = station.id;
		let graphicTitle = station.name;
		let graphicLabels = station.weatherArr.time;
		let graphicDataA1 = station.weatherArr.temp_max;
		let graphicDataA2 = station.weatherArr.temp_min;
		let graphicDataA3 = station.weatherArr.temp_med;
		let graphicDataB = station.weatherArr.temp_hum;

		graphic(
			graphicId,
			graphicTitle,
			graphicLabels,
			graphicDataA1,
			graphicDataA2,
			graphicDataA3,
			graphicDataB
		);
	}
}