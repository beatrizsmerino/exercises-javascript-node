/**
 * @file movies-api.js
 * @module moviesAPI
 * @description Get and search data movies, and print the interface
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 * @requires loader
 * @requires moviesCRUD
 */
import * as tool from './tools.js';
import * as loader from './loader.js';
import * as moviesCRUD from './movies-crud.js';





/**
 * @const module:moviesAPI~apiUrl
 * @description URL of OMBb API.
 * @type {String}
 */
const apiUrl = "http://www.omdbapi.com";



/**
 * @const module:moviesAPI~apiKey
 * @description KEY of OMBb API.
 * - Connexion OMBb API (The Open Movie Database)
 * 	- Create the API KEY {@link http://www.omdbapi.com/apikey.aspx}
 * 	- Find the API KEY in the email used
 * 	- Change this string 'XXXXXXXXXXXX' for yor data
 * @type {String}
 */
const apiKey = "XXXXXXXXXXXX";



/**
 * @function module:moviesAPI~saveSearchTextMovie
 * @description Save search text into input hidden and find by the text #searchInput or #searchInputHidden.
 * @returns {String}
 * @see Used in: {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies}
 */
function saveSearchTextMovie() {
	const searchInput = document.getElementById("searchInput");
	const searchInputHidden = document.getElementById("searchInputHidden");
	let searchInputValue = searchInput.value;
	let searchInputHiddenValue = searchInputHidden.value;

	// Remove the whitespace from both sides of the string
	searchInputValue.trim();

	// Replace the whitespace from the middle of the string by +
	searchInputValue.replace(/\s/g, "+");

	// Search by the text #searchInput or #searchInputHidden
	let searchText = "";
	if (searchInputValue !== "" && searchInputHiddenValue === "" || searchInputValue !== "" && searchInputHiddenValue !== "") {
		// Get text to the search input and set his value to the input hidden
		searchInputHidden.setAttribute("value", searchInputValue);
		searchText = searchInputValue;
	} else if (searchInputValue === "" && searchInputHiddenValue !== "") {
		searchText = searchInputHiddenValue;
	}

	return searchText;
}



/**
 * @function module:moviesAPI.searchByTextMovie
 * @description Get the movies according to the text of the input and the pagination to search
 * @param {Number} pagination Search page number
 * @returns {Object|String}
 * @see Used inside: {@link module:moviesAPI~saveSearchTextMovie}
 * @see Used in: {@link module:moviesAPI~setSearchPaginationMovies}, {@link module:moviesAPI.setEventsSearchMovies}
 */
export async function searchByTextMovie(pagination) {

	// Search by the input hidden value or input value
	const searchInput = document.getElementById("searchInput");
	const searchInputValue = searchInput.value;
	const searchInputHiddenValue = saveSearchTextMovie();

	let valueSearch;
	if (searchInputHiddenValue !== "") {
		valueSearch = searchInputHiddenValue;
	} else {
		valueSearch = searchInputValue;
	}


	try {
		const url = `${apiUrl}/?type=movie&s=${valueSearch}&page=${pagination}&apikey=${apiKey}`;

		const find = await fetch(url);
		const json = await find.json();

		return json;

	} catch (error) {
		throw new Error("Error:", error);
	}
}



/**
 * @function module:moviesAPI.searchByIdMovie
 * @description Check if exist movie by id
 * @param {String} id Id name
 * @returns {Object|String}
 * @see Used in: {@link module:moviesCRUD~getIdMovie}
 */
export async function searchByIdMovie(id) {
	try {
		const url = `${apiUrl}/?type=movie&i=${id}&apikey=${apiKey}`;

		const find = await fetch(url);
		const json = await find.json();
		return json;

	} catch (error) {
		throw new Error("Error:", error);
	}
}



