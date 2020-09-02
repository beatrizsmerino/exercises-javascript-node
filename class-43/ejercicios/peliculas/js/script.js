/**
 * @file script.js
 * @description Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires gradient
 * @requires loader
 * @requires moviesAPI
 * @requires moviesCRUD
 */
import * as gradient from './modules/gradient.js';
import * as loader from './modules/loader.js';
import * as moviesAPI from './modules/movies-api.js';
import * as moviesCRUD from './modules/movies-crud.js';





/**
 * @function anominFunctionAutoEjecuted
 * @see Used inside: 
 * gradient: {@link gradient.add},
 * loader: {@link loader.add}, {@link loader.remove},
 * moviesAPI: {@link moviesAPI.search}, {@link moviesAPI.printSearchResults}, {@link moviesAPI.checkEmptySearchResults}, {@link moviesAPI.checkPaginationSearchResults},
 * moviesCRUD: {@link moviesCRUD.tasksFavorites}, {@link moviesCRUD.getSetFavorites}, {@link moviesCRUD.showHideFavorite}
 */
(function () {
	const searchInput = document.getElementById("searchInput");
	const searchButton = document.getElementById("searchButton");
	const paginationButtons = document.getElementsByClassName("pagination-button");

	gradient.add("body");
	moviesCRUD.conectDataBase();

	/**
	* @event {click}
	*/
	searchButton.addEventListener("click", function (event) {
		event.preventDefault();

		let paginationGo = 1;
		loader.add();

		moviesAPI.searchByText(paginationGo).then(data => {
			setTimeout(function () {
				loader.remove();
				moviesAPI.printSearchResults(data, paginationGo);
			}, 7000);
		});
	});


	/**
	* @event {keyup}
	*/
	searchInput.addEventListener("keyup", function (event) {
		if (event.keyCode === 13) {
			searchButton.click();
		}
	});



	moviesAPI.checkEmptySearchResults(function () {
		moviesCRUD.tasksFavorites();
	});

	moviesAPI.checkPaginationSearchResults(function () {
		Array.from(paginationButtons).map(button => {
			/**
			 * @event {click}
			 */
			button.addEventListener("click", function () {
				moviesCRUD.tasksFavorites();
			});
		});
	});

	moviesCRUD.getSetFavorites();
	moviesCRUD.showHideFavorite();
})();