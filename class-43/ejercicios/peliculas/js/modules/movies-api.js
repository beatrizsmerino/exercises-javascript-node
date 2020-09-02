/**
 * @file movies-api.js
 * @module moviesAPI
 * @description Get and search data movies, and print the interface
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';







/**
 * @const module:moviesAPI~apiUrl
 * @description URL of OMBb API.
 * @type {String}
 */
const apiUrl = "http://www.omdbapi.com";



/**
 * @const module:moviesAPI~apiKey
 * @description KEY of OMBb API.
 * Conexion api omdapi (The Open Movie Database)
 * Create the API KEY http://www.omdbapi.com/apikey.aspx
 * Find the API KEY in the email used
 * Change this string 'XXXXXXXXXXXX' for yor data
 * @type {String}
 */
const apiKey = "XXXXXXXXXXXX";



/**
 * @function module:moviesAPI~saveSearchText
 * @description Save search text into input hidden and find by the text #searchInput or #searchInputHidden.
 * @returns {String}
 * @see Used in: {@link moviesAPI.search}, {@link moviesAPI.printSearchResults}
 */
function saveSearchText() {
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
 * @function module:moviesAPI.search
 * @description Get the movies according to the text of the input and the pagination to search
 * @param {Number} pagination
 * @returns {Object|String}
 * @see Used inside: {@link moviesAPI~saveSearchText}
 * @see Used in: {@link moviesAPI~setMoviesSearchPagination}, {@link anominFunctionAutoEjecuted}
 */
export async function searchByText(pagination) {

	// Search by the input hidden value or input value
	const searchInput = document.getElementById("searchInput");
	const searchInputValue = searchInput.value;
	const searchInputHiddenValue = saveSearchText();

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
		throw new Error(`Error: ${error}`);
	}
}



/**
 * @function module:moviesAPI.searchById
 * @description Check if exist movie by id
 * @param {String} id
 * @returns {Object|String}
 * @see Used in: {@link moviesCRUD~getMovieId}
 */
