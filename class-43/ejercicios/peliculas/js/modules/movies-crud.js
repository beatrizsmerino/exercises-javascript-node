/**
 * @file moviesCRUD.js
 * @module moviesCRUD
 * @description Movies CRUD. Create, Read, Update and Delete My favorite movies
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires moviesAPI
 * @requires firebaseTasks
 */
import * as moviesAPI from './movies-api.js';
import * as firebaseTasks from './firebase-tasks.js';





/**
 * @function module:moviesCRUD.conectDataBaseMovies
 * @description Conect to movies database
 * @see Used inside: {@link module:firebaseTasks.firebaseConnexionDataBase}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function conectDataBaseMovies() {
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

	firebaseTasks.firebaseConnexionDataBase(firebaseDataBaseMovies);
}



/**
 * @function module:moviesCRUD~getIdMovie
 * @description Get id movie
 * @param {Event} event Event to get data
 * @returns {String|Boolean}
 * @see Used inside: {@link module:moviesAPI.searchByIdMovie}
 * @see Used in: {@link module:moviesCRUD~createArrayFavorite}
 */
function getIdMovie(event) {
	const buttonMovie = event.target;
	const movieId = buttonMovie.getAttribute("data-id");
	const movieIdChecked = moviesAPI.searchByIdMovie(movieId)
		.then((data) => {
			if (data.hasOwnProperty("Response") && data.Response !== "False") {
				return movieId;
			} else {
				console.warn("This id movie not exist on the API");
				return false;
			}
		});
	return movieIdChecked;
}



/**
 * @function module:moviesCRUD~getArrayIdFavoritesSaved
 * @description Get an array of IDs of saved favorite movies
 * @param {Object} data Favorites saved on database
 * @returns {Object}
 * @see Used in: {@link module:moviesCRUD.updateButtonsFavorite}
 */
function getArrayIdFavoritesSaved(data) {
	const arrayDataId = [];
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const element = data[key];
			arrayDataId.push(element.id)
		}
	}

	return arrayDataId;
}



/**
 * @function module:moviesCRUD~createArrayFavorite
 * @description Create array with the data favorite movie.
 * @param {Event} event Event to get data
 * @returns {Object|Boolean}
 * @see Used inside: {@link module:moviesCRUD~getIdMovie}
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
async function createArrayFavorite(event) {
	const movieId = await getIdMovie(event);
	const arrayData = { 'id': movieId };
	const response = (movieId !== false) ? arrayData : false;
	return response;
}



/**
 * @function module:moviesCRUD~createTableFavorites
 * @description Create a table for the list of favorite movies
 * @returns {String}
 * @see Used in: {@link module:moviesCRUD~insertTableFavorites}
 */
function createTableFavorites() {
	const templateTable = `
		<table id="favoriteListTable" class="favorite-list__table">
			<thead id="favoriteListTableHead" class="favorite-list__table-head">
				<tr>
					<th colspan="3">
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
					<th class="favorite-list__tasks">
						<button id="buttonDeleteListFavorites" class="button-delete button"
							data-type="favorite"
							data-task="dislike"
							aria-label="Eliminar todas las películas favoritas">
							Eliminar todo
						</button>
					</th>
				</tr>
			</tbody>
			<tfoot id="favoriteListTableFooter" class="favorite-list__foot"></tfoot>
		</table>`;

	return templateTable;
}



/**
 * @function module:moviesCRUD~insertTableFavorites
 * @description Insert list of favorite movies
 * @see Used inside: {@link module:moviesCRUD~createTableFavorites}
 * @see Used in: {@link module:moviesCRUD.getSetListFavorites}
 */
function insertTableFavorites() {
	const listFavorites = document.getElementById("favoriteList");
	const template = createTableFavorites();
	listFavorites.innerHTML = template;
}



