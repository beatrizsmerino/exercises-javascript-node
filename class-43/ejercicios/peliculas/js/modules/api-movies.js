/**
 * @file api-movies.js
 * @module apiMovies
 * @description Get and search data movies, and print the interface
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';








/**
 * @const apiUrl
 * @description URL of OMBb API.
 * @type {String}
 */
const apiUrl = "http://www.omdbapi.com";



/**
 * @const apiKey
 * @description KEY of OMBb API.
 * Conexion api omdapi (The Open Movie Database)
 * Create the API KEY http://www.omdbapi.com/apikey.aspx
 * Find the API KEY in the email used
 * Change this string 'XXXXXXXXXXXX' for yor data
 * @type {String}
 */
const apiKey = "XXXXXXXXXXXX";



/**
 * @function module:apiMovies~saveSearchText
 * @description Save search text into input hidden and find by the text #searchInput or #searchInputHidden.
 * @returns {String}
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
 * @function module:apiMovies.search
 * @description Get the movies according to the text of the input and the page to search
 * @param {Number} page
 * @returns {Object|String}
 */
export async function search(page) {

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
		const url = `${apiUrl}/?type=movie&s=${valueSearch}&page=${page}&apikey=${apiKey}`;

		const find = await fetch(url);
		const result = await find.json();

		return result;

	} catch (e) {
		throw new Error(`Error: ${e}`);
	}
}



/**
 * @function module:apiMovies~emptySearch
 * @description Clean search input
 */
function emptySearchInput() {
	const input = document.getElementById("searchInput");
	input.value = "";
}



/**
 * @function module:apiMovies~emptySearchResults
 * @description Clean search results
 */
function emptySearchResults() {
	const content = document.getElementById("searchResults");
	content.innerHTML = "";
}



/**
 * @function module:apiMovies~getMoviesList
 * @description Create the list of movies
 * @param {Object} data
 * @returns {Object}
 */
