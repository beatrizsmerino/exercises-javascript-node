/**
 * @file api-movies.js
 * @module apiMovies
 * @description 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */


/**
 * @requires tool
 */
import * as tool from './tools.js';


/**
 * @const apiKey
 * @description Conexion api omdapi
 * Create the API KEY http://www.omdbapi.com/apikey.aspx
 * Change this string 'XXXXXXXXXXXX' for yor data
 */
const apiKey = "XXXXXX";
const apiUrl = "http://www.omdbapi.com";


export async function search(page) {
	try {
		let searchInput = document.getElementById("searchInput").value;

		searchInput = searchInput.replace(/\s/g, "+");

		const url = `${apiUrl}/?type=movie&s=${searchInput}&page=${page}&apikey=${apiKey}`;
		// console.log(url);

		const find = await fetch(url);
		const result = await find.json();

		return result;

	} catch (e) {
		throw new Error(`Error: ${e}`);
	}
}


export function printSearchResults(data, page) {
	const content = document.getElementById("searchResults");
	console.log(data);

	if (data.Response === "True") {
		//emptySearch();
		emptySearchResults();

		setMoviesList(content, data);
		setMoviesSwiper();
		setMoviesSearchPagination(content, data, page);
	} else {
		printError404(content, data.Error);
	}
}


function printError404(content, textError) {
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


function emptySearch() {
	const input = document.getElementById("searchInput");
	input.value = "";
}


function emptySearchResults() {
	const content = document.getElementById("searchResults");
	content.innerHTML = "";
}


function getMoviesList(data) {
	const items = data.Search.map(search => {
		let movie = `
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
		let li = document.createRange().createContextualFragment(movie);
		return li;
	});

	return items;
}


function setMoviesList(content, data) {
	const total = `<p class="total-movies">Total: ${data.totalResults}</p>`;
	const totalNode = document.createRange().createContextualFragment(total);
	content.appendChild(totalNode);

	const ul = document.createElement("ul");
	ul.setAttribute("id", "listMovies");
	ul.setAttribute("class", "list-movies");

	const items = getMoviesList(data);
	items.map(li => {
		ul.appendChild(li);
	});

	content.appendChild(ul);
}


function setMoviesSwiper() {

	function addStructure() {
		const listDom = document.getElementById("listMovies");
		const itemsDom = listDom.children;
		// console.log(itemsDom);

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


function setMoviesSearchPagination(content, data, page) {
	// console.log(page);


	let pageMax = Math.round(data.totalResults / 10);
	if (pageMax < 1) {
		pageMax = 1
	}
	// console.log(pageMax);


	let pagesNow = "1 - 10";
	if (data.totalResults < 10) {
		pagesNow = `1 - ${data.totalResults}`;
	} else if ((Math.round(data.totalResults / 10)) === page) {
		pagesNow = `${(page * 10) - 10 + 1} - ${data.totalResults}`;
	} else {
		pagesNow = `${(page * 10) - 10 + 1} - ${page * 10}`;
	}


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