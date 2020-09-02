/**
 * @file moviesCRUD.js
 * @module moviesCRUD
 * @description Movies CRUD. Create, Read, Update and Delete My favorite movies
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires moviesAPI
 * @requires firebaseTasks
 */
import * as tool from './tools.js';
import * as moviesAPI from './movies-api.js';
import * as firebaseTasks from './firebase-tasks.js';





/**
 * @function module:moviesCRUD.conectDataBase
 * @description Conect to movies data base
 * @see Used inside: {@link firebaseTasks.firebaseConexionDataBase}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function conectDataBase() {
	/**
	 * @const module:moviesCRUD~firebaseDataBaseMovies
	 * @description Firebase configuration
	 * Change this string 'XXXXXXXXXXXX' for yor data
	 * @type {Object}
	 */
	const firebaseDataBaseMovies = {
		apiKey: "XXXXXXXXXXXX",
		authDomain: "XXXXXXXXXXXX",
		databaseURL: "XXXXXXXXXXXX",
		projectId: "XXXXXXXXXXXX",
		storageBucket: "XXXXXXXXXXXX",
		messagingSenderId: "XXXXXXXXXXXX",
		appId: "XXXXXXXXXXXX"
	};

	firebaseTasks.firebaseConexionDataBase(firebaseDataBaseMovies);
}



/**
 * @function module:moviesCRUD~getMovieId
 * @description Get id movie
 * @param {Event} event
 * @returns {String}
 * @see Used inside: {@link tool.getClosest}
 * @see Used in: {@link moviesCRUD.createArrayFavorite}
 */
function getMovieId(event) {
	const movie = tool.getClosest(event.target, '.movie');
	const movieId = movie.getAttribute("id");
	const checkedMovieId = moviesAPI.searchById(movieId)
		.then((data) => {
			if (data.hasOwnProperty("Response") && data.Response !== "False") {
				return movieId;
			} else {
				console.warn("This id movie not exist on the API");
				return false;
			}
		});
	return checkedMovieId;
}



/**
 * @function module:moviesCRUD.createArrayFavorite
 * @description Create array with the data movie favorite.
 * @param {Event} event
 * @returns {Object}
 * @see Used inside: {@link moviesCRUD~getMovieId}
 * @see Used in: {@link moviesCRUD.tasksFavorites}
 */
async function createArrayFavorite(event) {
	const movieId = await getMovieId(event);
	const arrayData = { 'id': movieId };
	const response = (movieId !== false) ? arrayData : false;
	return response;
}



/**
 * @function module:moviesCRUD.createTableFavorites
 * @description Create a table for the list of favorites
 * @returns {String}
 * @see Used in: {@link moviesCRUD.insertTableFavorites}
 */
function createTableFavorites() {
	const templateTable = `
		<table id="favoriteListTable" class="favorite-list__table">
			<thead id="favoriteListTableHead" class="favorite-list__table-head">
				<tr>
					<th colspan="2">
						Mi lista de peliculas favoritas
					</th>
				</tr>
			</thead>
			<tbody id="favoriteListTableBody" class="favorite-list__table-body">
				<tr>
					<th class="favorite-list__index">
						#
					</th>
					<th class="favorite-list__id">
						ID
					</th>
				</tr>
			</tbody>
			<tfoot id="favoriteListTableFooter" class="favorite-list__foot"></tfoot>
		</table>`;

	return templateTable;
}



/**
 * @function module:moviesCRUD.insertTableFavorites
 * @description Insert the structure table
 * @see Used inside: {@link moviesCRUD.createTableFavorites}
 * @see Used in: {@link moviesCRUD.getSetFavorites}
 */
function insertTableFavorites() {
	const listFavorites = document.getElementById("favoriteList");
	const template = createTableFavorites();
	listFavorites.innerHTML = template;
}



/**
 * @function module:moviesCRUD~createTableRowFavorite
 * @description Create a template favorite
 * @param {Object} favorite
 * @returns {String}
 * @see Used in: {@link moviesCRUD.createInsertFavorite}
 */
function createTableRowFavorite(favorite) {
	const template = `
		<tr>
			<td>
				${favorite.index}
			</td>
			<td>
				${favorite.id}
			</td>
		</tr>`;
	return template;
}



/**
 * @function module:moviesCRUD~insertTableRowFavorite
 * @description Insert favorite on the table
 * @param {String} idContent
 * @param {String} templateFavorite
 * @see Used in: {@link moviesCRUD.createInsertFavorite}
 */
function insertTableRowFavorite(idContent, templateFavorite) {
	const content = document.getElementById(idContent);
	content.innerHTML += templateFavorite;
}



/**
 * @function module:moviesCRUD.createInsertFavorite
 * @description Create and insert Favorite
 * @param {Object} data Data to insert
 * @see Used inside: {@link moviesCRUD.createTableRowFavorite}, {@link moviesCRUD.insertTableRowFavorite}
 * @see Used in: {@link moviesCRUD.getSetFavorites}
 */
function createInsertFavorite(data) {
	let templateRecord = createTableRowFavorite(data);
	insertTableRowFavorite("favoriteListTableBody", templateRecord);
}



/**
 * @function module:moviesCRUD.getSetFavorites
 * @description Get and set for the list of favorites
 * @see Used inside: {@link moviesCRUD.insertTableFavorites}, {@link firebaseTasks.firebaseReadOnAdded}
 * @see Used in: {@link firebaseTasks.firebaseReadOnAdded}, {@link anominFunctionAutoEjecuted}
 */
export function getSetFavorites() {
	insertTableFavorites();
	firebaseTasks.firebaseReadOnAdded("movies/list", createInsertFavorite);
}



/**
 * @function module:moviesCRUD.showHideFavorite
 * @description Show/Hide movie favorites
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function showHideFavorite() {
	const favoriteListButton = document.getElementById("favoriteListButton");
	const searchResults = document.getElementById("searchResults");
	const favoriteList = document.getElementById("favoriteList");

	/**
	 * @event {click}
	 */
	favoriteListButton.addEventListener("click", function () {
		searchResults.classList.toggle("is-hide");
		favoriteList.classList.toggle("is-view");
	});
}



/**
 * @function module:moviesCRUD~saveFavorite
 * @description Save favorite
 * @param {Object} arrayData Data to save
 * @see Used inside: {@link firebaseTasks.firebaseCreate}
 * @see Used in: {@link moviesCRUD.tasksFavorites}
 */
function saveFavorite(arrayData) {
	firebaseTasks.firebaseCreate("movies", arrayData);
}



/**
 * @function module:moviesCRUD.tasksFavorites
 * @description Event save and remove movie favorite
 * @see Used inside: {@link moviesCRUD~saveFavorite}, {@link moviesCRUD.createArrayFavorite}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function tasksFavorites() {
	const movieFavoriteButton = document.getElementsByClassName("movie__button--favorite");

	/**
	 * @event {click}
	 */
	Array.from(movieFavoriteButton).map((button) => {
		button.addEventListener("click", async function (event) {
			let arrayData = await createArrayFavorite(event);

			if (arrayData !== false) {
				saveFavorite(arrayData);
			}
		});
	});
}