/**
 * @function module:moviesCRUD~createTableRowFavorite
 * @description Create a template for the favorite movie
 * @param {Object} favorite Data of favorite
 * @returns {String}
 * @see Used in: {@link module:moviesCRUD~addTableRowFavorite}
 */
function createTableRowFavorite(favorite) {
	const template = `
		<tr class="favorite-list__row" data-id="${favorite.id}">
			<td class="favorite__index">
				${favorite.index}
			</td>
			<td class="favorite__id">
				${favorite.id}
			</td>
			<td class="favorite__tasks">
				<button class="favorite__button button-favorite button"
						data-id="${favorite.id}"
						data-type="favorite"
						data-task="dislike"
						aria-label="Eliminar película favorita">
					<i class="favorite__icon button-favorite__icon button__icon fas fa-heart"></i>
				</button>
			</td>
		</tr>`;
	return template;
}



/**
 * @function module:moviesCRUD~insertTableRowFavorite
 * @description Insert favorite movie on the table
 * @param {String} idContent Id name of content to insert the favorite
 * @param {String} templateFavorite HTML template of the favorite
 * @see Used in: {@link module:moviesCRUD~addTableRowFavorite}
 */
function insertTableRowFavorite(idContent, templateFavorite) {
	const content = document.getElementById(idContent);
	content.innerHTML += templateFavorite;
}



/**
 * @function module:moviesCRUD~deleteTableRowFavorite
 * @description Delete favorite on the table
 * @param {Object} data Data of favorite
 * @see Used in: {@link module:moviesCRUD~removeTableRowFavorite}
 */
function deleteTableRowFavorite(data) {
	const row = document.querySelector(`.favorite-list__row[data-id=${data.id}]`);
	if (row) {
		row.parentNode.removeChild(row);
	}
}


/**
 * @function module:moviesCRUD~addTableRowFavorite
 * @description Create and insert Favorite
 * @param {Object} data Data favorite to insert
 * @see Used inside: {@link module:moviesCRUD~createTableRowFavorite}, {@link module:moviesCRUD~insertTableRowFavorite}, {@link module:moviesCRUD.tasksListFavorites}, {@link module:moviesCRUD.updateButtonsFavorite}, {@link module:moviesCRUD~updateListFavorites}
 * @see Used in: {@link module:moviesCRUD.getSetListFavorites}
 */
function addTableRowFavorite(data) {
	if (data !== null) {
		let templateRecord = createTableRowFavorite(data);
		insertTableRowFavorite("favoriteListTableBody", templateRecord);
		tasksListFavorites();
		updateButtonsFavorite();
		updateListFavorites("movies");
	}
}



/**
 * @function module:moviesCRUD~removeTableRowFavorite
 * @description Update the list of favorite movies after of remove one
 * @param {Object} data Data favorite to remove
 * @see Used inside: {@link module:moviesCRUD~deleteTableRowFavorite}, {@link module:moviesCRUD.updateButtonsFavorite}, {@link module:moviesCRUD~updateListFavorites}
 * @see Used in: {@link module:moviesCRUD.getSetListFavorites}
 */
function removeTableRowFavorite(data) {
	if (data !== null) {
		deleteTableRowFavorite(data);
		updateButtonsFavorite();
		updateListFavorites("movies");
	}
}



/**
 * @function module:moviesCRUD.getSetListFavorites
 * @description Get and set for the favorites list
 * @see Used inside:
 * {@link module:firebaseTasks.firebaseReadOnAdded},
 * {@link module:moviesCRUD~insertTableFavorites},
 * @see Used in:
 * {@link module:moviesCRUD.tasksListFavorites},
 * {@link anominFunctionAutoEjecuted}
 */
export function getSetListFavorites() {
	insertTableFavorites();
	firebaseTasks.firebaseReadOnAdded("movies/list", addTableRowFavorite);
	firebaseTasks.firebaseReadOnRemoved("movies/list", removeTableRowFavorite);
}