function getMoviesList(data) {
	const list = document.createElement("ul");
	list.setAttribute("id", "listMovies");
	list.setAttribute("class", "list-movies");

	const items = data.Search.map(search => {
		let item = `
			<li id="${search.imdbID}" class="movie">
				<div class="movie__content">
					<button href="#" class="movie__button">
						<i class="movie__icon far fa-heart"></i>
					</button>

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
		let itemNode = document.createRange().createContextualFragment(item);

		return itemNode;
	});

	items.map(item => {
		list.appendChild(item);
	});

	return list;
}



/**
 * @function module:apiMovies~getSearchInfo
 * @description Create search info and return it
 * @param {Object} data
 * @returns {Element}
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
	let textSearchNode = document.createRange().createContextualFragment(textSearch);
	searchInfo.appendChild(textSearchNode);

	// Search info. Total results found:
	let totalSearch = `<p class="search-info__total">Total: <em>${data.totalResults}</em></p>`;
	let totalSearchNode = document.createRange().createContextualFragment(totalSearch);
	searchInfo.appendChild(totalSearchNode);

	return searchInfo;
}



/**
 * @function module:apiMovies~setMoviesList
 * @description Print Search info and results
 * @param {Object} content 
 * @param {Object} data 
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
 * @function module:apiMovies~setMoviesSwiper
 * @description Add structure swiper to the results search
 */
function setMoviesSwiper() {

	function addStructure() {
		const listDom = document.getElementById("listMovies");
		const itemsDom = listDom.children;

		// Add swiper-wrapper
		listDom.setAttribute("class", "swiper-wrapper");


		// Add swiper-slide
		Array.from(itemsDom).map(item => item.classList.add("swiper-slide"));

		// Add swiper-container
		const swiperContainer = tool.wrap(listDom, null, null, "swiper-container");


		// Add swiper-pagination
		const templateSwiperPagination = `<div class="swiper-pagination"></div>`;
		const templateSwiperPaginationNode = document.createRange().createContextualFragment(templateSwiperPagination);
		swiperContainer.appendChild(templateSwiperPaginationNode);


		// Add swiper
		const swiper = tool.wrap(swiperContainer, null, "moviesSwiper", "swiper");
		const swiperDom = document.getElementById("moviesSwiper");


		// Add swiper-button
		const templateSwiperButton = `
			<div id="moviesSwiperButtonPrev" class="swiper-button-prev"></div>
			<div id="moviesSwiperButtonNext" class="swiper-button-next"></div>
		`;
		const templateSwiperButtonNode = document.createRange().createContextualFragment(templateSwiperButton);
		swiperDom.appendChild(templateSwiperButtonNode);
	}

	function create() {
		var mySwiper = new Swiper("#moviesSwiper .swiper-container", {
			slidesPerView: 1,
			spaceBetween: 10,

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true,
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				prevEl: '#moviesSwiperButtonPrev',
				nextEl: '#moviesSwiperButtonNext',
			},

			// Breakpoints
			breakpoints: {
				500: {
					slidesPerView: 2,
				},
				600: {
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
 * @function module:apiMovies~setMoviesSearchPagination
 * @description Create and print pagination of results from 10 to 10
 * @param {Object} content 
 * @param {Object} data 
 * @param {Number} page 
 */
function setMoviesSearchPagination(content, data, page) {

	// Max number of results into page
	let formTo = 10;
	let pageMax = Math.round(data.totalResults / formTo);
	if (pageMax < 1) {
		pageMax = 1
	}


	// Indicate the displayed results
	let pagesNow = `1 - ${formTo}`;
	if (data.totalResults < formTo) {
		pagesNow = `1 - ${data.totalResults}`;
	} else if ((Math.round(data.totalResults / formTo)) === page) {
		pagesNow = `${(page * formTo) - formTo + 1} - ${data.totalResults}`;
	} else {
		pagesNow = `${(page * formTo) - formTo + 1} - ${page * formTo}`;
	}


	// Create and print pagination
	const pagination = `
		<nav class="pagination__wrapper noselect" aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<button id="pageButtonPrev" class="page-button page-button--prev" data-page="${page - 1}">
						<i class="page-button__icon fa fa-chevron-left"></i>
					</button>
				</li>
				<li class="page-item">
					<button id="pageButtonNow" class="page-button page-button--now" data-page="${page}">${pagesNow}</button>
				</li>
				<li class="page-item">
					<button id="pageButtonNext" class="page-button page-button--next" data-page="${page + 1}">
						<i class="page-button__icon fa fa-chevron-right"></i>
					</button>
				</li>
			</ul>
		</nav>
		`;
	let paginationNode = document.createRange().createContextualFragment(pagination);
	content.appendChild(paginationNode);


	// Add event got to the page... and disabled/ability buttons
	let pageButtons = document.getElementsByClassName("page-button");
	Array.from(pageButtons).map(button => {
		if (
			button.getAttribute("id") !== "pageButtonNow" &&
			parseInt(button.getAttribute("data-page")) === 0 ||
			parseInt(button.getAttribute("data-page")) >= pageMax + 1
		) {
			button.setAttribute("disabled", "disabled");
		} else {
			button.removeAttribute("disabled");
		}

		button.addEventListener("click", function () {
			let pageGo = parseInt(this.getAttribute("data-page"));

			if (pageGo >= 1 && pageGo < data.totalResults) {
				search(pageGo).then(data => printSearchResults(data, pageGo));
			}
		});
	});
}



/**
 * @function module:apiMovies~printError
 * @description Create and print message error
 * @param {Object} content 
 * @param {String} textError 
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
 * @function module:apiMovies.printSearchResults
 * @description Clean and print results in the interface
 * @param {Object} data 
 * @param {Number} page 
 */
export function printSearchResults(data, page) {
	const content = document.getElementById("searchResults");

	if (data.Response === "True") {
		saveSearchText();

		emptySearchInput();
		emptySearchResults();

		setMoviesList(content, data);
		setMoviesSwiper();
		setMoviesSearchPagination(content, data, page);
	} else {
		printError(content, data.Error);
	}
}