/**
 * @function module:moviesAPI~emptySearchInputMovie
 * @description Clean search input
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function emptySearchInputMovie() {
	const searchInput = document.getElementById("searchInput");
	searchInput.value = "";
}



/**
 * @function module:moviesAPI~emptySearchResultsMovies
 * @description Clean search results
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function emptySearchResultsMovies() {
	const searchResults = document.getElementById("searchResults");
	searchResults.innerHTML = "";
}



/**
 * @function module:moviesAPI.setEventsSearchMovies
 * @description Events for execute the search movies (input, button and pagination of the search)
 * @see Used inside:
 * {@link module:loader.add}, {@link module:loader.remove},
 * {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies},
 * {@link module:moviesCRUD.updateButtonsFavorite}, {@link module:moviesCRUD.tasksFavorite}, {@link module:moviesCRUD.hideListFavorites}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function setEventsSearchMovies() {
	const searchInput = document.getElementById("searchInput");
	const searchButton = document.getElementById("searchButton");
	const buttonsPagination = document.getElementsByClassName("pagination-button");


	/**
	 * @event {click}
	 * @description When you click on the search button:
	 * - Search the movie by the entered text
	 * - Show an animation while the animation is loading
	 * (loading time is not real, it is forced to 7 seconds to show animation longer)
	 * - Show search results
	 * - Update button state based on saved movies I liked or didn't like
	 * - Adds save and delete tasks for searched movie buttons
	 * - Force hide the favorites list if it is open
	 */
	searchButton.addEventListener("click", function (event) {
		event.preventDefault();

		let paginationGo = 1;
		loader.add();

		searchByTextMovie(paginationGo)
			.then((data) => {
				setTimeout(function () {
					loader.remove();
					setSearchResultsMovies(data, paginationGo);
					moviesCRUD.updateButtonsFavorite();
					moviesCRUD.tasksFavorite();
					moviesCRUD.hideListFavorites();
				}, 7000);
			});
	});


	/**
	 * @event {keyup}
	 * @description When you press enter key:
	 * - Trigger the event click executed on search button
	 */
	searchInput.addEventListener("keyup", function (event) {
		if (event.keyCode === 13) {
			searchButton.click();
		}
	});


	/**
	 * @event {click}
	 * @description When you click on the page button:
	 * - Update button state based on saved movies I liked or didn't like
	 * - Adds save and delete tasks for searched movie buttons
	 */
	checkLoadSearchResultsMovies(function () {
		Array.from(buttonsPagination).map(button => {
			button.addEventListener("click", function () {
				checkLoadSearchResultsMovies(function () {
					moviesCRUD.updateButtonsFavorite();
					moviesCRUD.tasksFavorite();
				});
			});
		});
	});
}



/**
 * @function module:moviesAPI.checkLoadSearchResultsMovies
 * @description Check if search results it is empty
 * @param {String} callbackFunction Name of callback function
 * @see Used in: {@link module:moviesCRUD.tasksFavorite}
 */
export function checkLoadSearchResultsMovies(callbackFunction) {
	const searchResults = document.getElementById("searchResults");

	let timerSearch = setInterval(function () {
		if (searchResults.innerHTML !== "") {
			clearInterval(timerSearch);
			callbackFunction();
		}
	}, 100);
}



/**
 * @function module:moviesAPI~getSearchInfoMovies
 * @description Create and return the information about the data found
 * @param {Object} data Search results info
 * @returns {Object}
 * @see Used inside: {@link module:tool.stringToNode}
 * @see Used in: {@link module:moviesAPI~setListMovies}
 */
function getSearchInfoMovies(data) {
	let searchInfo = document.createElement("div");
	searchInfo.classList.add("search-info");

	let searchInfoTitleElem = document.createElement("h3");
	let searchInfoTitleText = document.createTextNode("Resultados encontados:");
	searchInfoTitleElem.appendChild(searchInfoTitleText);
	searchInfo.appendChild(searchInfoTitleElem);

	// Search info. Results found with text:
	const searchInputHidden = document.getElementById("searchInputHidden");
	let searchInputHiddenValue = searchInputHidden.value;
	let textSearch = `<p class="search-info__text">Con el texto: <em>${searchInputHiddenValue}</em></p>`;
	let textSearchNode = tool.stringToNode(textSearch);
	searchInfo.appendChild(textSearchNode);

	// Search info. Total results found:
	let totalSearch = `<p class="search-info__total">Total: <em>${data.totalResults}</em></p>`;
	let totalSearchNode = tool.stringToNode(totalSearch);
	searchInfo.appendChild(totalSearchNode);

	return searchInfo;
}



/**
 * @function module:moviesAPI~getListMovies
 * @description Create and return the list of movies
 * @param {Object} data Search results data
 * @returns {Object}
 * @see Used inside {@link module:tool.stringToNode}
 * @see Use in: {@link module:moviesAPI~setListMovies}
 */