/**
 * @function module:moviesCRUD.showHideListFavorites
 * @description Show/Hide favorite movies
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function showHideListFavorites() {
	const buttonListFavorites = document.getElementById("buttonListFavorites");
	const searchResults = document.getElementById("searchResults");
	const favoriteList = document.getElementById("favoriteList");

	/**
	 * @event {click}
	 * @description When you click on the button of the list favorites:
	 * - Show/Hide the search results
	 * - Show/Hide the favorite list
	 */
	buttonListFavorites.addEventListener("click", function () {
		searchResults.classList.toggle("is-hide");
		favoriteList.classList.toggle("is-view");
	});
}



/**
 * @function module:moviesCRUD.hideListFavorites
 * @description Hide list favorite movies
 * @see Used in: {@link module:moviesAPI.setEventsSearchMovies}
 */
export function hideListFavorites() {
	const searchResults = document.getElementById("searchResults");
	const favoriteList = document.getElementById("favoriteList");

	searchResults.classList.remove("is-hide");
	favoriteList.classList.remove("is-view");
}



/**
 * @function module:moviesCRUD~updateListFavorites
 * @description Hide the list of favorite movies if there is not favorites
 * @param {String} table Table name to get the data
 * @see Used inside: {@link module:moviesCRUD~hideListFavorites}
 * @see Used in: {@link module:moviesCRUD~addTableRowFavorite}, {@link module:moviesCRUD~removeTableRowFavorite}
 */
async function updateListFavorites(table) {
	const emptyData = await firebaseTasks.firebaseCheckEmpty(table, 'list');
	const buttonListFavorites = document.getElementById("buttonListFavorites");

	if (emptyData) {
		buttonListFavorites.classList.add('is-hide');
		hideListFavorites();
	} else {
		buttonListFavorites.classList.remove('is-hide');
	}
}



/**
 * @function module:moviesCRUD.updateButtonsFavorite
 * @description Show/Hide buttons like/dislike
 * @see Used inside: {@link module:firebaseTasks.firebaseReadOnValue}
 * @see Used in:
 * {@link module:moviesAPI.setEventsSearchMovies},
 * {@link module:moviesCRUD.tasksFavorite}, {@link module:moviesCRUD~addTableRowFavorite}, {@link module:moviesCRUD~removeTableRowFavorite}
 */
export async function updateButtonsFavorite() {
	const arrayIdFavorites = await firebaseTasks.firebaseReadOnValue("movies/list", getArrayIdFavoritesSaved);
	const buttonsLike = document.querySelectorAll(".movie__button[data-task='like']");
	const buttonsDislike = document.querySelectorAll(".movie__button[data-task='dislike']");

	const buttonsLikeId = [];
	[...buttonsLike].map((button) => {
		return arrayIdFavorites.map((id) => {
			if (button.getAttribute("data-id") === id) {
				buttonsLikeId.push(button);
			}
		});
	});

	const buttonsDislikeId = [];
	[...buttonsDislike].map((button) => {
		return arrayIdFavorites.map((id) => {
			if (button.getAttribute("data-id") === id) {
				buttonsDislikeId.push(button);
			}
		});
	});

	[...buttonsLike].map((button) => button.classList.remove('is-hide'));
	[...buttonsDislike].map((button) => button.classList.add('is-hide'));
	[...buttonsLikeId].map((button) => button.classList.add('is-hide'));
	[...buttonsDislikeId].map((button) => button.classList.remove('is-hide'));
}



