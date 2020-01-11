let urlAPI = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json";
let keyAPI = "RiUeh7HSSb30pr2EOZeY2JIJ1oiM67Yo";


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
		case "setDataBooks":
			setDataBooks(responseData);
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
	document.getElementsByClassName("page")[0].classList.add("is-error404");
}



// SET DATA BOOKS
//////////////////////////////////
function setDataBooks(response) {
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

							<button class='book__button book__item button'>
								<a href="${book.amazon_product_url}" target='_blank'>
									BUT AT AMAZON <i class='book__icon fas fa-arrow-circle-right'></i>
								</a>
							</button>
						</div>`;

		bookDom.innerHTML = template;

		listBooksDom.appendChild(bookDom);
	}

	// console.log(listBooksDom);
	document.getElementsByClassName("page__content")[0].appendChild(listBooksDom);
}


ajaxHandler(urlAPI + "?api-key=" + keyAPI, "setDataBooks");