function getListMovies(data) {
	const list = document.createElement("ul");
	list.setAttribute("id", "listMovies");
	list.setAttribute("class", "list-movies");

	const items = data.Search.map(search => {
		let item = `
			<li id="${search.imdbID}" class="movie">
				<div class="movie__content">
					<div class="movie__list-buttons list-buttons">
						<div class="movie__list-buttons--favorite">
							<button class="movie__button button-favorite button button--icon"
									data-id="${search.imdbID}"
									data-type="favorite"
									data-task="like"
									aria-label="Guardar película favorita">
								<i class="movie__icon button-favorite__icon button__icon far fa-heart animate__animated animate__bounceIn"></i>
							</button>

							<button class="movie__button button-favorite button button--icon is-hide"
									data-id="${search.imdbID}"
									data-type="favorite"
									data-task="dislike"
									aria-label="Eliminar película favorita">
								<i class="movie__icon button-favorite__icon button__icon fas fa-heart animate__animated animate__bounceIn"></i>
							</button>
						</div>

						<button class="movie__button button-info button button--icon"
								data-id="${search.imdbID}"
								data-type="info"
								aria-label="Ver información de la película">
							<i class="movie__icon button-info__icon button__icon far fa-info"></i>
						</button>
					</div>

					<div class="movie__image">
						<img src="${(search.Poster === "N/A") ? "images/movie-image-not-found.png" : search.Poster}" alt="${search.Title}">
					</div>
					
					<div class="movie__body">
						<h3 class="movie__title">
							${search.Title}
							<span class="movie__year">
								(${search.Year})
							</span>
						</h3>
					</div>
				</div>
			</li>
			`;
		let itemNode = tool.stringToNode(item);

		return itemNode;
	});

	items.map(item => {
		list.appendChild(item);
	});

	return list;
}



/**
 * @function module:moviesAPI~setListMovies
 * @description Print Search info and results
 * @param {Object} content Content to insert the data
 * @param {Object} data Search results data
 * @see Used inside: {@link module:moviesAPI~getSearchInfoMovies}, {@link module:moviesAPI~getListMovies}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function setListMovies(content, data) {
	// Search info
	let searchInfo = getSearchInfoMovies(data);
	content.appendChild(searchInfo);

	// List results
	let searchResults = getListMovies(data);
	content.appendChild(searchResults);
}



/**
 * @function module:moviesAPI~setSwiperMovies
 * @description Add structure swiper to the results search
 * @see Used inside: {@link module:tool.wrap}, {@link module:tool.stringToNode}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function setSwiperMovies() {

	function addStructure() {
		const listDom = document.getElementById("listMovies");
		const itemsDom = listDom.children;

		// Add swiper-wrapper
		listDom.classList.add("class", "swiper-wrapper");


		// Add swiper-slide
		Array.from(itemsDom).map(item => item.classList.add("swiper-slide"));

		// Add swiper-container
		const swiperContainer = tool.wrap(listDom, null, null, "swiper-container");


		// Add swiper
		const swiper = tool.wrap(swiperContainer, null, "moviesSwiper", "swiper");
		const swiperDom = document.getElementById("moviesSwiper");


		// Add swiper-button
		const templateSwiperButton = `
			<div id="moviesSwiperButtonPrev" class="swiper-button-prev"></div>
			<div id="moviesSwiperButtonNext" class="swiper-button-next"></div>
		`;
		const templateSwiperButtonNode = tool.stringToNode(templateSwiperButton);
		swiperDom.appendChild(templateSwiperButtonNode);
	}

	function create() {
		var mySwiper = new Swiper("#moviesSwiper .swiper-container", {
			slidesPerView: 1,
			spaceBetween: 10,
			threshold: 50,

			// Navigation arrows
			navigation: {
				prevEl: '#moviesSwiperButtonPrev',
				nextEl: '#moviesSwiperButtonNext',
			},

			// Breakpoints
			breakpoints: {
				500: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 2,
				},
				700: {
					slidesPerView: 3,
				},
				900: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				},
				1400: {
					slidesPerView: 6,
				},
			}
		})
	}

	addStructure();
	create();
}



/**
 * @function module:moviesAPI~setSearchPaginationMovies
 * @description Create and print pagination of results from 10 to 10
 * @param {Object} content Content to insert the pagination
 * @param {Object} data Data for get the data pagination
 * @param {Number} pagination Page to go
 * @see Used inside:
 * {@link module:tool.stringToNode},
 * {@link module:moviesAPI.searchByTextMovie}, {@link module:moviesAPI.setSearchResultsMovies}
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function setSearchPaginationMovies(content, data, pagination) {

	// Max number of results into pagination
	let formTo = 10;
	let paginationMax = Math.round(data.totalResults / formTo);
	if (paginationMax < 1) {
		paginationMax = 1
	}


	// Indicate the displayed results
	let paginationNow = `1 - ${formTo}`;
	if (data.totalResults < formTo) {
		paginationNow = `1 - ${data.totalResults}`;
	} else if ((Math.round(data.totalResults / formTo)) === pagination) {
		paginationNow = `${(pagination * formTo) - formTo + 1} - ${data.totalResults}`;
	} else {
		paginationNow = `${(pagination * formTo) - formTo + 1} - ${pagination * formTo}`;
	}


	// Create and print pagination
	const paginationTemplate = `
		<nav id="moviesPagination" class="pagination__wrapper noselect" aria-label="Pagination">
			<ul class="pagination">
				<li class="pagination-item">
					<button id="paginationButtonPrev" class="pagination-button pagination-button--prev" data-pagination="${pagination - 1}">
						<i class="pagination-button__icon fa fa-chevron-left"></i>
					</button>
				</li>
				<li class="pagination-item">
					<button id="paginationButtonNow" class="pagination-button pagination-button--now" data-pagination="${pagination}">${paginationNow}</button>
				</li>
				<li class="pagination-item">
					<button id="paginationButtonNext" class="pagination-button pagination-button--next" data-pagination="${pagination + 1}">
						<i class="pagination-button__icon fa fa-chevron-right"></i>
					</button>
				</li>
			</ul>
		</nav>
		`;
	let paginationTemplateNode = tool.stringToNode(paginationTemplate);
	content.appendChild(paginationTemplateNode);


	// Add event got to the page... and disabled/ability buttons
	let paginationButtons = document.getElementsByClassName("pagination-button");
	Array.from(paginationButtons).map(button => {
		if (
			button.getAttribute("id") !== "paginationButtonNow" &&
			parseInt(button.getAttribute("data-pagination")) === 0 ||
			parseInt(button.getAttribute("data-pagination")) >= paginationMax + 1
		) {
			button.setAttribute("disabled", "disabled");
		} else {
			button.removeAttribute("disabled");
		}

		/**
		 * @event {click}
		 * @description When you click on the button pagination search:
		 * - Search by text the movie and go to the prev/next page
		 * - Set search results of the movies
		 */
		button.addEventListener("click", function () {
			let paginationGo = parseInt(this.getAttribute("data-pagination"));

			if (paginationGo >= 1 && paginationGo < data.totalResults) {
				searchByTextMovie(paginationGo).then(data => {
					setSearchResultsMovies(data, paginationGo);
				});
			}
		});
	});
}



