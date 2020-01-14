let keyAPI = "RiUeh7HSSb30pr2EOZeY2JIJ1oiM67Yo";

let urlAPIListBooks = "https://api.nytimes.com/svc/books/v3/lists/current/";
let urlAPIListCategories = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" + keyAPI;




// AJAX HANDLER - FETCH
//////////////////////////////////
function ajaxHandler(url, action) {
	// console.info(url);

	addLoader();

	fetch(url)
		.then(function (response) {
			if (response.status === 200) {
				response.json().then(function (data) {
					let timer = setInterval(function () {
						removeLoader();
						console.info(data);
						emptyContent();
						setAction(action, data);
						clearInterval(timer);
						return data;
					}, 3000);
				});
			} else if (response.status === 404) {
				console.warn(response.status);
				let timer = setInterval(function () {
					removeLoader();
					error404();
					clearInterval(timer);
					return response.status;
				}, 1000);
			}
		}).catch(function (error) {
			console.warn(error);
		});
}

function setAction(action, responseData) {
	switch (action) {
		case "setDataListCategories":
			setDataListCategories(responseData);
			break;
		case "setDataListBooks":
			setDataListBooks(responseData);
			break;
		default:
			break;
	}
}



// LOADER
//////////////////////////////////
function addLoader() {
	let loader = document.getElementById("loader");
	if (!loader) {
		let loader = document.createElement("div");
		loader.setAttribute("id", "loader");
		loader.setAttribute("class", "loader");
		document.body.appendChild(loader);
	}
}

function removeLoader() {
	let loader = document.getElementById("loader");
	if (loader) {
		document.body.removeChild(loader);
	}
}



// ERROR 404
//////////////////////////////////
function error404() {
	let template = `
		<div class="message-error">
			<img class="message-error__image" src="img/error-404.svg">
		</div>
		`;
	document.getElementsByClassName("page__content")[0].innerHTML = template;
	document.getElementsByClassName("page")[0].classList.add("is-error404");
	setButtonBack("message-error");
}



// SET DATA BOOKS
//////////////////////////////////
function emptyContent() {
	document.getElementsByClassName("page__content")[0].innerHTML = "";
}


function setDataListCategories(response) {
	let listCategories = response.results;
	// console.log(listCategories);

	let listCategoriesDom = document.createElement("div");
	listCategoriesDom.setAttribute("id", "listCategories");
	listCategoriesDom.setAttribute("class", "list-categories");

	for (let index = 0; index < listCategories.length; index++) {
		const category = listCategories[index];

		let categoryDom = document.createElement("article");
		categoryDom.setAttribute("class", "category");
		categoryDom.setAttribute("data-index", index.toString());

		let template = `<div class='category__inner'>
							<h3 class='category__title category__item'>
								#${index + 1} ${category.list_name}
							</h3>
							
							<div class='category__text category__item'>
								<p>
									<strong>
										Oldest:
									</strong>
									${category.oldest_published_date}
								</p>
								<p>
									<strong>
										Newest:
									</strong>
									${category.newest_published_date}
								</p>
								<p>
									<strong>
										Updated:
									</strong>
									${category.updated}
								</p>
							</div>

							<button class='category__button category__item button--read-more button' data-category="${category.list_name_encoded}">
								READ MORE <i class='button__icon button__icon--right fas fa-arrow-circle-right'></i>
							</button>
						</div>`;

		categoryDom.innerHTML = template;
		listCategoriesDom.appendChild(categoryDom);
	}

	// console.log(listBooksDom);
	document.getElementsByClassName("page__content")[0].appendChild(listCategoriesDom);

	setButtonReadMore();
}

function setButtonReadMore() {
	let categoriesButton = document.querySelectorAll(".category__button");
	for (let index = 0; index < categoriesButton.length; index++) {
		const categoryDom = categoriesButton[index];

		let category = categoryDom.getAttribute("data-category");
		categoryDom.addEventListener("click", function () {
			ajaxHandler(urlAPIListBooks + category + ".json?api-key=" + keyAPI, "setDataListBooks");
		});
	}
}

function setDataCategoryTitle(response) {
	console.log(response.results.list_name);

	let template = `
		<h2 class="list-books__category">
			${response.results.list_name}
		</h2>
	`;
	document.getElementsByClassName("page__content")[0].innerHTML = template;
}

function setButtonBack(classElementDom) {
	let template = `
				<button id="buttonBack" class="button--back button">
					<i class="button__icon button__icon--left fas fa-arrow-circle-left"></i> Back to categories
				</button>
				`;
	document.getElementsByClassName(classElementDom)[0].innerHTML += template;
	document.getElementById("buttonBack").addEventListener("click", function () {
		ajaxHandler(urlAPIListCategories, "setDataListCategories");
	});
}


function setDataListBooks(response) {
	setDataCategoryTitle(response);
	setButtonBack("page__content");

	let listBooks = response.results.books;
	// console.log(listBooks);

	let listBooksDom = document.createElement("div");
	listBooksDom.setAttribute("id", "listBooks");
	listBooksDom.setAttribute("class", "list-books");

	for (let index = 0; index < listBooks.length; index++) {
		const book = listBooks[index];

		let bookDom = document.createElement("article");
		bookDom.setAttribute("class", "book");
		bookDom.setAttribute("data-index", index.toString());

		let template = `<div class='book__inner'>
							<h3 class='book__title book__item'>
								#${index + 1} ${book.title}
							</h3>
							<img class='book__image book__item' src='${book.book_image}' alt='Image Default'>
							<span class='book__ranking book__item'>
								Weeks on list: ${book.weeks_on_list}
							</span>
							<div class='book__text book__item'>
								<p>
									${book.description}
								</p>
							</div>

							<a class='book__item button--amazon button' href="${book.amazon_product_url}" target='_blank'>
								BUY AT AMAZON <i class='button__icon button__icon--right fas fa-arrow-circle-right'></i>
							</a>
						</div>`;

		bookDom.innerHTML = template;

		listBooksDom.appendChild(bookDom);
	}

	// console.log(listBooksDom);
	document.getElementsByClassName("page__content")[0].appendChild(listBooksDom);
}



ajaxHandler(urlAPIListCategories, "setDataListCategories");