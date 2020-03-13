function emptyForm() {
	const idContact = document.getElementById("idContact");
	const nameContact = document.getElementById("nameContact");
	const phoneContact = document.getElementById("phoneContact");

	idContact.value = "";
	nameContact.value = "";
	phoneContact.value = "";
};


function saveContact() {
	const idContact = document.getElementById("idContact");
	const nameContact = document.getElementById("nameContact");
	const phoneContact = document.getElementById("phoneContact");
	const button = document.getElementById("buttonSave");

	button.addEventListener("click", function () {
		if (idContact.value !== "") {
			if (localStorage.key(idContact.value)) {
				localStorage.removeItem(localStorage.key(idContact.value));
				localStorage.setItem(nameContact.value, phoneContact.value);
			}
		} else {
			localStorage.setItem(nameContact.value, phoneContact.value);
		}

		emptyForm();
		listContactTemplate();
	});
}


function editContact() {
	const idContact = document.getElementById("idContact");
	const nameContact = document.getElementById("nameContact");
	const phoneContact = document.getElementById("phoneContact");
	const buttons = document.getElementsByClassName("button-edit");

	Array.from(buttons).map(button => {
		button.addEventListener("click", function () {
			let itemIndex = this.getAttribute("data-index");
			let nameContactValue = localStorage.key(parseInt(itemIndex));
			let phoneContactValue = localStorage.getItem(localStorage.key(parseInt(itemIndex)));
			console.log(itemIndex);
			console.log(nameContactValue, phoneContactValue);

			idContact.value = itemIndex;
			nameContact.value = nameContactValue;
			phoneContact.value = phoneContactValue;
			listContactTemplate();
		});
	});

}


function removeContact() {
	const buttons = document.getElementsByClassName("button-remove");

	Array.from(buttons).map(button => {
		button.addEventListener("click", function () {
			let itemIndex = this.getAttribute("data-index");
			let nameContact = localStorage.key(parseInt(itemIndex));
			localStorage.removeItem(nameContact);
			listContactTemplate();
		});
	});
}


function removeAllContacts() {
	const buttonRemoveAll = document.getElementById("buttonRemoveAll");

	buttonRemoveAll.addEventListener("click", function () {
		localStorage.clear();
		listContactTemplate();
	});
}


function getListContacts() {
	let items = "";
	for (var index = 0; index < localStorage.length; index++) {
		let nameContactValue = localStorage.key(index);
		let phoneContactValue = localStorage.getItem(localStorage.key(index));

		let itemTemplate = `
				<li class="list-group-item d-flex justify-content-between">
					<div>
						<p class="m-0">${nameContactValue}</p>
						<p class="m-0">${phoneContactValue}</p>
					</div>
					<div class="btn-group">
						<button type="button" class="button-edit btn btn-success" data-index="${index}">
							<i class="fa fa-pen"></i> Editar
						</button>
						<button type="button" class="button-remove btn btn-danger" data-index="${index}">
							<i class="fa fa-trash"></i> Eliminar
						</button>
					</div>
				</li>`;
		items += itemTemplate;
	}

	return items;
}


function listContactTemplate() {
	const listContactDOM = document.getElementById("listContact");

	if (localStorage.length !== 0) {

		listContactDOM.innerHTML = "";

		const list = getListContacts();

		const template = `
			<div class="mb-2 d-flex justify-content-between bg-transparent text-info">
				<h2 class="font-weight-light">
					Lista contactos
				</h2>
				<button type="button" id="buttonRemoveAll" class="btn btn-danger">
					<i class="fa fa-trash"></i> Eliminar Todos
				</button>
			</div>
			<div id ="listContact"><ul class="list-group pt-3">${list}</ul></div>`;

		const nodeTemplate = document.createRange().createContextualFragment(template);
		listContactDOM.appendChild(nodeTemplate);

		editContact();
		removeContact();
		removeAllContacts();
	} else {
		listContactDOM.innerHTML = "";
	}
}



saveContact();
listContactTemplate();

