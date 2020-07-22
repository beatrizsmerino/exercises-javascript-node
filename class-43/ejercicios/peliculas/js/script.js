/**
 * @file Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



/**
 * @requires api
 * @requires loader
 * @requires gradient
 */
import * as api from './api-search.js';
import * as loader from './loader.js';
import * as gradient from './gradient.js';




gradient.add("body");

let searchInput = document.getElementById("searchInput");

document.getElementById("searchButton").addEventListener("click", function () {
	let pageGo = 1;
	loader.add();

	api.search(pageGo).then(data => {
		setTimeout(function () {
			loader.remove();
			api.printSearchResults(data, pageGo);
		}, 7000);
	});
});

searchInput.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		document.getElementById("searchButton").click();
	}
});