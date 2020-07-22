/**
 * @file Search movie
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */


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
		console.log(url);

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
	if (data.Response !== "False") {
		emptySearchResults(content);

		setSearchList(content, data);
		setSearchPagination(content, data, page);
	} else {
		printError404SearchResults(content, data.Error);
	}
}



function printError404SearchResults(content, textError) {
	const template = `
			<div class="search-error">
				<h3 class="search-error__title">
					Error search
				</h3>
				<h4 class="search-error__subtitle">
					${textError}
				</h4>
				<img class="search-error__image" src="images/search-error.png">
			</div>
		`;
	content.innerHTML = template;
}



function emptySearchResults(content) {
	content.innerHTML = "";
}



function setSearchList(content, data) {
	const total = `<p class="total-movies">Total: ${data.totalResults}</p>`;
	const totalNode = document.createRange().createContextualFragment(total);
	content.appendChild(totalNode);

	const ul = document.createElement("ul");
	ul.setAttribute("class", "list-movies");
	data.Search.map(search => {
		let movie = `
			<li id="${search.imdbID}" class="movie">
				<div class="movie__content">
					<img class="movie__image" src="${(search.Poster === "N/A") ? "images/movie-image-not-found.png" : search.Poster}" alt="${search.Title}">
					<div class="movie__body">
						<h3 class="movie__title">
							${search.Title}
							<span class="movie__year">
								(${search.Year})
							</span>
						</h3>

						<button href="#" class="movie__button">
							<i class="movie__icon far fa-heart"></i>
						</button>
					</div>
				</div>
			</li>
			`;
		let li = document.createRange().createContextualFragment(movie);
		ul.appendChild(li);
	});
	content.appendChild(ul);
}



function setSearchPagination(content, data, page) {
	const pagination = `
		<nav class="pagination__wrapper noselect" aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<button id="pageButtonPrev" class="page-button page-button--prev" data-page="${page - 1}">
						<i class="page-button__icon fa fa-chevron-left"></i>
					</button>
				</li>
				<li class="page-item">
					<button id="pageButtonNow" class="page-button page-button--now" data-page="${page}">${page}</button>
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

	let pageMax = Math.round(data.totalResults / 10);
	console.log(pageMax);
	if (pageMax < 1) {
		pageMax = 1
	}

	let pageButtons = document.getElementsByClassName("page-button");
	Array.from(pageButtons).map(button => {
		if (
			button.getAttribute("id") !== "pageButtonNow" &&
			parseInt(button.getAttribute("data-page")) === 0 ||
			parseInt(button.getAttribute("data-page")) === data.totalResults ||
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