/**
 * @function module:moviesCRUD~saveFavorite
 * @description Save favorite
 * @param {Event} Event Data to save
 * @see Used inside:
 * {@link module:firebaseTasks.firebaseCreate}
 * {@link module:moviesCRUD~createArrayFavorite}
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
async function saveFavorite(event) {
	const arrayData = await createArrayFavorite(event);
	if (arrayData !== false) {
		await firebaseTasks.firebaseCreate("movies", arrayData);
	}
}



/**
 * @function module:moviesCRUD~deleteListFavorites
 * @description Delete favorites list
 * @see Used inside: {@link module:firebaseTasks.firebaseDeleteAll}
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
async function deleteListFavorites() {
	await firebaseTasks.firebaseDeleteAll("movies");
}



/**
 * @function module:moviesCRUD~deleteFavorite
 * @description Delete favorite
 * @param {Event} event Event to get data
 * @see Used inside:
 * {@link module:firebaseTasks.firebaseDelete}
 * {@link module:moviesCRUD~getIdMovie}
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
async function deleteFavorite(event) {
	const movieId = await getIdMovie(event);

	if (movieId !== false) {
		await firebaseTasks.firebaseDelete("movies", movieId);
	}
}



/**
 * @function module:moviesCRUD.tasksFavorite
 * @description Events to save and remove favorite movie
 * @see Used inside: {@link module:moviesCRUD~saveFavorite}, {@link module:moviesCRUD~deleteFavorite}
 * @see Used in: {@link module:moviesAPI.setEventsSearchMovies}
 */
export function tasksFavorite() {
	const buttonsMovie = document.querySelectorAll(".movie__button");

	/**
	 * @event {click}
	 * @description When you click on the button movie:
	 * - Know the type of each button task: like/dislike/info
	 * 	- Button like: save the favorite
	 * 	- Button dislike: remove the favorite
	 * 	- Button info: {@link module:moviesAPI~showHideInfoMovie} (the task belongs to the moviesAPI module, as it does not need to access the database to perform the action as moviesCRUD module)
	 */
	Array.from(buttonsMovie).map((button) => {
		button.addEventListener("click", async function (event) {
			if (button.getAttribute("data-type") === "favorite") {
				if (button.getAttribute("data-task") === "like") {
					saveFavorite(event);
				} else if (button.getAttribute("data-task") === "dislike") {
					deleteFavorite(event);
				}
			} else if (button.getAttribute("data-type") === "info") {

			}
		});
	});
}



/**
 * @function module:moviesCRUD.tasksListFavorites
 * @description Event save and remove favorite movies
 * @see Used inside:
 * {@link module:moviesCRUD.getSetListFavorites}, {@link module:moviesCRUD~deleteListFavorites}, {@link module:moviesCRUD~deleteFavorite}
 * @see Used in: {@link module:moviesCRUD~addTableRowFavorite}
 */
export function tasksListFavorites() {
	const buttonListFavorites = document.getElementById('buttonListFavorites');
	const buttonDeleteListFavorites = document.getElementById('buttonDeleteListFavorites');
	const buttonsFavorite = document.querySelectorAll(".favorite__button");


	/**
	 * @event {click}
	 * @description When you click on the button of the list favorites:
	 * - Get and set data of the list favorites saved
	 */
	buttonListFavorites.addEventListener('click', function () {
		getSetListFavorites();
	});


	/**
	 * @event {click}
	 * @description When you click on the button delete list favorites:
	 * - Remove all favorites saved
	 * - Get and set data of the list favorites empty
	 */
	buttonDeleteListFavorites.addEventListener('click', function () {
		deleteListFavorites();
		getSetListFavorites();
	});


	/**
	 * @event {click}
	 * @description When you click on the buttons of favorite list:
	 * - Know the type of each button task: like/dislike/info
	 * 	- Button like: (does not exist)
	 * 	- Button dislike: remove the favorite
	 * 	- Button info: (does not exist)
	 */
	Array.from(buttonsFavorite).map((button) => {
		button.addEventListener("click", async function (event) {
			if (button.getAttribute("data-type") === "favorite") {
				if (button.getAttribute("data-task") === "dislike") {
					deleteFavorite(event);
				} else if (button.getAttribute("data-task") === "like") {

				}
			} else if (button.getAttribute("data-type") === "info") {

			}
		});
	});
}