/**
 * @function module:moviesAPI~showHideInfoMovie
 * @description Show/Hide info Movie
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function showHideInfoMovie() {
	const movieInfoButton = document.querySelectorAll(".movie__button[data-type='info']");

	/**
	 * @event {click}
	 * @description When you click on the button movie info:
	 * - Show/Hide the info movie
	 * - Hide the info movie after 10 seconds
	 */
	Array.from(movieInfoButton).map((button) => {
		button.addEventListener("click", function (event) {
			var movie = tool.getClosest(event.target, '.movie');
			movie.classList.toggle("is-view");

			setTimeout(function () {
				movie.classList.remove("is-view");
			}, 10000);
		});
	});
}



/**
 * @function module:moviesAPI~getSetPageErrorMovies
 * @description Create and print message error
 * @param {Object} content Content to insert the info error
 * @param {String} textError Text error of API
 * @see Used in: {@link module:moviesAPI.setSearchResultsMovies}
 */
function getSetPageErrorMovies(content, textError) {
	let messageError;
	switch (textError) {
		case "Movie not found!":
			messageError = "Película no encontrada!"
			break;
		case "Too many results.", "Incorrect IMDb ID.":
			messageError = "Introduce al menos 3 caracteres para realizar la búsqueda."
			break;
		default:
			break;
	}

	(typeof messageError === "undefined") ? messageError = textError : messageError;

	const template = `
			<div class="search-error">
				<h3 class="search-error__title">
					Error de búsqueda
				</h3>
				<h4 class="search-error__subtitle">
					${messageError}
				</h4>
				<img class="search-error__image" src="images/search-error.svg">
			</div>
		`;

	content.innerHTML = template;
}



/**
 * @function module:moviesAPI.setSearchResultsMovies
 * @description Clean and print results in the interface
 * @param {Object} data Search results data
 * @param {Number} pagination Page to go
 * @see Used inside: {@link module:moviesAPI~saveSearchTextMovie}, {@link module:moviesAPI~emptySearchInputMovie}, {@link module:moviesAPI~emptySearchResultsMovies}, {@link module:moviesAPI~setListMovies}, {@link module:moviesAPI~setSwiperMovies}, {@link module:moviesAPI~setSearchPaginationMovies}, {@link module:moviesAPI~showHideInfoMovie}, {@link module:moviesAPI~getSetPageErrorMovies}
 * @see Used in: {@link module:moviesAPI.setEventsSearchMovies}
 */
export function setSearchResultsMovies(data, pagination) {
	const content = document.getElementById("searchResults");

	if (data.Response === "True") {
		saveSearchTextMovie();

		emptySearchInputMovie();
		emptySearchResultsMovies();

		setListMovies(content, data);
		setSwiperMovies();
		setSearchPaginationMovies(content, data, pagination);
		showHideInfoMovie();
	} else {
		getSetPageErrorMovies(content, data.Error);
	}
}