export async function searchById(id) {
	try {
		const url = `${apiUrl}/?type=movie&i=${id}&apikey=${apiKey}`;

		const find = await fetch(url);
		const json = await find.json();
		return json;

	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
}



/**
 * @function module:moviesAPI~emptySearchInput
 * @description Clean search input
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function emptySearchInput() {
	const searchInput = document.getElementById("searchInput");
	searchInput.value = "";
}



/**
 * @function module:moviesAPI~emptySearchResults
 * @description Clean search results
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function emptySearchResults() {
	const searchResults = document.getElementById("searchResults");
	searchResults.innerHTML = "";
}



/**
 * @function module:moviesAPI.checkEmptySearchResults
 * @description Check if search results it is empty
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function checkEmptySearchResults(callbackSearch) {
	const searchResults = document.getElementById("searchResults");

	let timerSearch = setInterval(function () {
		if (searchResults.innerHTML !== "") {
			clearInterval(timerSearch);
			callbackSearch();
		}
	}, 100);
}



/**
 * @function module:moviesAPI~getSearchInfo
 * @description Create search info and return it
 * @param {Object} data
 * @returns {Element}
 * @see Used inside: {@link tool.stringToNode}
 * @see Used in: {@link moviesAPI~setMoviesList}
 */
function getSearchInfo(data) {
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
 * @function module:moviesAPI~getMoviesList
 * @description Create the list of movies
 * @param {Object} data
 * @returns {Object}
 * @see Used inside {@link tool.stringToNode}
 * @see Use in: {@link moviesAPI~setMoviesList}
 */
function getMoviesList(data) {
	const list = document.createElement("ul");
	list.setAttribute("id", "listMovies");
	list.setAttribute("class", "list-movies");

	const items = data.Search.map(search => {
		let item = `
			<li id="${search.imdbID}" class="movie">
				<div class="movie__content">
					<div class="movie__list-buttons list-buttons">
						<button class="movie__button--favorite movie__button button-favorite button" aria-label="Guardar película favorita">
							<i class="movie__icon button-favorite__icon button__icon far fa-heart"></i>
						</button>

						<button class="movie__button--info movie__button button-info button" aria-label="Ver información de la película">
							<i class="movie__icon button-info__icon far button__icon fa-info"></i>
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
 * @function module:moviesAPI~setMoviesList
 * @description Print Search info and results
 * @param {Object} content 
 * @param {Object} data
 * @see Used inside: {@link moviesAPI~getSearchInfo}, {@link moviesAPI~getMoviesList}
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function setMoviesList(content, data) {
	// Search info
	let searchInfo = getSearchInfo(data);
	content.appendChild(searchInfo);

	// List results
	let searchResults = getMoviesList(data);
	content.appendChild(searchResults);
}



/**
 * @function module:moviesAPI~setMoviesSwiper
 * @description Add structure swiper to the results search
 * @see Used inside: {@link tool.wrap}, {@link tool.stringToNode}
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function setMoviesSwiper() {

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
 * @function module:moviesAPI~setMoviesSearchPagination
 * @description Create and print pagination of results from 10 to 10
 * @param {Object} content 
 * @param {Object} data 
 * @param {Number} pagination
 * @see Used inside: {@link tool.stringToNode}, {@link moviesAPI~search}, {@link moviesAPI.printSearchResults}
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function setMoviesSearchPagination(content, data, pagination) {

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
		 */
		button.addEventListener("click", function () {
			let paginationGo = parseInt(this.getAttribute("data-pagination"));

			if (paginationGo >= 1 && paginationGo < data.totalResults) {
				searchByText(paginationGo).then(data => {
					printSearchResults(data, paginationGo);
				});
			}
		});
	});
}



/**
 * @function module:moviesAPI.checkPaginationSearchResults
 * @description Check if pagination search results exist
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function checkPaginationSearchResults(callback) {
	const pagination = document.getElementById("moviesPagination");

	let timerSearch = setInterval(function () {
		if (pagination) {
			clearInterval(timerSearch);
			callback();
		}
	}, 100);
}



/**
 * @function module:moviesAPI~showHideInfoMovie
 * @description Show/Hide info Movie
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function showHideInfoMovie() {
	const movieInfoButton = document.getElementsByClassName("movie__button--info");

	Array.from(movieInfoButton).map((button) => {
		/**
		 * @event {click}
		 */
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
 * @function module:moviesAPI~printError
 * @description Create and print message error
 * @param {Object} content 
 * @param {String} textError
 * @see Used in: {@link moviesAPI.printSearchResults}
 */
function printError(content, textError) {
	const template = `
			<div class="search-error">
				<h3 class="search-error__title">
					Error search
				</h3>
				<h4 class="search-error__subtitle">
					${textError}
				</h4>
				<img class="search-error__image" src="images/search-error.svg">
			</div>
		`;

	content.innerHTML = template;
}



/**
 * @function module:moviesAPI.printSearchResults
 * @description Clean and print results in the interface
 * @param {Object} data 
 * @param {Number} pagination
 * @see Used inside: {@link moviesAPI~saveSearchText}, {@link moviesAPI~emptySearchInput}, {@link moviesAPI~emptySearchResults}, {@link moviesAPI~setMoviesList}, {@link moviesAPI~setMoviesSwiper}, {@link moviesAPI~setMoviesSearchPagination}, {@link moviesAPI~showHideInfoMovie}, {@link moviesAPI~printError}
 * @see Used in: {@link anominFunctionAutoEjecuted}
 */
export function printSearchResults(data, pagination) {
	const content = document.getElementById("searchResults");

	if (data.Response === "True") {
		saveSearchText();

		emptySearchInput();
		emptySearchResults();

		setMoviesList(content, data);
		setMoviesSwiper();
		setMoviesSearchPagination(content, data, pagination);
		showHideInfoMovie();
	} else {
		printError(content, data.Error);
	}
}